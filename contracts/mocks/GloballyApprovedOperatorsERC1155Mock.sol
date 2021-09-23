// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../GloballyApprovedOperatorsERC1155.sol";

contract GloballyApprovedOperatorsERC1155Mock is GloballyApprovedOperatorsERC1155 {
  constructor(address[] memory _globallyApprovedOperators) GloballyApprovedOperatorsERC1155("http://localhost:3000/metadata/{id}.json", _globallyApprovedOperators) {}

  function mint(uint256 _tokenId) external {
    _mint(msg.sender, _tokenId, 1, "");
  }

  function burn(uint256 _tokenId) external {
    _burn(msg.sender, _tokenId, 1);
  }
}
