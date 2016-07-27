import "StandardToken.sol";

contract Members is StandardToken {

    address public owner;
    uint public outstandingTokens;

    function Members() {
        owner = msg.sender;

        outstandingTokens = 100;
        totalSupply = 100;

        balances[msg.sender] = 1;
        outstandingTokens -= 1;
    }

    function becomeMember() notMember() public returns (bool) {
        if (msg.value < 1 ether || outstandingTokens == 0) {
            throw;
        } else {
            balances[msg.sender] = 1;
            outstandingTokens -= 1;
            return true;
        }
    }


    function isMember() public returns(bool) {
      if(balances[msg.sender] == 0){
        return false;
      } else {
        return true;
      }
    }

    function addMember(address newMember) isOwner() returns (bool) {
        if(balances[newMember] == 1) {
            throw;
        } else {
            balances[newMember] = 1;
            outstandingTokens -= 1;
            return true;
        }
    }

    modifier notMember() {
        if(balances[msg.sender] == 1) {
          throw;
        } _
    }

    modifier isOwner() {
        if(owner != msg.sender) {
            throw;
        } _
    }

    function destroy() isOwner() public {
        suicide(owner);
    }
}
