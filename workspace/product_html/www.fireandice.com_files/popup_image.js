/*
$Id: popup_image.js,v 1.10 2008/11/20 13:44:55 max Exp $
vim: set ts=2 sw=2 sts=2 et:
*/
function popup_image(type, id, max_x, max_y, title, page) {

	if (!page)
		page = 1;

  max_x = parseInt(max_x);
  max_y = parseInt(max_y);

  max_x = (max_x < 1 || !isNaN(max_x)) ? max_x + 40 : 420;
	max_y = (max_y < 1 || !isNaN(max_y)) ? max_y + 40 : 420;

  var url = xcart_web_dir + '/popup_image.php?type=' + type + '&id=' + id + '&title=' + title + '&area=' + current_area + '&page=' + page;

  var res = false;
	if (current_area == 'C' && window.popupOpen) {
		res = popupOpen(
      url,
      title,
      Math.max(Math.min(max_x, $(window).width() - 150), 420),
      Math.max(Math.min(max_y, $(window).height() - 150), 420)
    );
	}

  if (res)
    return true;

	return window.open(
    url,
		'images',
		'width=' + max_x + ',height=' + max_y + ',toolbar=no,status=no,scrollbars=yes,resizable=yes,menubar=no,location=no,direction=no'
	);
}
