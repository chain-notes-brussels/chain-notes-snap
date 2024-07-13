// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.26;

import {CNDataTypes} from "src/libraries/CNDataTypes.sol";

library CNErrors {
    error YOU_HAVE_ALREADY(CNDataTypes.Actions action);
}