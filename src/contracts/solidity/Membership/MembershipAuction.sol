import "Token.sol";
import "StandardToken.sol";
import "MembershipToken.sol";

contract MembershipAuction is Token, StandardToken, MembershipToken(100) {

    uint public period;
    uint public auctionStartDate;
    uint public auctionEndDate;
    uint public currentDay;
    uint public highestBid;

    struct Bid {
        address bidder;
        uint price;
        uint bidDate;
    }

    mapping(uint => mapping(uint => Bid)) public bids;
    mapping(uint => uint[]) public prices;

    function MembershipAuction(uint minBid, uint _period, uint _startDelay) {
        highestBid = minBid;
        period = _period;
        auctionStartDate = now + (8*_startDelay);
        auctionEndDate = now + (8*_startDelay) + (8*period);
    }

    function bid(uint bidAmount) acceptBid(bidAmount) public returns(bool){

        return true;
    }

    modifier acceptBid(uint bidAmount){
        if(bidAmount <= highestBid){
            throw;
        } _
    }



}
