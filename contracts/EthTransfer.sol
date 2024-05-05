// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract EthTransfer {
    
    function transferEther(address payable _to, uint256 _amount) external payable {
        require(address(this).balance >= _amount, "Insufficient balance in the contract");

        uint256 newAmount = _pureMethod(_amount);
        uint256 newAmount2 = _privateMethod(newAmount);

        _to.transfer(newAmount2);
    }

    receive() external payable {}

    function _pureMethod(uint256 _value) internal pure returns (uint256) {
        return _value + 1;
    }

    function _privateMethod(uint256 _value) private pure returns (uint256) {
        return _value - 1;
    }
}
