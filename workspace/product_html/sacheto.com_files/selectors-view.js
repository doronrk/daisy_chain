//just goes into extensions
jQuery(document).ready(function()
{
jQuery("label.other-customfield").each(function()
{
	$str=jQuery(this).text();
	$oldStr=$str;
	jQuery(this).attr("oldText", $oldStr);
	$str=toTitleCase($str);
	
	$main=$str;
	$secondary='';

	$ar=$str.split("|");
	if($ar.length > 1)
	{
		$main=$ar[0];
		for($i=1;$i<$ar.length;$i++)
		{
			if($secondary.length > 0) $secondary=$secondary+",";
			$secondary=$secondary+" " +$ar[$i];
		}
	}
	if($secondary.length > 1) $str=$main + " (" + $secondary + ")";
	else $str=$main;
	
	jQuery(this).text($str);
})

})

function toTitleCase(str)
{
	console.log(str);
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}