// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.26;

import "forge-std/Script.sol";
import {Notes} from "src/Notes.sol";

contract CounterScript is Script {
    Notes notes;

    uint256 deployerKey = vm.envUint("DEPLOYER_KEY");

    string appId = vm.envString("WC_APP_ID");
    string noteId = vm.envString("WC_NOTE_ID");
    string voteId = vm.envString("WC_VOTE_ID");

    function run(bool _onBase) external {
        vm.startBroadcast(deployerKey);
        if (_onBase) {
            notes = new Notes(
                true,
                0x163b09b4fE21177c455D850BD815B6D583732432,
                appId,
                noteId,
                voteId
            );
        } else {
            notes = new Notes(
                false,
                address(0),
                appId,
                noteId,
                voteId
            );
        }
        vm.stopBroadcast();
    }
}
