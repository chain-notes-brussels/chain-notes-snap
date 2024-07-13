// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.26;

import {CNDataTypes} from "src/libraries/CNDataTypes.sol";

library CNEvents {
    event NotePublished(
        address indexed author,
        address indexed contractAddress,
        uint256 amountOfNotesForContract,
        CNDataTypes.Note note

    );

    event Voted(
        address indexed voter,
        address indexed contractAddress,
        uint16 noteIndex,
        CNDataTypes.Rating rating,
        uint256 score
    );

    event Tipped(
        address indexed tipper,
        address indexed author,
        address indexed contractAddress,
        uint256 tipAmount,
        CNDataTypes.Note note
    );
}