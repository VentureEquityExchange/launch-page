import "StandardToken.sol";

contract MembershipToken is StandardToken {

    uint public outstandingTokens;

    function MembershipToken(uint _totalSupply) {

        outstandingTokens = _totalSupply;
        totalSupply = _totalSupply;

        balances[msg.sender] += 1;
        outstandingTokens -= 1;
    }

    function isMember() public returns(bool) {
      if(balances[msg.sender] == 0){
        return false;
      } else {
        return true;
      }
    }

    modifier notMember() {
        if(balances[msg.sender] == 1) {
          throw;
        } _
    }

}
