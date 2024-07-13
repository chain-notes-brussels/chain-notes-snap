// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.26;

contract MockContract {
    uint public mySuperDuperFunNumber;

    function magic() external {
        mySuperDuperFunNumber++;
    }
}