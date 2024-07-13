// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.26;

/* ChainNotes Libraries */
import {CNDataTypes} from "src/libraries/CNDataTypes.sol";
import {CNEvents} from "src/libraries/CNEvents.sol";
import {CNErrors} from "src/libraries/CNErrors.sol";

/* WorldID interface */
import {IWorldID} from "src/interfaces/IWorldID.sol";

/* Helpers */
import {ByteHasher} from "src/helpers/ByteHasher.sol";

/**
 * @title Notes
 * @author ChainNotes Technical Team
 * @notice Main contract in charge of vot
 *
 */
contract Notes {
    // Helper for worldId proving actions
    using ByteHasher for bytes;

    //     _____ __        __
    //    / ___// /_____ _/ /____  _____
    //    \__ \/ __/ __ `/ __/ _ \/ ___/
    //   ___/ / /_/ /_/ / /_/  __(__  )
    //  /____/\__/\__,_/\__/\___/____/

    /// @dev Keep track of if we are using worldId
    bool public useWordlId;

    /// @dev contract instance for worldId prover
    IWorldID worldId;

    /// @dev Threshold for being scored helpful aka .40
    uint16 public constant HELPFULNESS_THRESHOLD = 40;

    /// @dev Threshold to be removed from being helpful aka .10
    uint16 public constant INITIAL_ELIGIBILITY_RATING_THRESHOLD = 10;

    /// @dev The contract's external nullifier hash for notes
    uint256 internal immutable externalNullifierNote;

    /// @dev The contract's external nullifier hash for votes
    uint256 internal immutable externalNullifierVote;

    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

    /// @dev store status if user written note for certain contract
    mapping(address user => mapping(address contractAddress => bool writtenNote)) public userWrittenNoteFor;

    /// @dev store status if user voted on a certain ntoe
    mapping(address user => mapping(address contractAddress => mapping(uint16 index => bool voted))) public userVotedOnNote;

    /// @dev Array of notes for a specific contract address
    mapping(address contractAddress => CNDataTypes.Note[] note) public notesOf;

    /// @dev Array of scores for a specific contract address
    mapping(address contractAddress => CNDataTypes.NoteScore[] scores) public scoresOf;

    /// @dev The amount of posetive / negative sentiment for a specific contract address
    mapping(address contractAddress => mapping(CNDataTypes.Sentiment sentiment => uint16 amount)) public sentimentOf;

    /// @dev The amount of different ratoings for a specific note
    mapping(address contractAddress => mapping(uint16 index => mapping(CNDataTypes.Rating rating => uint32 amount))) public amountOfRating;

    /// @dev The rating weight of a user
    mapping(address user => mapping(CNDataTypes.Rating => uint40 amount)) public ratingWeightOf;

    /// @dev A users rating on a specific note
    mapping(address user => mapping(address contractAddress => mapping(uint16 index => CNDataTypes.Rating))) public userRatingOfNote;

    //     ______                 __                  __
    //    / ____/___  ____  _____/ /________  _______/ /_____  _____
    //   / /   / __ \/ __ \/ ___/ __/ ___/ / / / ___/ __/ __ \/ ___/
    //  / /___/ /_/ / / / (__  ) /_/ /  / /_/ / /__/ /_/ /_/ / /
    //  \____/\____/_/ /_/____/\__/_/   \__,_/\___/\__/\____/_/

    /**
     * @notice
     *  Constructor for Notes contract
     *
     * @param _useWorldId a boolan if we are using worldcoin id or not
     * @param _worldId address of worldå
     * @param _appId worldcoin app id as string
     * @param _noteId worldcoin action id for note
     * @param _voteId worldcoin action id for vote
     *
     */
    constructor(
        bool _useWorldId,
        address _worldId,
        string memory _appId,
        string memory _noteId,
        string memory _voteId
    ) {
        // Set the status of worldId usage
        useWordlId = _useWorldId;

        // Instantiate world Id contract for proving
        worldId = IWorldID(_worldId);

        // create nullifier used for notes
        externalNullifierNote = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _noteId)
            .hashToField();

        // create nullifier used for votes
        externalNullifierVote = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _voteId)
            .hashToField();
    }

    //      ______     __                        __   ______                 __  _
    //     / ____/  __/ /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
    //    / __/ | |/_/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
    //   / /____>  </ /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
    //  /_____/_/|_|\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/

    /**
     * @notice
     *  Allows a user to publish a note for a specific contract
     *
     * @param _contractAddress address off contract we are about to add a note for
     * @param _uri IPFS uri for note
     * @param _sentiment if the comment is POSITIVE or NEGATIVE
     * @param _proof worldID proof (if on supported network)
     *
     * @return _note the finalized note datastructure
     *
     */
    function publishNote(
        address _contractAddress,
        string calldata _uri,
        CNDataTypes.Sentiment _sentiment,
        CNDataTypes.WorldIdProof memory _proof
    ) external returns(CNDataTypes.Note memory _note) {
        // If user already written note for this contract revert
        if (userWrittenNoteFor[msg.sender][_contractAddress]) revert CNErrors.YOU_HAVE_ALREADY(CNDataTypes.Actions.WRITTEN_NOTE);

        // if we are using worldId...
        if (useWordlId) {
            // verify proof
            worldId.verifyProof(
                _proof.root,
                groupId,
                abi.encodePacked(_proof.signal).hashToField(),
                _proof.nullifierHash,
                externalNullifierNote,
                _proof.proof
            );
        }

        // Create the note
        _note = CNDataTypes.Note({
            noteWriter: msg.sender,
            uri: _uri,
            sentiment: _sentiment
        });

        // Notescore variable
        CNDataTypes.NoteScore memory score = CNDataTypes.NoteScore({
            score: 0,
            consideredHelpful: false
        });

        // Push note into the notesOf array for specific contract
        notesOf[_contractAddress].push(_note);

        // Push score info inte scoreOf array for specific contract
        scoresOf[_contractAddress].push(score);

        // Increment the specified sentiment for the contract
        sentimentOf[_contractAddress][_sentiment]++;

        // Toggle notes written for contract status
        userWrittenNoteFor[msg.sender][_contractAddress] = true;

        // Emit the NotePublished event
        emit CNEvents.NotePublished(
            msg.sender,
            _contractAddress,
            notesOf[_contractAddress].length,
            _note
        );
    }

    /**
     * @notice
     *  allows users to vote for a specific note
     *
     * @param _rating rating to share if note was helpful or not
     * @param _noteIndex index of specific note
     * @param _contractAddress the contract address with the specific note
     *
     */
    function vote(
        CNDataTypes.Rating _rating,
        uint16 _noteIndex,
        address _contractAddress,
        CNDataTypes.WorldIdProof memory _proof
    ) external {
        // Make sure user hasnt already voted on note
        if (userVotedOnNote[msg.sender][_contractAddress][_noteIndex]) revert CNErrors.YOU_HAVE_ALREADY(CNDataTypes.Actions.VOTED);

        // if we are using worldId...
        if (useWordlId) {
            // verify proof
            worldId.verifyProof(
                _proof.root,
                groupId,
                abi.encodePacked(_proof.signal).hashToField(),
                _proof.nullifierHash,
                externalNullifierVote,
                _proof.proof
            );
        }

        // Update rating Weight of user
        ratingWeightOf[msg.sender][_rating]++;

        // Update voters rating of a note
        userRatingOfNote[msg.sender][_contractAddress][_noteIndex] = _rating;

        // Increment the notes number of _rating choice
        amountOfRating[_contractAddress][_noteIndex][_rating]++;

        // Get total votes for note
        uint32 totalVotes =
            amountOfRating[_contractAddress][_noteIndex][CNDataTypes.Rating.HELPFUL] +
            amountOfRating[_contractAddress][_noteIndex][CNDataTypes.Rating.SOMEWHAT_HELPFUL] +
            amountOfRating[_contractAddress][_noteIndex][CNDataTypes.Rating.NOT_HELPFUL];

        // Instantiate score
        uint256 score;

        // If totalvotes is more than 0...
        if (totalVotes > 0) {
            // ... calculate the score ...
            score = ((amountOfRating[_contractAddress][_noteIndex][CNDataTypes.Rating.HELPFUL] * 80) +
            (amountOfRating[_contractAddress][_noteIndex][CNDataTypes.Rating.SOMEWHAT_HELPFUL] * 40))
            / totalVotes;
        // ... else...
        } else {
            // ... score is 0 .. 
            score = 0;
        }

        // Instantiate new a new NoteScore datatype
        CNDataTypes.NoteScore memory newScore;

        // Set the calculated score
        newScore.score = score;

        // Checking if note should be considered helpful
        if (!newScore.consideredHelpful && score > 40 && totalVotes > 10) {
            // And if so toggle the status
            newScore.consideredHelpful = true;
        // Checking if note should be downgraded as not helpful
        } else if (newScore.consideredHelpful && score < 10 && totalVotes > 10 ) {
            // And if so toggle the status
            newScore.consideredHelpful = false;
        }

        // Set the score info to the note
        scoresOf[_contractAddress][_noteIndex] = newScore;

        // Toggle the voted on note stattus for user
        userVotedOnNote[msg.sender][_contractAddress][_noteIndex] = true;

        // Emit Voted event
        emit CNEvents.Voted(
            msg.sender,
            _contractAddress,
            _noteIndex,
            _rating,
            score
        );
    }

    /**
     * @notice
     *  allows users to tip a note that they found specifically helpful
     *
     * @param _noteIndex index of note of which writer should be tipped
     * @param _contractAddress address of which note is associated
     *
     * @return _success status if it succeeded or not
     *
     */
    function tip(
        uint16 _noteIndex,
        address _contractAddress
    ) payable external returns (bool _success) {
        // Pay the author of the note
        (_success,) = payable(notesOf[_contractAddress][_noteIndex].noteWriter).call{value: msg.value}("");

        // Emit Tipped event
        emit CNEvents.Tipped(
            msg.sender,
            notesOf[_contractAddress][_noteIndex].noteWriter,
            _contractAddress,
            msg.value,
            notesOf[_contractAddress][_noteIndex]
        );
    }

    //   _    ___                 ______                 __  _
    //  | |  / (_)__ _      __   / ____/_  ______  _____/ /_(_)___  ____  _____
    //  | | / / / _ \ | /| / /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
    //  | |/ / /  __/ |/ |/ /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
    //  |___/_/\___/|__/|__/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/

    /**
     * @notice
     *  getter function to getting all notes of a contract
     *
     * @param _contractAddress address of contract we want to check
     *
     * @return _notes array of notes associated with contract
     * @return _scores array of all scores associated with contract
     *
     */
    function retrieveContractNotes(address _contractAddress) external view returns (
        CNDataTypes.Note[] memory _notes,
        CNDataTypes.NoteScore[] memory _scores
    ) {
        // retrieve notes
        _notes = notesOf[_contractAddress];

        // Retrieve score
        _scores = scoresOf[_contractAddress];
    }
}
