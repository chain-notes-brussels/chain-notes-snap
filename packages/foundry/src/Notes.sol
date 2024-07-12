// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.26;

import {CNDataTypes} from "src/libraries/CNDataTypes.sol";

contract Notes {
    uint16 public constant DENOMINATOR = 10_000;

    uint16 public constant HELPFULNESS_THRESHOLD = 40;

    uint16 public constant INITIAL_ELIGIBILITY_RATING_THRESHOLD = 10;

    mapping(address contractAddress => CNDataTypes.Note[] note) public notesOf;

    mapping(address user => CNDataTypes.User info) public infoOfUser;

    mapping(address user => mapping(address contractAddress => mapping(uint16 index => CNDataTypes.Rating))) public userRatingOfNote;

    function newNote(
        address _contractAddress,
        string calldata _uri,
        string calldata _pictureUri,
        CNDataTypes.Sentiment _sentiment,
    ) external returns (CNDataTypes.Note _note) {}

    function vote(
        CNDataTypes.Rating _rating,
        uint16 _noteIndex,
        address _contractAddress
    ) external {}

    fucntion tip(
        uint16 _noteIndex,
        address _contractAddress
    ) payable external returns (bool _ok) {}
}
