// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract EthTransfer {
    
    function transferEther(address payable _to, uint256 _amount) external payable {
        require(address(this).balance >= _amount, "Insufficient balance in the contract");
        _to.transfer(_amount);
    }

    receive() external payable {}
}
