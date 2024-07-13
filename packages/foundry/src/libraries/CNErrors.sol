// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.26;

/* ChainNotes libraries */
import {CNDataTypes} from "src/libraries/CNDataTypes.sol";

/**
 * @title CNDErrors
 * @author ChainNotes Technical Team
 * @notice Library containing ChainNotes contracts' custom errors
 *
 */
library CNErrors {
    /// @dev error thrown when a user has already done one specific action
    error YOU_HAVE_ALREADY(CNDataTypes.Actions action);
}