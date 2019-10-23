pragma solidity ^0.5.6;

contract Count {
  uint public count = 0;
  address public lastParticipant;

  function plus() public {
    count++;
    lastParticipant = msg.sender;
  }

  function minus() public {
    count--;
    lastParticipant = msg.sender;
  }
}