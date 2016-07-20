contract VEXMembers {

    address public owner;
    uint public memberLimit;
    uint public numMembers;

    mapping(address => bool) public member;

    function VEXMembers() {
        numMembers = 0;
        owner = msg.sender;
        memberLimit = 100;
        member[msg.sender] = true;
        numMembers += 1;
    }

    function becomeMember() notMember() public returns (bool) {
        if (msg.value < 1 ether || numMembers >= memberLimit) {
            throw;
        } else {
            member[msg.sender] = true;
            numMembers += 1;
            return true;
        }
    }

    function addMember(address newMember) isOwner() returns (bool) {
        if(member[newMember] == true) {
            throw;
        } else {
            member[newMember] = true;
            numMembers += 1;
            return true;
        }
    }

    modifier notMember() {
        if(member[msg.sender]) {
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
