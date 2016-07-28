import "Token.sol";
import "StandardToken.sol";
import "MembershipToken.sol";

contract MembershipAuction is Token, StandardToken, MembershipToken(100) {

    uint public period;
    uint public auctionStartDate;
    uint public currentDay;
    uint public minBid;

    struct Bid {
        address bidder;
        uint amount;
        uint bidDate;
        bool wonBid;
    }

    mapping(uint => mapping(uint => Bid)) public bids;
    mapping(uint => uint[]) public bidAmounts;
    mapping(uint => uint) public highestBid;
    mapping(uint => uint) public nextDay;
    mapping(address => Bid) public bidders;

    function MembershipAuction(uint _minBid, uint _delay, uint _period) {
        minBid = _minBid * 1 ether;
        period = _period; //86400 // 1 day;
        currentDay = 0;
        auctionStartDate = now + (_delay*period);
        nextDay[currentDay] = auctionStartDate + (1 * period);
        highestBid[currentDay] = minBid;
    }

    function newAuctionBid(uint _bidAmount) acceptAuctionBid(_bidAmount) public returns(bool){

        Bid memory b;
        b.bidder = msg.sender;
        b.amount = _bidAmount*(1 ether);
        b.bidDate = now;
        b.wonBid = false;

        bidders[msg.sender] = b;
        bids[currentDay][b.amount] = b;
        bidAmounts[currentDay].push(b.amount);
        highestBid[currentDay] = b.amount;
        return true;
    }

    function getBidAmounts(uint _day) public returns(uint[]){
        return bidAmounts[_day];
    }


    function redeemMembership() public returns(bool){
        if(isMember()){
            throw;
        } else if(!isWinningBidder()){
            throw;
        } else if(bidders[msg.sender].amount > msg.value){
            throw;
        } else {
            balances[address(this)] -= 1;
            balances[msg.sender] += 1;
            outstandingTokens -= 1;
            return true;
        }
    }

    function isWinningBidder() public returns(bool){
        currentDay = validateDay();
        if(currentDay == totalSupply){
            for(var i = 0; i <= currentDay; i++){
                Bid memory b = bids[i][highestBid[i]];
                if(b.bidder == msg.sender){
                    return true;
                }
            }
        } else {
            return false;
        }
    }

    function validateDay() internal returns(uint){
        if(currentDay == totalSupply){
            return currentDay;
        } else if(now > nextDay[currentDay]){
            currentDay += 1;
            nextDay[currentDay] = nextDay[currentDay - 1] + (1 * period);
            highestBid[currentDay] = minBid;
            return currentDay;
        } else {
            return currentDay;
        }
    }


    function validateAuctionBid(uint _bidAmount) internal returns(bool){
        if(isMember()){
            return false;
        } else if(auctionStartDate > now){
            return false;
        } else if(_bidAmount*(1 ether) < highestBid[currentDay]){
            return false;
        } else if(currentDay == totalSupply){
            return false;
        } else {
            return true;
        }
    }

    modifier acceptAuctionBid(uint _bidAmount){
        currentDay = validateDay();
        if(!validateAuctionBid(_bidAmount)){
            throw;
        } _
    }

}
