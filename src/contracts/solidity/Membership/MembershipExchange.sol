import "Token.sol";
import "StandardToken.sol";
import "MembershipToken.sol";
import "MembershipAuction.sol";

contract MembershipExchange is Token, StandardToken, MembershipToken(1), MembershipAuction(1, 0, 10) {

    struct Ask {
        address seller;
        uint price;
        uint dateIssued;
    }

    struct Bid {
        address bidder;
        uint price;
        uint dateIssued;
    }

    mapping(address => Ask) public asks;
    mapping(address => Bid) public bids;

    address[] public sellers;
    address[] public buyers;
    address public owner;

    function MembershipExchange(){
        owner = msg.sender;
    }

    function settle(Bid b, Ask a) internal returns(bool){
        uint tradingFee = b.price*25/10000; //.25% trading fee;

        if(!a.seller.send(b.price - tradingFee)){
            return false;
        } else {
            balances[a.seller] -= 1;
            balances[b.bidder] += 1;

            delete bids[b.bidder];
            delete asks[a.seller];
            return true;
        }
    }

    function matchExchangeAsk(Ask a) internal returns(bool){
        if(buyers.length == 0){
            return false;
        } else {
            uint l = 0;
            for(var i = 0; i < buyers.length; i++){
                if(bids[buyers[i]].price > a.price){
                    if(l == 0){
                        l = i;
                    }

                    if(bids[buyers[i]].price > bids[buyers[l]].price){
                        l = i;
                    }

                    if(i == buyers.length - 1){
                        if(!settle(bids[buyers[l]], a)){
                            return false;
                        } else {
                            delete buyers[l];
                            return true;
                        }
                    }
                }
            }
        }
    }

    function newExchangeAsk(uint _askPrice) acceptAsk(_askPrice) public returns(bool){
        Ask memory a;
        a.seller = msg.sender;
        a.price = _askPrice*(1 ether);
        a.dateIssued = now;

        if(matchExchangeAsk(a)){
            return true;
        } else {
            asks[msg.sender] = a;
            if(sellers.length == 0){
                sellers.push(msg.sender);
                return true;
            } else {
                for(var i = 0; i < sellers.length; i++){
                    if(sellers[i] == 0x0){
                        sellers[i] = msg.sender;
                        return true;
                    } else if(i == sellers.length - 1){
                        sellers.push(msg.sender);
                        return true;
                    }
                }
            }
        }
    }

    function matchExchangeBid(Bid b) internal returns(bool){
        if(sellers.length == 0){
            return false;
        } else {
            uint l = 0;
            for(var i = 0; i < sellers.length; i++){
                if(asks[sellers[i]].price < b.price){
                    if(l == 0){
                        l = i;
                    }

                    if(asks[sellers[i]].price < asks[sellers[l]].price){
                        l = i;
                    }

                    if(i == sellers.length - 1){
                        if(!settle(b, asks[sellers[l]])){
                            return false;
                        } else {
                            delete sellers[l];
                            return true;
                        }
                    }
                }
            }
        }
    }

    function newExchangeBid() acceptBid() public returns(bool){
        Bid memory b;
        b.bidder = msg.sender;
        b.price = msg.value;
        b.dateIssued = now;

        if(matchExchangeBid(b)){
            return true;
        } else {
            bids[msg.sender] = b;
            if(buyers.length == 0){
                buyers.push(msg.sender);
                return true;
            } else {
                for(var i = 0; i < buyers.length; i++){
                    if(buyers[i] == 0x0){
                        buyers[i] = msg.sender;
                        return true;
                    } else if(i == buyers.length - 1){
                        buyers.push(msg.sender);
                        return true;
                    }
                }
            }
        }
    }

    function validateAsk(uint _askPrice) internal returns(bool){
        if(!isMember()){
            return false;
        } else if(_askPrice == 0){
            return false;
        } else {
            return true;
        }
    }

    function getBalance() public returns(uint){
        return address(this).balance;
    }

    function destroy() isOwner() public {
        suicide(owner);
    }

    modifier acceptBid(){
        if(msg.value == 0){
            throw;
        } else if(isMember()){
            throw;
        } _
    }

    modifier acceptAsk(uint _askPrice){
        if(!validateAsk(_askPrice*(1 ether))){
            throw;
        } _
    }

    modifier isOwner() {
        if(owner != msg.sender) {
            throw;
        } _
    }

}
