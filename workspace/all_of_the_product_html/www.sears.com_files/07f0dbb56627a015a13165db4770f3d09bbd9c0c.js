function classifyBySIDAndReferrer(sid, referrer, isSeo) {
  var sid = sid ? sid.toLowerCase() : null,
      isSeo = isSeo ? isSeo.toLowerCase() : null,
      fireIfPresent = {
        iax: "|Affiliate|Affiliate|Affiliate|Affiliate|Broad",
        i008: "|Affiliate|Affiliate|Affiliate|Affiliate|Broad",
        kax: "|Affiliate|Affiliate|Affiliate|Affiliate|Broad",
        max: "|Affiliate|Affiliate|Affiliate|Affiliate|Broad",
        iaespx: "|Affiliate|Affiliate|Espanol|Espanol|Broad",
        iaprgx: "|Affiliate|Affiliate|PR|PR|Broad",
        cj: "|Affiliate|Affiliate|CJ|CJ|Broad",
        idax: "|Affiliate|Affiliate|Direct|Direct|Broad",
        kdax: "|Affiliate|Affiliate|Direct|Direct|Broad",
        mdax: "|Affiliate|Affiliate|Direct|Direct|Broad",
        ibx: "|All_Other|All_Other|Blogs|Blogs|Broad",
        qrx: "|All_Other|All_Other|QR|QR|Broad",
        sms: "|All_Other|All_Other|SMS|SMS|Broad",
        iox: "|Email|Email|Promo|Promo|Broad",
        iex: "|Email|Email|Transaction|Transaction|Broad",
        itx: "|Email|Email|Triggered|Triggered|Broad",
        im: "|Media|Media|Media|Media|Broad",
        imx: "|Media|Media|Media|Media|Broad",
        dfa: "|Media|Media|Media|Media|Online_Video",
        olv: "|Media|Media|Media|Media|Online_Video",
        udis: "|Media|Media|Media|Media|Upper_Funnel_Display",
        nat: "|Media|Media|Media|Media|Native",
        adid: "|Media|Media|Media|Media|Media_Click",
        ism: "|Media|Media|Media|Media|Social_Media",
        comm: "|Social_Media|Social_Media|Community|Community|Broad",
        cdphone: "|CD_CC_Phone|CD_CC_Phone|CD_CC_Phone|CD_CC_Phone|Broad",
        tax: "|CD_CC_Phone|CD_CC_Phone|CD_CC_Phone|CD_CC_Phone|Broad",
        kdx: "|Datafeeds|Datafeeds|Datafeeds|Datafeeds|Broad",
        mdx: "|Datafeeds|Datafeeds|Datafeeds|Datafeeds|Broad"
      },
      doNotFireIfPresent = ["isx", "ksx", "msx", "ssx", "ism", "kiosk", "is", "imx20120601x002000", "imx20120809x002001", "imx20120809x002002"],
      seList = [
    "altavista.co",
    "aol.co.uk",
	"search.aol.co.uk",
	"search.aol.com",
	"search.aol.ca",
	"ask.com",
	"ask.co.uk",
	"www.baidu.com",
	"daum.net",
	"search.daum.net",
    "google.com",
	"google.co",
	"googlesyndication.com",
	"google.com.ar",
	"google.com.au",
	"google.at",
	"google.com.bh",
	"google.com.bd",
	"google.be",
	"google.com.bo",
	"google.ba",
	"google.com.br",
	"google.bg",
	"google.ca",
	"google.cl",
	"google.cn",
	"google.com.co",
	"google.co.cr",
	"google.hr",
	"google.cz",
	"google.dk",
	"google.com.do",
	"google.com.ec",
	"google.com.eg",
	"google.com.sv",
	"google.ee",
	"google.fi",
	"google.fr",
	"google.de",
	"google.gr",
	"google.com.gt",
	"google.hn",
	"google.com.hk",
	"google.hu",
	"google.co.in",
	"google.co.id",
	"google.ie",
	"google.is",
	"google.co.il",
	"google.it",
	"google.com.jm",
	"google.co.jp",
	"google.jo",
	"google.co.ke",
	"google.co.kr",
	"google.lv",
	"google.lt",
	"google.com.my",
	"google.com.mt",
	"google.mu",
	"google.com.mx",
	"google.co.ma",
	"google.nl",
	"google.co.nz",
	"google.com.ni",
	"google.com.ng",
	"google.no",
	"google.com.pk",
	"google.com.py",
	"google.com.pe",
	"google.com.ph",
	"google.pl",
	"google.pt",
	"google.com.pr",
	"google.com.qa",
	"google.ro",
	"google.ru",
	"google.st",
	"google.com.sa",
	"google.com.sg",
	"google.sk",
	"google.si",
	"google.co.za",
	"google.es",
	"google.lk",
	"google.se",
	"google.ch",
	"google.com.tw",
	"google.co.th",
	"google.bs",
	"google.tt",
	"google.com.tr",
	"google.com.ua",
	"google.ae",
	"google.co.uk",
	"google.com.uy",
	"google.co.ve",
	"google.com.vn",
	"google.co.vi",
	"icqit.com",
	"bing.com",
	"myway.com",
	"naver.com",
	"search.naver.com",
	"netscape.com",
	"reference.com",
	"seznam",
	"abcsok.no",
	"tiscali.it",
	"virgilio.it",
	"search.yahoo.com",
	"yahoo.com",
	"ar.yahoo.com",
	"ar.search.yahoo.com",
	"au.yahoo.com",
	"au.search.yahoo.com",
	"ca.yahoo.com",
	"ca.search.yahoo.com",
	"fr.yahoo.com",
	"fr.search.yahoo.com",
	"de.yahoo.com",
	"de.search.yahoo.com",
	"hk.yahoo.com",
	"hk.search.yahoo.com",
	"in.yahoo.com",
	"in.search.yahoo.com",
	"yahoo.co.jp",
	"search.yahoo.co.jp",
	"kr.yahoo.com",
	"kr.search.yahoo.com",
	"mx.yahoo.com",
	"mx.search.yahoo.com",
	"ph.yahoo.com",
	"ph.search.yahoo.com",
	"sg.yahoo.com",
	"sg.search.yahoo.com",
	"es.yahoo.com",
	"es.search.yahoo.com",
	"telemundo.yahoo.com",
	"espanol.search.yahoo.com",
	"tw.yahoo.com",
	"tw.search.yahoo.com",
	"uk.yahoo.com",
	"uk.search.yahoo.com",
	"yandex",
	"search.cnn.com",
	"search.earthlink.net",
	"search.comcast.net",
	"search.rr.com",
	"optimum.net"
      ],
      linkInternalFilters = [
        ".sears.com",
        ".shld.net",
        "www.paypal.com",
        ".searspr.com",
        ".sears.com.pr",
        ".kmart.com",
        ".searspartsdirect.com",
        ".shopyourway.com",
        ".mygofer.com",
        ".craftsman.com",
        ".kenmore.com",
        ".diehard.com",
        ".fitstudio.com",
        ".searsoutlet.com",
        ".searshomeservices.com",
        ".mykmart.com",
        ".landsend.com",
        ".searsholdings.com",
        ".sears.ca",
        ".fitorbit.com",
        "searshometownstores.com",
        ".managemylife.com",
        ".searshardwarestores.com",
        ".searsoptical.com",
        "88sears.com",
        ".searsportrait.com",
        ".shopyourwayrewards.com",
        ".kmartdesign.com",
        ".thegreatindoors.com",
        ".searsflowers.com",
        ".searsportrait.com",
        ".searsphotos.com",
        ".searsliquidations.com",
        ".servicelive.com",
        "184.106.1.131",
        "184.106.1.128",
        "184.106.1.129",
        ".chtah.com",
        ".expotv.com",
        ".mysears.com",
        ".opionlab.com",
        ".richrelevance.com",
        "semantictec.com",
        "expotv.com",
        ".sundaysky.com",
        ".sundaysky-sandbox.com",
        "hlserve.com"
      ],
      parser = document.createElement('a');

  function startsWith(toSearch, forValue) {
    return toSearch.substring(0, forValue.length) === forValue;
  }

  function endsWith(toSearch, forValue) {
    return toSearch.substring(toSearch.length - forValue.length, toSearch.length) === forValue;
  }

  function any(toCurry, matcher, iterable) {
    if (!BrightTag.Types.isArray(toCurry)) {
      toCurry = [toCurry];
    }
    for (var i = 0; i < iterable.length; i++) {
      if (matcher.apply(null, toCurry.concat(iterable[i]))) {
        return true;
      }
    }
    return false;
  }

  function classifyBySID() {
    if (any(sid, startsWith, doNotFireIfPresent)) {
      return null;
    }
    for (var k in fireIfPresent) {
      if (startsWith(sid, k)) {
        return fireIfPresent[k];
      }
    }
    if (any(sid, startsWith, "idx")) {
      if (any(parser.hostname, endsWith, seList)) {
        return null;
      }
      return '|Datafeeds|Datafeeds|Datafeeds|Datafeeds|Broad';
    }
    return classifyByReferrer()
  }

  function classifyByReferrer() {
    if (any(parser.hostname, endsWith, linkInternalFilters)) {
      return null;
    }
    if (any(parser.hostname, endsWith, seList)) {
      return '|SEO|SEO|SEO|SEO|Broad';
    }
    return sid ? '|Unassigned|Unassigned|Unassigned|Unassigned|Broad' : '';
  }

  parser.href = referrer || null;
  if (sid) {
    return classifyBySID();
  } else if (referrer) {
    return classifyByReferrer(); 
  } else if (isSeo && isSeo.indexOf('seo') > -1) {
    return '|SEO|SEO|SEO|SEO|Broad';
  } else if (referrer == "") {
    return '|Direct_to_Site|DTS|DTS|DTS|Broad';
  } else {
    return '|NS_REF|NSR|NSR|NSR|Broad';
  }
}