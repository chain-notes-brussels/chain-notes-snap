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
    uint16 public constant DENOMINATOR = 10_000;

    uint16 public constant HELPFULNESS_THRESHOLD = 40;

    uint16 public constant INITIAL_ELIGIBILITY_RATING_THRESHOLD = 10;

    mapping(address contractAddress => CNDataTypes.Note[] note) public notesOf;

    mapping(address contractAddress => mapping(CNDataTypes.Sentiment sentiment => uint16 amount)) public sentimentOf;

    mapping(address contractAddress => mapping(uint16 index => mapping(CNDataTypes.Rating rating => uint32 amount))) public amountOfRating;

    mapping(address user => mapping(CNDataTypes.Rating => uint40 amount)) public ratingWeightOf;

    mapping(address user => mapping(address contractAddress => mapping(uint16 index => CNDataTypes.Rating))) public userRatingOfNote;

    function publishNote(
        address _contractAddress,
        string calldata _uri,
        CNDataTypes.Sentiment _sentiment
    ) external returns(CNDataTypes.Note memory _note) {
        _note = CNDataTypes.Note({
            noteWriter: msg.sender,
            uri: _uri,
            score: 0,
            sentiment: _sentiment
        });

        notesOf[_contractAddress].push(_note);

        sentimentOf[_contractAddress][_sentiment]++;
    }

    function vote(
        CNDataTypes.Rating _rating,
        uint16 _noteIndex,
        address _contractAddress
    ) external {
        ratingWeightOf[msg.sender][_rating]++;

        userRatingOfNote[msg.sender][_contractAddress][_noteIndex] = _rating;

        amountOfRating[_contractAddress][_noteIndex][_rating]++;
    }

    // fucntion tip(
        // uint16 _noteIndex,
        // address _contractAddress
    // ) payable external returns (bool _ok) {}
}
