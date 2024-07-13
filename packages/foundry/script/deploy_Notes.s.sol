// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.26;

import "forge-std/Script.sol";
import {Notes} from "src/Notes.sol";

contract CounterScript is Script {
    Notes notes;

    uint256 deployerKey = vm.envUint("DEPLOYER_KEY");

    function run() external {
        vm.startBroadcast(deployerKey);
        notes = new Notes();
        vm.stopBroadcast();
    }
}
