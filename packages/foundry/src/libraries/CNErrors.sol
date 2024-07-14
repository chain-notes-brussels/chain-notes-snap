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
    /// @dev Error thrown when a user has already done one specific action
    error YOU_HAVE_ALREADY(CNDataTypes.Actions action);

    /// @dev Error thrown when someone tries to vot on a non contract address
    error NOT_A_CONTRACT();
}