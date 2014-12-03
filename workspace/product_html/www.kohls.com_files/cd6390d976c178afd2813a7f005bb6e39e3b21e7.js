(function (group) {
  if (group !== "B" && group !== "C") {
        /* Format: [ "groupName", lowerBounds, upperBounds ] */
        var groups = [["B",0,49], ["C",50,99]];
        /* Group B is 50% and Group C is 50% */
        var rnd = BrightTag.Random.integer() % 100;
        var g = groups.length;
        for (var i=0; i<=groups.length; i++) {
            if (rnd>=groups[i][1] && rnd<=groups[i][2]) {
                g = i;
                break;
            }
        }
        var date = new Date();
        date.setTime(date.getTime()+(365*86400000));
        var expires = date.toGMTString();
        var cookieValue = "BTgroup20140214=" + groups[g][0] + ";path=/;expires=" + expires;
        document.cookie = cookieValue;
        /* console.log(cookieValue); */
  }
}(bt_cookie("BTgroup20140214")));