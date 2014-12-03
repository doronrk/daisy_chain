jQuery(document).ready(function ($) {

    $(".CategoryTreeView .TreeView td.SelectedNodeStyle a")
        .parents("div")
        .prev()
        .find(".NodeStyle a")
        .addClass("SelectedNodeStyle-Parent");

});
