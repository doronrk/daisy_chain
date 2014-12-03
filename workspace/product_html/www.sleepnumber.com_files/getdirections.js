function getDirections(line1, line2, town, postalCode, latitude, longitude) {
	var url = "https://maps.google.com/maps?daddr=";
    var addr1 = "";
    if (line1 !=null && line1 != '') {
        addr1 += line1 + ", ";
    }
    if (line2 !=null && line2 != '') {
        addr1 += line2 + ", ";
    }
    if (town !=null && town != '') {
        addr1 += town + ", ";
    }
    if (postalCode !=null && postalCode != '') {
        addr1 += postalCode + ", ";
    }
    if (line1 !=null && line1 != '') {
        var l = line1.length;
        addr1 = line1.substring(0, l - 2);
        url += line1;
    }
    if (latitude !=null && latitude != '' && longitude !=null && longitude != '') {
        if (addr1 ==null || addr1 == '') {
            url += latitude + "," + longitude;
        }
        else {
            url += "@" + latitude + "," + longitude;
        }
    }
        window.open(url, "_blank");
    }
