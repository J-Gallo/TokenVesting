pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/token/ERC20Basic.sol";
import "zeppelin-solidity/contracts/math/Math.sol";

contract TokenVested {
  
	ERC20Basic token;

	struct TokenGrant {
		address granter;
		uint256 value;
	    uint64 cliff;
	    uint64 vesting;
	    uint64 start;
	    bool revokable;
	    bool burnsOnRevoke;
	}

	mapping (address => TokenGrant[]) public grants;

	event NewTokenGrant(address indexed from, address indexed to, uint256 value, uint256 grantId);

	/**
     * @dev Grant tokens to a specified address
     * @param _to address The address which the tokens will be granted to.
     * @param _value uint256 The amount of tokens to be granted.
     * @param _start uint64 Time of the beginning of the grant.
     * @param _cliff uint64 Time of the cliff period.
     * @param _vesting uint64 The vesting period.
     */
	function grantVestedTokens(
	    address _to, 
	    uint256 _value,  
	    uint64 _start, 
	    uint64 _cliff,
	    uint64 _vesting,
	    bool _revokable,
	    bool _burnsOnRevoke
	  ) public  {

	    // Check for date inconsistencies that may cause unexpected behavior
	    require(_cliff >= _start && _vesting >= _cliff);

	    //require(tokenGrantsCount(_to) < MAX_GRANTS_PER_ADDRESS);   // To prevent a user being spammed and have his balance locked (out of gas attack when calculating vesting).
	    
	    uint256 count = grants[_to].push(
	                TokenGrant(
	                  _revokable ? msg.sender : 0, // avoid storing an extra 20 bytes when it is non-revokable
	                  _value,
	                  _cliff,
	                  _vesting,
	                  _start,
	                  _revokable,
	                  _burnsOnRevoke
	                )
	              );

	    // token.transfer(_to, _value);

	    NewTokenGrant(msg.sender, _to, _value, count - 1);
	}

	/**
     * @dev Calculate the date when the holder can trasfer all its tokens
     * @param holder address The address of the holder
     * @return An uint256 representing the date of the last transferable tokens.
     */
	function lastTokenIsTransferableDate(address holder) constant public returns (uint64 date) {
	    date = uint64(now);
	    uint256 grantIndex = grants[holder].length;
	    for (uint256 i = 0; i < grantIndex; i++) {
	      date = Math.max64(grants[holder][i].vesting, date);
	    }
	}

	function tokenGrantsCount(address _holder) constant returns (uint256 index) {
      return grants[_holder].length;
    }

    function getSpecificGrant(address _holder, uint64 _grantIndex) public constant returns (address, uint256, uint64) {
      return (grants[_holder][_grantIndex].granter, grants[_holder][_grantIndex].value, grants[_holder][_grantIndex].cliff);
    }
}






