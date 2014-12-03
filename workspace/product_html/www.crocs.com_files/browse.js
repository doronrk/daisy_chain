var bd = {};


bd.categories = {};

bd.cysku = null;

bd.constants = {
    "topFocusItems":"com.seewhy.b.tfi",
    "currentsku":"com.seewhy.b.cysku",
    "topFocusCategories":"tfc",
    "sku":"sku",
    "productname":"name",
    "productMasterId":"productMasterId",
    "productdescription":"description",
    "productURL":"productURL",
    "imageURL":"imageURL",
    "price":"price",
    "recommendations":"recommendations",
    "isVariant":"isVariant",
    "masterSKU":"masterSKU",
    "category":"com.seewhy.b.category",
    "reviewScore":"reviewScore",
    "reviewSummary":"reviewSummary",
    "reviewLink":"reviewLink",
    "averageEngagementTimeSecs":18,
    "score":"score",
    "scoreThreshold":6.0,
    "ditchThreshold":0.0005,
    "scorematrix":"com.seewhy.b.sm",
    "activityCount":"count",
    "activityDwell":"dwell",
    "activityLastViewed":"lastViewed",
    "activityBookmark":"bookmark",
    "activitySocialMark":"social",
    "activityFacebookShare":"share",
    "activityPrint":"print",
    "activityEmail":"email",
    "activityReview":"review",
    "activityTweet":"tweet",
    "activityVariantSelect":"variant",
    "labelOpCode":"com.seewhy.b.opCode",
    "activityDwellSF":10,
    "maximumInterestPeriod":86400,      //one day
    "skus":"com.seewhy.b.skus",
    "categories":"com.seewhy.b.categories",
    "category_property":"category"
};

bd.weights = {
    "count":1,
    "dwell":1,
    "bookmark":3,
    "social":5,
    "share":5,
    "tweet" : 5,
    "email" : 10,
    "print" : 15,
    "review" : 10,
    "variant":2

};


bd.setCallback = function(cb)
{
    try {

        bd.callback = cb;

    }
    catch(err){}
}

bd.addRecommendation = function(sku, recommendationSKU, name, imageURL, productURL)
{
    try {
        bd.__teststorage();

        var m = sessionStorage.getItem(bd.constants.labelOpCode);

//        if(m==="cart")
//        {
//            return;
//        }
        if (bd.__hasRecord('p', sku))
        {
            var record = bd.__getRecord('p', sku);

            var recommend = record[bd.constants.recommendations];

            if (!recommend.hasOwnProperty(recommendationSKU))
            {

                var item = {};
                item[bd.constants.productname] = name;
                item[bd.constants.imageURL] = imageURL;
                item[bd.constants.productURL] = productURL;

                recommend[recommendationSKU] = item;
                bd.__writeField('p', sku, record);
            }
        }
    }
    catch(err){}
}

bd.addCategoryPick = function(sku, name, description, imageURL, productURL, pickrank, category)
{
    var catpicks = {};

    if (bd.__hasRecord('c', category))
    {
        catpicks = bd.__getRecord('c', category);
    }

    //will overwrite existing pickrank

    var record = {};
    record[bd.constants.sku] = sku;
    record[bd.constants.productname] = name;
    record[bd.constants.productdescription] = description;
    record[bd.constants.imageURL] = imageURL;
    record[bd.constants.productURL] = productURL;

    catpicks[pickrank] = record;

    bd.__writeField('c', category, catpicks);

    //check that category is in list
    bd.__checkCategory(category);
}

bd.categoryPicks = function(catkey)
{
    if (bd.__hasRecord('c', catkey))
    {
        return bd.__getRecord('c', catkey);
    }
}

bd.mostVisitedCategory = function()
{
    try
    {
        var categories_s = localStorage.getItem(bd.constants.category);
        if (categories_s)
        {
            var max = 0;
            var bestcat;
            var categories = JSON.parse(categories_s);
            for (var key in categories)
            {
                if (categories.hasOwnProperty(key))
                {
                    if (categories[key] > max)
                    {
                        if (bd.__hasRecord('c', key))
                        {
                            bestcat = key;
                            max = categories[key];
                        }
                    }
                }
            }

            if (bestcat)
            {
                return bestcat;
            }
        }
    }
    catch(err){}
}

bd.__checkCategory = function(category)
{
    //check that category is in list

    var categories;

    categories_s = localStorage.getItem(bd.constants.category);
    if (!categories_s) {
        categories = {};
    }
    else {
        categories = JSON.parse(categories_s);
    }

    if (!categories.hasOwnProperty(category))
    {
        categories[category] = 1;
    }
    else
    {
        categories[category]++;
    }

    localStorage.setItem(bd.constants.category, JSON.stringify(categories));
}

bd.addProduct = function(sku, name, description, imageURL, productURL, indicativePrice, category, reviewScore, reviewSummary, reviewLink, productMasterId)
{
    try {

        bd.__teststorage();

		var pmid = sku;
		if (productMasterId) {
			pmid = productMasterId;
		}

        if (!bd.__hasRecord('p', sku))
        {
            bd.__createRecord(sku, name, description, imageURL, productURL, indicativePrice, category, reviewScore, reviewSummary, reviewLink, pmid);
        }

        var scorematrix = {};
        var scorematrix_s = localStorage.getItem(bd.constants.scorematrix);
        if (scorematrix_s) {
            scorematrix = JSON.parse(scorematrix_s);
        }

        var d = new Date();

        if (scorematrix[sku])
        {
            var scorecard = scorematrix[sku];

            scorecard[bd.constants.activityCount] = scorecard[bd.constants.activityCount]+1;
            scorecard[bd.constants.activityLastViewed] = d.getTime();
        }
        else
        {
            var scorecard = {}
            scorecard[bd.constants.activityCount] = 1;
            scorecard[bd.constants.activityDwell] = 0;
            scorecard[bd.constants.activityBookmark] = 0;
            scorecard[bd.constants.activitySocialMark] = 0;
            scorecard[bd.constants.activityFacebookShare] = 0;
            scorecard[bd.constants.activityTweet] = 0;
            scorecard[bd.constants.activityEmail] = 0;
            scorecard[bd.constants.activityPrint] = 0;
            scorecard[bd.constants.activityReview] = 0;
            scorecard[bd.constants.activityLastViewed] = d.getTime();
            scorecard[bd.constants.activityVariantSelect] = 0;
            scorecard[bd.constants.score] = 0;

            scorematrix[sku] = scorecard;
        }

        localStorage.setItem(bd.constants.scorematrix, JSON.stringify(scorematrix));

        bd.cysku = sku;
        localStorage.setItem(bd.constants.currentsku, sku);
        //now do the categories

        //check that category is in list
        bd.__checkCategory(category);
    }
    catch(err){}
}

bd.productVariantSelect = function(sku)
{
    try {
        bd.__doit(sku, bd.constants.activityVariantSelect);
    }
    catch(err){}
}

bd.productBookmarked = function(sku)
{
    try {
        bd.__doit(sku, bd.constants.activityBookmark);
    }
    catch(err){}
}

bd.productSocialLike = function(sku)
{
    try {
        bd.__doit(sku, bd.constants.activitySocialMark);
    }
    catch(err){}
}

bd.productFacebook = function(sku)
{
    try {
        bd.__doit(sku, bd.constants.activityShare);
    }
    catch(err){}
}

bd.productTweet = function(sku)
{
    try {
        bd.__doit(sku, bd.constants.activityTweet);
    }
    catch(err){}
}

bd.productEmailed = function(sku)
{
    try {
        bd.__doit(sku, bd.constants.activityEmail);
    }
    catch(err){}
}

bd.productPrinted = function(sku)
{
    try {
        bd.__doit(sku, bd.constants.activityPrint);
    }
    catch(err){}
}

bd.productReviewed = function(sku)
{
    try {
        bd.__doit(sku, bd.constants.activityReview);
    }
    catch(err)
    {
    }
}

bd.productPageDwell = function(sku, dwell)
{
    try
    {
        bd.__teststorage();

        var scorematrix_s = localStorage.getItem(bd.constants.scorematrix);
        if (scorematrix_s) {
            var scorematrix = JSON.parse(scorematrix_s);
            var scorecard = scorematrix[sku];
            if (scorecard) {
                var os = scorecard[bd.constants.activityDwell];
                var ns = bd.__dwellScore(dwell);
                if (ns > os) {
                    scorecard[bd.constants.activityDwell] = ns;
                }
                bd.__propagateScores(scorematrix, scorecard);
            }
        }
    }
    catch(err)
    {
    }
}

bd.__doit = function(sku, field)
{
    bd.__teststorage();

    var scorematrix_s = localStorage.getItem(bd.constants.scorematrix);
    if (scorematrix_s) {
        var scorematrix = JSON.parse(scorematrix_s);
        var scorecard = scorematrix[sku];
        if (scorecard) {
            scorecard[field] = 1;
            bd.__propagateScores(scorematrix, scorecard);
        }
    }
}

bd.__teststorage = function()
{
    if (typeof(Storage) === "undefined")
    {
        throw new UserException("no storage");
    }
}

bd.__propagateScores = function(scorematrix, scorecard)
{
    var d = new Date();
    var t = d.getTime();
    bd.__rescore(scorematrix, t);

    bd.__extractCurrentFocusProducts(scorematrix);

    scorecard[bd.constants.activityLastViewed] = t;

    localStorage.setItem(bd.constants.scorematrix, JSON.stringify(scorematrix));
}

bd.__rescore = function(scorematrix, t)
{
	try
	{
    for (var sku in scorematrix)
    {
        if (scorematrix.hasOwnProperty(sku))
        {
            var scorecard = scorematrix[sku];

            	var secs = (t - scorecard[bd.constants.activityLastViewed]) / 1000;

            	var td = bd.__timedecayScore(secs);
            	var ws = bd.__weightedScore(scorecard,secs);
				//alert("td is "+td+" and ws is "+ws);

				//high ws should dominate the score.  However, if the majority of ws is made of
				//dwell, then this domination will diminish faster than td
				var s = td * ws;

				if(scorecard[bd.constants.score]==0)
            	{
					if (s > bd.constants.scoreThreshold)
					{
						scorecard[bd.constants.score] = s;
					}
            	}
				else
				{
            		if (s < bd.constants.ditchThreshold)
			    	{
			        	delete scorematrix[sku];
					}
            		else
            		{

				    	scorecard[bd.constants.score] = s;

            		}

				}


        }
    }
}
	catch(err){}
}

bd.__weightedScore = function(scorecard,secs)
{

    var score = 1;    //scorecard[bd.constants.activityDwell];
    score = score + scorecard[bd.constants.activityCount];
    score = score + bd.weights.bookmark * scorecard[bd.constants.activityBookmark];
    score = score + bd.weights.social * scorecard[bd.constants.activitySocialMark];
    score = score + bd.weights.share * scorecard[bd.constants.activityFacebookShare];
    score = score + bd.weights.tweet * scorecard[bd.constants.activityTweet];
    score = score + bd.weights.email * scorecard[bd.constants.activityEmail];
    score = score + bd.weights.print * scorecard[bd.constants.activityPrint];
    score = score + bd.weights.review * scorecard[bd.constants.activityReview];
    score = score + bd.weights.variant * scorecard[bd.constants.activityVariantSelect];

    var activityScore = Math.log(score * 10.0) / Math.log(2);
    var dwellScore = bd.__dwellScore(secs);
    return Math.ceil(activityScore*dwellScore);
}

bd.__dwellScore = function(dwell)
{
    if (dwell >= bd.constants.averageEngagementTimeSecs)
    {
        //return 6.0/(1.0 + 0.06 * (Math.pow(0.9,-dwell / 5.0)));
        return 6.0*Math.exp(-dwell/10000);
    }
    else
    {
        var v = Math.exp(dwell * 0.15 / 5.0);
        return v;
    }
}

bd.__timedecayScore = function(secs)
{
    var dd = secs/86400;
    var s = Math.exp(-0.005*dd*dd);
    //var s = 1.0 /(1.0 + 0.08 * ( Math.pow(0.65,-deltaSecs-12.0)));


    return s;
}

bd.__getSize = function(obj)
{
        var c = 0;
        for (key in obj)
        {
            if (obj.hasOwnProperty(key))
            {
                c++;
            }
        }
        return c;
}

//PDX2
bd.sendEvent = function() {

    var records = JSON.parse(localStorage.getItem(bd.constants.topFocusItems));
    var categories_s = localStorage.getItem(bd.constants.category);
    var categories = JSON.parse(categories_s);

    var scorematrix;
    var scorematrix_s = localStorage.getItem(bd.constants.scorematrix);
    if (scorematrix_s) {
        scorematrix = JSON.parse(scorematrix_s);
    }

	var key;
    var catcount = 0;
    for (key in categories) {
        if (categories.hasOwnProperty(key)) {
            catcount++;
        }
    }
	var scores = {};
    var prods = {};
    var prodcount = 0;
    if (scorematrix && records) {
        for (key in records) {
            prods[key] = bd.__getRecord('p', key);
		    var sc = scorematrix[key];
		    scores[key] = sc['score'];
            prodcount++;
        }
    }

    bd.__sendEvent(prodcount, prods, scores, catcount, categories);
};

bd.__extractCurrentFocusProducts = function(scorematrix)
{
    var records = {};

    var oldrecords = {};

    if (localStorage.getItem(bd.constants.topFocusItems))
    {
        oldrecords = JSON.parse(localStorage.getItem(bd.constants.topFocusItems));
    }

    var upload = false;

    for (key in scorematrix)
    {
        bd.__processScoreCard(key, scorematrix[key], records);
    }

	if(bd.__getSize(records) == 0)
	{
		//alert("size of records is 0")
	}

    localStorage.setItem(bd.constants.topFocusItems, JSON.stringify(records));

    localStorage.setItem(bd.constants.scorematrix, JSON.stringify(scorematrix));

    //test for upload

    var upload = false;

	var current_max = 0;
	var hsp;
    for (key in records)
    {
		if (records[key] > current_max) {
			hsp = key;
			current_max = records[key];
		}

        if (!oldrecords.hasOwnProperty(key))
        {
            upload = true;
            break;
        }
    }

    if (upload)
    {
		//PDX2

        // Merch
        localStorage.setItem("com.seewhy.m.sc", "1");
        if (window.cymerch && cymerch.browseChange) {
            cymerch.browseChange();
        }
        else {
			bd.sendEvent();
		}

		if (cy.control.dx && cy.control.dx.cySM1) {
			hsp = hsp || bd.cysku;
			if (hsp) {
				// It may not be the highest scoring product that has changed, and we only need to make the cySM1 call
				// when it is the highest scoring one that has changed, but we will make the call here if anything in tfi
				// has changed.
				cy.control.dx.cySM1(hsp);
			}
		}
    }
}

bd.__processScoreCard = function(key, scorecard, records)
{
    var upload = false;

    if (bd.__size(records) > 0)
    {
        if (bd.__size(records) < 3)
        {
            records[key] = scorecard.score;

            if (scorecard.score > bd.constants.scoreThreshold)
            {
                upload = true;
            }
        }
        else if (records.hasOwnProperty(key))
        {
            if (records[key] < scorecard.score)
            {
                records[key] = scorecard.score;
            }
        }
        else
        {

            var smallestkey = "none";
            var smallestvalue = 1000;

            for (var i in records)
            {

                if (records.hasOwnProperty(i))
                {
                    if (records[i] < scorecard.score)
                    {
                        if (records[i] < smallestvalue)
                        {
                            smallestkey = i;
                            smallestvalue = records[i];
                        }


                    }
                }
            }

            //if candidate found, replace it here

            if (smallestkey !== "none")
            {

                delete records[smallestkey];

                records[key] = scorecard.score;

                upload = true;


            }
        }
    }
    else
    {
        if(scorecard.score > bd.constants.scoreThreshold )
        {
            records[key] = scorecard.score;
            upload = true;
        }
    }


    return upload;
}

bd.__size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

bd.__hasRecord = function(type, item)
{
    //return localStorage.getItem(sku) !== null;
    var rb = false;
    var lsType;
    if (type == 'p') {
        lsType = bd.constants.skus;
    }
    else if (type == 'c') {
        lsType = bd.constants.categories;
    }
    var i = localStorage.getItem(lsType);
    if (i) {
        var items = JSON.parse(i);
        var r = items[item];
        if (r) {
            rb = true;
        }
    }
    return rb;
}

bd.__createRecord = function(sku, name, description, imageURL, productURL, indicativePrice, category, reviewScore, reviewSummary, reviewLink, productMasterId)
{
    var record = {};
    record[bd.constants.productname] = name;
    record[bd.constants.productdescription] = description;
    record[bd.constants.imageURL] = imageURL;
    record[bd.constants.productURL] = productURL;
    record[bd.constants.price] = indicativePrice;
    record[bd.constants.reviewScore] = reviewScore;
    record[bd.constants.reviewSummary] = reviewSummary;
    record[bd.constants.reviewLink] = reviewLink;
    //aka master
    record[bd.constants.category_property] = category;
    record[bd.constants.recommendations] = {};
    record[bd.constants.productMasterId] = productMasterId;

    //localStorage.setItem(bd.constants.skuprefix + sku, JSON.stringify(record));
    //bd.__writeToStorage(sku, record);
    bd.__writeField('p', sku, record);
}

bd.terminate = function()
{
    try
    {
        bd.__teststorage();

        //localStorage.clear();
        localStorage.removeItem(bd.constants.skus);
        localStorage.removeItem(bd.constants.categories);
        localStorage.removeItem(bd.constants.category);
        localStorage.removeItem(bd.constants.topFocusItems);
        localStorage.removeItem(bd.constants.scorematrix);
        localStorage.removeItem('com.seewhy.b.edc');
        localStorage.removeItem('com.seewhy.b.lastsku');

        sessionStorage.setItem(bd.constants.labelOpCode, "cart")
     }
    catch(err){}
}

bd.__sendEventdebug = function(numproducts, products, scores, numcategories, categories)
{
	var mess = "";
	for (var key in products)
	{
		mess = mess+key;
	}

    alert(mess);

}

bd.__sendEvent = function(numproducts, products, scores, numcategories, categories)
{
    try
    {
        var m = sessionStorage.getItem(bd.constants.labelOpCode);

        if (m === "cart")
        {
            return;
        }

        var top=true;
        for (var key in products)
        {
            var record = products[key];

            cyNewBasketLine();

            cyAddBasketLineDetail('ITEMID', key);
            cyAddBasketLineDetail('ITEMPRICE', record['price']);
            cyAddBasketLineDetail('ITEMNAME', record['name']);
            cyAddBasketLineDetail('ITEMIMAGEURL', record['imageURL']);
            cyAddBasketLineDetail('ITEMDESC', record['description']);
            cyAddBasketLineDetail('ITEMPAGEURL', record['productURL']);
            cyAddBasketLineDetail('ITEMCATEGORY', record['category']);
            cyAddBasketLineDetail('ITEMMASTERID', record['productMasterId']);
			cyAddBasketLineDetail('ITEMBROWSESCORE', scores[key]);
            if(top)
            {
                cyAddBasketLineDetail('ITEMREVIEWSCORE',record['reviewScore']);
                cyAddBasketLineDetail('ITEMREVIEWSUMMARY',record['reviewSummary']);
                cyAddBasketLineDetail('ITEMLink',record['reviewLink']);
                top=false;
            }
            var recommendations = record['recommendations'];

            var append = 0;

            for (var rkey in recommendations)
            {
                var r = recommendations[rkey];

                prepend = 'r' + append++;

                cyAddBasketLineDetail(prepend + 'ITEMID', rkey);
                cyAddBasketLineDetail(prepend + 'ITEMNAME', r[bd.constants.productname]);
                cyAddBasketLineDetail(prepend + 'ITEMIMAGEURL', r[bd.constants.imageURL]);
                cyAddBasketLineDetail(prepend + 'ITEMPAGEURL', r[bd.constants.productURL]);
            }
        }

        cy.Custom14 = numcategories;
        cy.Custom13 = numproducts;
        cy.Custom9 = "Browse";
        cy.FunnelLevel = 3;
        cy.BasketAppend = 0;

        //PDX2
        var lastListRequest = localStorage.getItem("com.seewhy.m.listrequest");
        if (lastListRequest) {
            cy.Custom8 = lastListRequest;
		}

        cy_getImageSrc();

    }
    catch(err){}
}

bd.__getRecord = function(type, item)
{
    var rs = {};
    var i;
    if (type == 'c') {
        i = localStorage.getItem(bd.constants.categories);
    }
    else if (type == 'p') {
        i = localStorage.getItem(bd.constants.skus);
    }
    if (i) {
        var items = JSON.parse(i);
        rs = items[item];
    }
    return rs;
}

bd.__writeField = function(type, key, val)
{
        var items;
        var lsKey;
        if (type == 'p') {
                lsKey = bd.constants.skus;
        }
        else if (type == 'c') {
                lsKey = bd.constants.categories;
        }
        var items_s = localStorage.getItem(lsKey);
        if (!items_s) {
                items = {};
        }
        else {
            items = JSON.parse(items_s);
        }
        items[key] = val;
        localStorage.setItem(lsKey, JSON.stringify(items));
}

// EDC Additions


bd.cyDwellStart = function()
{
    bd.cypageOpen = new Date().getTime();
    //  alert(bd.cypageOpen)
    var t = localStorage.getItem("com.seewhy.b.edc");
    var s = localStorage.getItem("com.seewhy.b.lastsku");
    if (s)
    {
        bd.productPageDwell(s, t);
    }
}

bd.cyDwellStart();

bd.cyDwellTime = function()
{
    try
    {
        bd.cypageClose = new Date().getTime();

        bd.cytime = bd.cypageClose - bd.cypageOpen;
    }
    catch(err)
    {
    }
}


bd.unload = function()
{
    bd.cyDwellTime();
    bd.cysku = localStorage.getItem(bd.constants.currentsku);
    if (bd.cysku)
    {
        localStorage.setItem('com.seewhy.b.edc', (bd.cytime / 1000));
        localStorage.setItem('com.seewhy.b.lastsku', bd.cysku);
    }
    localStorage.removeItem(bd.constants.currentsku);

}


if (window.addEventListener) {
	window.addEventListener('beforeunload', bd.unload, false);
}
else if (window.attachEvent) {
	window.attachEvent('beforeunload', bd.unload);
}

