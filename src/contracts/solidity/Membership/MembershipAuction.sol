import "Token.sol";
import "StandardToken.sol";
import "MembershipToken.sol";

contract MembershipAuction is Token, StandardToken, MembershipToken(100) {

    uint public period = 1 days;
    uint public periods = outstandingTokens;
    uint public auctionEndDate;
    uint public currentDay;
    uint public highestBid;

    struct Bid {
        address bidder;
        uint price;
        uint bidDate;
    }

    mapping(uint => Bid) public bids;

    function MembershipAuction(uint minBid) {
        highestBid = minBid;
    }

    function bid(uint bidAmount) public returns(bool){
        if(bidAmount <= highestBid){
            throw;
        }
    }



}
