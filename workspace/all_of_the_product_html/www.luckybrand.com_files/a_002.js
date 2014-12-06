
var functionCall = self.setInterval(function(){getProductId()},4000);
function getProductId(){
    if (document.getElementsByTagName
	&& document.createElement && document.getElementById("pid")) {
            var productId = document.getElementById("pid").value;
            if(productId.match(/^\d+$/))
            {
                if (productId.length > 0) {
                    var i = document.createElement('script');
                    i.src = document.location.protocol
                    + '//lucky.netmng.com/dct/?aid=2332&feedId=349&productId='
                    + productId; 
                    document.getElementsByTagName('body')[0].appendChild(i);
                }
                clearInterval(functionCall);
            }
    }
}var nm_mt_rand = '966154735';
var nm_tag_uri = 'https://';
var nm_query_str = 'aid=2332';


(function() {
	if (document.body
	&& document.createElement) {
		var i;
		i = document.createElement('IMG');
		i.src = document.location.protocol + '//pixel.ingest.at.atwola.com/ingestor/applications/netmining/pixel?segments=306393719'
		i.width=1;
		i.height=1;
		document.body.appendChild(i);
	}
})();

var i=document.createElement('IMG'); i.src='//dis.criteo.com/pump/match.aspx?c=10&uid=kn05pdo3jdywo'; i.width=1; i.height=1; document.body.appendChild(i);
var i=document.createElement('IMG'); i.src='//x.bidswitch.net/sync?dsp_id=14&user_id=kn05pdo3jdywo&expires=30'; i.width=1; i.height=1; document.body.appendChild(i);


 