// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma abicoder v2;


contract Greeting {
  struct Part {
      address payable account;
      uint96 value;
  }
  struct DataV1 {
      Part[] payouts;
      Part[] originFees;
  }

  string public greet = "Hello";
  bytes public encoded;

  // constructor() public {
  // }
  function encode(DataV1 memory data) external returns (bytes memory) {
      encoded = abi.encode(data);
      return encoded;
  }

  function sayHello() external view returns(string memory) {
    return greet;
  }

  function setGreen(string calldata _new_greet) external {
    greet = _new_greet;
  }
}
