/* eComm: */
var RewardsLoyaltyBanner = {
    showInfo: function() {
        var cookies = new CookieManager();
        var RewardsName = cookies.getValueIgnoreCase('UserName') || '';
        var RewardPoints = cookies.getValueIgnoreCase('RewardPoints') || '';
        var RewardMembership = cookies.getValueIgnoreCase('RewardsMembership') || '';
        var RewardAwayFromGold = cookies.getValueIgnoreCase('AwayFromGold') || '';

        RewardsName = RewardsLoyaltyBanner.checkName(RewardsName);

        if (RewardsName != '' && RewardPoints != '' && RewardMembership != '') {
            $('#phSuccessful').show();
            $('#phNotLoggedIn').hide();
            $('#firstname').html(RewardsName + '<a href="/Profiles/Login.aspx"> Not ' + RewardsName + '?</a>');
            $('#rewardpoints').html(RewardPoints);
            $('#membership').html(RewardMembership);
            if (RewardAwayFromGold != '') {
                $('#awaygold').html(RewardAwayFromGold);
            }
        }
        else {
            $('#phSuccessful').hide();
            $('#phNotLoggedIn').show();
        }
    },

    checkName: function(name) {
     	name = decodeURIComponent(name);
        name = name.replace(/\+/g, '');
        name = name.replace(/\s+/g, '');
       
        if (name.length > 8) {
            name = name.substr(0, 7);
        }
        
        return name;
    }

};

RewardsLoyaltyBanner.showInfo();







/* Creative: */
function RewardsPopUp () {
	$('#rewards-popup').fadeIn();
}

function RewardsOverwrite() {
	var cookies = new CookieManager();
	var RewardsName = cookies.getValueIgnoreCase('UserName') || '';
	function checkRWname(name) {
		name = decodeURIComponent(name);
        	name = name.replace(/\+/g, '');
        	name = name.replace(/\s+/g, '');
       
        	if (name.length > 8) {
            		name = name.substr(0, 7);
        	}
        
        return name;
	}
	RewardsName = checkRWname(RewardsName);
	$('#firstname').html(RewardsName + '<a href="/Profiles/Login.aspx"> Not ' + RewardsName + '?</a>');		
	function stripAlphaChars(pstrSource) { 
		var m_strOut = new String(pstrSource); 
		m_strOut = parseInt(m_strOut.replace(/[^0-9]/g, '')); 
		return m_strOut; 
	}
	var points = $('#rewardpoints').text();
	points = stripAlphaChars(points);
	var dollars = '$' + (Math.floor(points / 100) * 5);
	var bar = ((Math.floor(points / 100) * 28) - 140) + 'px 0px';
	var nextMult = Math.ceil(points / 100);
	var next = nextMult * 100 - points;
	if (next == 0) { next = 100; }
	var away = $('#awaygold').text();
	var value = Math.round(away*Math.pow(10,2))/Math.pow(10,2);
	var gold = '$' + value;
	$('#rewardpoints').prepend('Current REWARDS Points: ');
	$('#rewardsearned').html('REWARDS Earned<br /><span id="pointsearned">' + dollars + '</span> <a href="#">details</a>');
	$('#ctl00_RewardsLoyaltyBanner').append('<div id="rewardsdisplay" style="display:none;"></div>');
	$('#rewardpoints').append(' <a href="#">details</a>');
	$('#rewardpoints a').livequery('click',
		function(event) {
			$('#membership').show();
			$('a.details').show();
			$('#firstname').css('background-image', 'url(/App_Themes/Default/images/2010/loyalty/loyalty-standard-toggle.jpg)');
			$('#rewardsearned').css('background-image', 'url(/App_Themes/Default/images/2010/loyalty/loyalty-earned-standard.jpg)');
			$(this).parent().css('background-image', 'url(/App_Themes/Default/images/2010/loyalty/loyalty-points-on.gif)');
			$('#rewardsdisplay').show().html('<p>You need ' + next + ' more points to get to the next reward level <a href="/Content.aspx?ContentID=rewardsoverview" target="_blank">more details</a></p>');
			$('#rewards-popup').fadeOut();
			return false;
		}
	);
	$('.mbrlvlstd').append(' <a href="#" class="details">details</a>');
	$('.mbrlvlstd a.details').livequery('click', 
		function(event) {
			$('a.details').hide();
			$('#membership').hide();
			$('#rewardpoints').css('background-image', 'url(/App_Themes/Default/images/2010/loyalty/loyalty-points.jpg)');
			$('#rewardsearned').css('background-image', 'url(/App_Themes/Default/images/2010/loyalty/loyalty-earned-standard.jpg)');
			$('#firstname').css('background', '#560d18');
			$('#rewardsdisplay').show().html('<p>STANDARD Member: ' + gold + ' away from GOLD Status <a href="/Content.aspx?ContentID=rewardsoverview" target="_blank">more details</a></p>');
			$('#rewards-popup').fadeOut();
			return false;
		}
	);
	$('.mbrlvlgold').append(' <span class="mbrgold">Member</span>');
	$('#rewardsearned a').livequery('click',
		function(event) {
			$('#membership').show();
			$('a.details').show();
			$('#rewardpoints').css('background-image', 'url(/App_Themes/Default/images/2010/loyalty/loyalty-points.jpg)');
			$('#firstname').css('background-image', 'url(/App_Themes/Default/images/2010/loyalty/loyalty-standard-toggle.jpg)');
			$(this).parent().css('background', '#560d18');
			$('#rewardsdisplay').show().html('<p>Rewards Earned<br><span style="font-size: 9px;">(mailed quarterly)</span></p> <div class="chart"></div> <div id="bar"></div> <p class="details"><a onclick="RewardsPopUp(); return false" href="#">more details</a></p>');
			$('#bar').css('background-position', bar);
			$('#rewardsdisplay p').css('position', 'absolute');
			$('#rewardsdisplay p').css('left', '15px');
			$('#rewardsdisplay p.details').css({'left': '270px', 'position' : 'absolute', 'top' : '8px'});
			$('#rewards-popup').fadeOut();
			return false;
		}
	);
	$('#rewards-popup a').livequery('click',
		function() {
			$(this).parent().fadeOut();
			return false;
		}
	);
}

$(document).ready(RewardsOverwrite);

