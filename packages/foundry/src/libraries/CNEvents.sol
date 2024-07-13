// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.26;

/* ChainNotes libraries */
import {CNDataTypes} from "src/libraries/CNDataTypes.sol";

/**
 * @title CNDEvents
 * @author ChainNotes Technical Team
 * @notice Library containing ChainNotes contracts' custom events
 *
 */
library CNEvents {
    /// @dev Event emitted when a note is published
    event NotePublished(
        address indexed author,
        address indexed contractAddress,
        uint256 amountOfNotesForContract,
        CNDataTypes.Note note
    );

    /// @dev Event emitted when a user has voted
    event Voted(
        address indexed voter,
        address indexed contractAddress,
        uint16 noteIndex,
        CNDataTypes.Rating rating,
        uint256 score
    );

    /// @dev Event emitted when someone has tipped an author
    event Tipped(
        address indexed tipper,
        address indexed author,
        address indexed contractAddress,
        uint256 tipAmount,
        CNDataTypes.Note note
    );
}