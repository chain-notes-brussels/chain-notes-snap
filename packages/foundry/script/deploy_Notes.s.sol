// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.26;

import "forge-std/Script.sol";
import {Notes} from "src/Notes.sol";
import {MockContractA} from "test/mock/MockContractA.sol";
import {MockContractB} from "test/mock/MockContractB.sol";
import {MockContractC} from "test/mock/MockContractC.sol";
import {CNDataTypes} from "src/libraries/CNDataTypes.sol";

contract CounterScript is Script {

    string public PATH_PREFIX = string.concat("deployAddresses/", vm.toString(block.chainid));
    string public NOTES_PATH = string.concat(PATH_PREFIX, "/Notes/address");
    string public A_PATH = string.concat(PATH_PREFIX, "/ContractA/address");
    string public B_PATH = string.concat(PATH_PREFIX, "/ContractB/address");
    string public C_PATH = string.concat(PATH_PREFIX, "/ContractC/address");

    Notes notes;
    MockContractA contractA;
    MockContractB contractB;
    MockContractC contractC;

    uint256 deployerKey = vm.envUint("DEPLOYER_KEY");

    string appId = vm.envString("WC_APP_ID");
    string noteId = vm.envString("WC_NOTE_ID");
    string voteId = vm.envString("WC_VOTE_ID");

    function run(bool _onBase) external {
        vm.startBroadcast(deployerKey);
        contractA = new MockContractA();
        contractB = new MockContractB();
        contractC = new MockContractC();
        if (_onBase) {
            notes = new Notes(
                true,
                0x42FF98C4E85212a5D31358ACbFe76a621b50fC02,
                appId,
                noteId,
                voteId
            );

            vm.writeFile(NOTES_PATH, vm.toString(address(notes)));
            vm.writeFile(A_PATH, vm.toString(address(contractA)));
            vm.writeFile(B_PATH, vm.toString(address(contractB)));
            vm.writeFile(C_PATH, vm.toString(address(contractC)));

        } else {
            notes = new Notes(
                false,
                address(0),
                appId,
                noteId,
                voteId
            );

            CNDataTypes.WorldIdProof memory emptyId;

            notes.publishNote(
                address(contractA),
                "bafkreibkt24dhy7l5xvoagixtcdxr4l4v7fjtvuxqemtcoksf5troviba4",
                CNDataTypes.Sentiment.POSITIVE,
                emptyId
            );

            notes.publishNote(
                address(contractB),
                "bafkreigt7dc5vnggawea6e6cxwd45sjwdcvaafoqcm673fawxqvjsf5lca",
                CNDataTypes.Sentiment.POSITIVE,
                emptyId
            );

            notes.publishNote(
                address(contractC),
                "bafkreicg55jxkt7xc4p7zmg5s5lfpkw7et4vqxdhoqsgrstzeuozc6rkbm",
                CNDataTypes.Sentiment.NEGATIVE,
                emptyId
            );
            vm.writeFile(NOTES_PATH, vm.toString(address(notes)));
            vm.writeFile(A_PATH, vm.toString(address(contractA)));
            vm.writeFile(B_PATH, vm.toString(address(contractB)));
            vm.writeFile(C_PATH, vm.toString(address(contractC)));
        }
        vm.stopBroadcast();
    }
}
