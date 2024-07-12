// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.26;

/* ChainNotes Libraries */
import {CNDataTypes} from "src/libraries/CNDataTypes.sol";

/**
 * @title Notes
 * @author ChainNotes Technical Team
 * @notice Main contract in charge of vot
 *
 */
contract Notes {
    /// @dev Denominator used for calculating 
    uint16 public constant DENOMINATOR = 10_000;

    /// @dev Threshold for being scored helpful aka .40
    uint16 public constant HELPFULNESS_THRESHOLD = 40;

    /// @dev Threshold to be removed from being helpful aka .10
    uint16 public constant INITIAL_ELIGIBILITY_RATING_THRESHOLD = 10;

    /// @dev Array of notes for a specific contract address
    mapping(address contractAddress => CNDataTypes.Note[] note) public notesOf;

    /// @dev The amount of posetive / negative sentiment for a specific contract address
    mapping(address contractAddress => mapping(CNDataTypes.Sentiment sentiment => uint16 amount)) public sentimentOf;

    /// @dev The amount of different ratoings for a specific note
    mapping(address contractAddress => mapping(uint16 index => mapping(CNDataTypes.Rating rating => uint32 amount))) public amountOfRating;

    /// @dev The rating weight of a user
    mapping(address user => mapping(CNDataTypes.Rating => uint40 amount)) public ratingWeightOf;

    /// @dev A users rating on a specific note
    mapping(address user => mapping(address contractAddress => mapping(uint16 index => CNDataTypes.Rating))) public userRatingOfNote;

    /**
     * @notice
     *  Allows a user to publish a note for a specific contract
     *
     * @param _contractAddress address off contract we are about to add a note for
     * @param _uri IPFS uri for note
     * @param _sentiment if the comment is POSETIVE or NEGATIVE
     *
     * @return _note the finalized note datastructure
     *
     */
    function publishNote(
        address _contractAddress,
        string calldata _uri,
        CNDataTypes.Sentiment _sentiment
    ) external returns(CNDataTypes.Note memory _note) {
        // Create the note
        _note = CNDataTypes.Note({
            noteWriter: msg.sender,
            uri: _uri,
            score: 0,
            sentiment: _sentiment
        });

        // Push note into the notesOf array for specific contract
        notesOf[_contractAddress].push(_note);

        // Increment the specified sentiment for the contract
        sentimentOf[_contractAddress][_sentiment]++;
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
        address _contractAddress
    ) external {
        // Update rating Weight of user
        ratingWeightOf[msg.sender][_rating]++;

        // Update voters rating of a note
        userRatingOfNote[msg.sender][_contractAddress][_noteIndex] = _rating;

        // Increment the notes number of _rating choice
        amountOfRating[_contractAddress][_noteIndex][_rating]++;
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
    fucntion tip(
        uint16 _noteIndex,
        address _contractAddress
    ) payable external returns (bool _success) {
        // Pay the author of the note
        (_success,) = payable(notesOf[_contractAddress][_noteIndex].noteWriter).call{value: msg.value}("");
    }
}
