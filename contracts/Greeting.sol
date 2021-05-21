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

  bytes public encoded;

  // constructor() public {
  // }
  function encode(DataV1 memory data) external returns (bytes memory) {
      encoded = abi.encode(data);
      return encoded;
  }

  function sayEncode() external view returns(bytes memory){
    return encoded;
  }

  function decodeDataV1(bytes memory data) internal pure returns (DataV1 memory orderData) {
        orderData = abi.decode(data, (DataV1));
    }
}
