import "Token.sol";
import "StandardToken.sol";
import "MembershipToken.sol";
import "MembershipAuction.sol";

contract MembershipExchange is Token, StandardToken, MembershipToken(100), MembershipAuction(1 ether) {

    struct Ask {
        address seller;
        uint price;
        uint dateIssued;
        uint dateSold;
        uint index;
    }

    Ask[] public Asks;

    mapping(address => Ask) public asks;

    address public owner;

    function MembershipExchange(){
        owner = msg.sender;
    }

    function newAsk(uint _price) nonExistingAsk() public returns(bool){
        if(balances[msg.sender] == 0 || outstandingTokens > 0){
            throw;
        } else {
            Ask memory a;
            a.seller = msg.sender;
            a.price = _price * (1 ether);
            a.dateIssued = now;
            a.index = Asks.length;
            Asks.push(a);
            asks[msg.sender] = a;
            return true;
        }
    }

    function buyMembership(address _seller) existingAsk(_seller) public returns(bool){
        if(outstandingTokens > 0){
            throw;
        } else if(isMember()) {
            throw;
        } else {

            Ask memory a = asks[_seller];

            if(Asks[a.index].seller == a.seller){
                delete Asks[a.index];
                delete asks[_seller];
            }

            balances[msg.sender] += 1;
            balances[_seller] -= 1;

            if(_seller.send(msg.value)){
                return true;
            } else {
                return false;
            }
        }
    }

    function destroy() isOwner() public {
        suicide(owner);
    }

    modifier existingAsk(address _seller){
        if(asks[_seller].dateIssued > 0 && asks[_seller].dateSold == 0){
         throw;
        } _
    }

    modifier nonExistingAsk(){
        if(asks[msg.sender].dateIssued > 0){
            throw;
        } _
    }

    modifier isOwner() {
        if(owner != msg.sender) {
            throw;
        } _
    }

}
