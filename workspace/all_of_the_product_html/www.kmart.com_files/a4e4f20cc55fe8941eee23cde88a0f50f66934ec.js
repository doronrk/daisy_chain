(function (group) {
  if (group == "" || !isNaN(parseFloat(group))){
    var groups = ["vendorA", "vendorB"],
        rnd = BrightTag.Random.integer() % groups.length,
        date = new Date();
      date.setTime(date.getTime()+(365*86400000));
        var expires = date.toGMTString();
        document.cookie = "BTid=" + groups[rnd] + ";path=/;expires=" + expires;
  }
}(bt_cookie("BTid")))