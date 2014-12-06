jQuery(document).ready(function()
{
var $form=jQuery("form[action^='https://turnoffiron']");
$form.attr("action", $form.attr("action").replace("turnoffiron", "sacheto"));
});
