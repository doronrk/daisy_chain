(function (group) {
  if (group == "") {
    var groups = ["A", "B"],
        rnd = BrightTag.Random.integer() % groups.length,
        date = new Date();
        date.setTime(date.getTime()+(365*86400000));
    var expires = date.toGMTString();
        
        document.cookie = "BTgroup=" + groups[rnd] + ";path=/;expires=" + expires;
  }
}(bt_cookie("BTgroup")))