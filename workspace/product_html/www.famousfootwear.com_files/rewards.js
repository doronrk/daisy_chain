function isTouchDevice() {
    return "ontouchstart" in window;
}
var noUsr=true;
if(/username=/i.test(document.cookie)){
	if(document.cookie.match(/username=(.*?)($|;)/i)[1] != "") {
    noUsr=false;
  }
} 
var Rewards = {
	setCart: function() {
		var cookies = new CookieManager();
		var qty = cookies.getValue("CART_TOTAL_QUANTITY_20000", null);
		if (qty > 0) { $('#cartNum').html(qty).addClass('active'); }
		else { $('#cartNum').html('').removeClass('active'); }
	},
  setInfo: function() {
  	if(isTouchDevice()) {
  		$('#rewardsBar').addClass('touch');
  	}
	  if(noUsr) {
	  	/* USER NOT LOGGED IN */
	  } else {
	  	$('#account-bar').addClass('loggedIn');
			
			var cookies = new CookieManager();
			this.Name = unescape(decodeURI(cookies.getValueIgnoreCase('UserName'))).replace('+', '') || '';
			this.Points = cookies.getValueIgnoreCase('RewardPoints') || '';
			this.Membership = $(decodeURI(unescape(cookies.getValueIgnoreCase('RewardsMembership')))).text() || '';
			if (!/member/i.test(this.Membership)) { this.Membership += " Member"; }
			this.AwayFromGold = cookies.getValueIgnoreCase('AwayFromGold') || '';
			this.UserNotExists = cookies.getValueIgnoreCase('RewardsUserNotExists') || '';
			this.Dollars = '$' + (Math.floor(this.Points / 100) * 5);
			this.Next = Math.ceil(this.Points / 100) * 100 - this.Points;
			if (this.Next == 0) { this.Next = 100; }
			this.Gold = '$' + Math.round(this.AwayFromGold*Math.pow(10,2))/Math.pow(10,2);

			/* CHANGE ELEMENT TEXT */
			$('#account-bar .name').text(Rewards.Name);
			if (Rewards.Points !== '') {
				$('#action-bar .number').text(Rewards.Points).closest('li').css('visibility', 'visible');
			}
			// $('#rewardsBar .earnedNum, #newRewardsInfo .earnedNum').text(Rewards.Dollars);
			// $('#rewardsBar .awayGold, #newRewardsInfo .awayGold').text(Rewards.Gold);
			// $('#rewardsBar .pointsNext, #newRewardsInfo .pointsNext').text(Rewards.Next);
			// var patt = /standard/gi;
			// if (patt.test(Rewards.Membership)) { $('#rewardsBar .stardardMsg').show(); }
			// $('#earned' + Rewards.Dollars.replace('$', '')).addClass('active');
		}
	}
};
Rewards.setCart();
Rewards.setInfo();