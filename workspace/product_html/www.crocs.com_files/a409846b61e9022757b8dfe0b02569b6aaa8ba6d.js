(function (cell) {
  if (cell == "") {
        // Format: [ "cellName", lowerBounds, upperBounds ]
        var cells = [["VendorA",0,44], ["VendorB",45,89], ["Control",90,99]];
        var rnd = BrightTag.Random.integer() % 100;
        var g = cells.length; // always default to the Control
        for (var i=0; i<=cells.length; i++) {
            if (rnd>=cells[i][1] && rnd<=cells[i][2]) {
                g = i;
                break;
            }
        }
        var date = new Date();
        date.setTime(date.getTime()+(180*86400000));
        var expires = date.toGMTString();
        var cookieValue = "BTcell=" + cells[g][0] + ";path=/;expires=" + expires;
        document.cookie = cookieValue;
        window.console && console.log && console.log(cookieValue);
  }
}(bt_cookie("BTcell")))