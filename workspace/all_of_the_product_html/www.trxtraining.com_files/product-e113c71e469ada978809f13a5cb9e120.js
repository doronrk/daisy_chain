$(".license_popup_link").colorbox({
  inline: true,
  href: ".toc-popup",
  onOpen: function() {
    $('.toc-popup').removeClass('hide');
  },
  onCleanup: function() {
    $('.toc-popup').addClass('hide');
  }
});

$(".submit_with_toc_container input").live("click", function(event) {
  if ($(".accept-license-checkbox").attr("checked") == "checked") {
    $(".terms-error").addClass("hide");
    $(".toc_product").submit();
  } else {
    event.preventDefault();
    $(".terms-error").removeClass("hide");
  }
});

$(function(){
  if ($(".size-chart").length > 0) {
    $("a.size-chart.socks").colorbox({
      inline: true,
      scrolling: false,
      href: "div.size-chart",
      onOpen: function() {
        $("div.size-chart").show();
        $("div.size-chart table#socks").show();
      },
      onCleanup: function() {
        $("div.size-chart").hide();
        $("div.size-chart table#socks").hide();
      }
    });

    $("a.size-chart.shorts").colorbox({
      inline: true,
      scrolling: false,
      href: "div.size-chart",
      onOpen: function() {
        $("div.size-chart").show();
        $("div.size-chart table#shorts").show();
      },
      onCleanup: function() {
        $("div.size-chart").hide();
        $("div.size-chart table#shorts").hide();
      }
    });

    $("a.btn-close-small").click(function(){
      $.colorbox.close();
    });
  }
});

$(document).ready(function() {
  $('.toc-popup .overlay_close_button').click(function () {
    $.colorbox.close();
    return false;
  });
});
/* JS CODE FOR SIZE & COLOR VARIANTS */


function getVariantWrapperId(select) {
  var wrapper = $(select).closest('.variant-wrapper');
  var id = '#' + wrapper.attr('id');
  return id;
}

(function() {
  trx.namespace("products.details");
  trx.products.details = function() {

    function showSizeOptions(color, id) {
      $(id + " .variant_size_select option.size").remove();
      // get the option elements with selected color and append it
      var options = $(id + " select.list-of-sizes option." + color).clone();
      $(id + " .variant_size_select").append(options);
      $(id + " .variant_size_select").val($(id + " .variant_size_select option:first").val());
    }

    var change_product_sizes = function() {
      var id = getVariantWrapperId(this);
      var selected_color = $(this).find(":selected").attr("class");
      showSizeOptions(selected_color, id);
    }

    return {
      init: function() {
        // preselect the color and size options if in the cart

        var variants = $('.variant_color_select');

        for (var i = 0; i < variants.length; i++) {
          var id = getVariantWrapperId(variants[i]);
          var color = $(id).data('color');
          var size = $(id).data('size');

          if (typeof color !== 'undefined' && typeof size !== 'undefined') {
            $(id + " .variant_color_select").val(color);
            var selected_color = $(id + " .variant_color_select").find(":selected").attr("class");
            showSizeOptions(selected_color, id);
            $(id + " .variant_size_select").val(size);
          } else if (variants.length == 1) {
            // if data-color and data-size are empty, this means we're in the pdp page
            // check if a color is selected on page load, if so, show the size option
            var colorCount = $('select.variant_color_select option').length;

            var selected_color = $(".variant_color_select option:selected").attr("class");

            if (colorCount == 2) {
              var option = $('.variant_color_select option').last();
              option.prop('selected', true);
              selected_color = option.attr('class');
            }

            if (typeof selected_color != "undefined") {
              showSizeOptions(selected_color, id);
            }
          }
        }

        $(".variant_color_select").change(change_product_sizes);

        $('.reviewsCount, #product-ratingimg-professional div:first-child').click(function() {
          if ($('#tabs').length) {
            $("#tabs").tabs( "option", "active", 1 );
          }
        });

        if ($('#product-order').get(0)) {
          $('#product-order .product-order-form').validate({
            rules: {
              quantity: {
                required: true,
                range: [1, 5]
              }
            },
            messages: {
              "quantity": {
                'range': 'We\'re sorry, there is a limit of 5 allowed for purchase. Contact customer service if you find this message in error.'
              }
            },
            errorElement: "div",
            errorPlacement: function(error, element) {
              error.appendTo($(".product-order-form"));
            }
          });
        }
      }
    }
  }();

  $(document).ready(function() {
    trx.products.details.init();
  });

})();

function ValidateProductVariants(id) {
  var original = id;
  id = typeof id !== 'undefined' ? '#' + id : '';

  var err_count = 0;
  $(id + " .err_msg_varient_size").text("");
  $(id + " .err_msg_varient_color").text("");
  var variant_size = $(id + " .variant_size_select").get(0).selectedIndex;
  var variant_color = $(id + " .variant_color_select").get(0).selectedIndex;

  if (variant_size == 0) {
    $(id + " .err_msg_varient_size").text("Please select size");
    $(id + " .variant_size_select").css("background", "#FFC4C4");
    err_count = err_count + 1;
  } else {
    $(id + " .variant_size_select").css("background", "#ECECEC");
    $(id + " .err_msg_varient_size").text("");
  }

  if (variant_color == 0) {
    $(id + " .err_msg_varient_color").text("Please select color");
    $(id + " .variant_color_select").css("background", "#FFC4C4");
    err_count = err_count + 1;
  } else {
    $(id + " .variant_color_select").css("background", "#ECECEC");
    $(id + " .err_msg_varient_color").text("");
  }

  if (variant_size > 0) {
    if (variant_color == 0) {
      $(id + " .err_msg_varient_color").text("Please select color");
      $(id + " .variant_color_select").css("background", "#FFC4C4");
      err_count = err_count + 1;
    } else {
      $(id + " .variant_color_select").css("background", "#ECECEC");
      $(id + " .err_msg_varient_color").text("");
    }
  }

  if (err_count > 0) {
    err_count = 0;
    return false;
  } else {
    if (id.length) {
      // create hidden inputs for the selected variant to update
      var selected_id = $('input[name=' + original + ']').val();
      var color = $('select[name=' + original + '-color]').val();
      var size = $('select[name=' + original + '-size]').val();
      var id_input = $("<input>").attr("type", "hidden").attr("name", "id").val(selected_id);
      var color_input = $("<input>").attr("type", "hidden").attr("name", "color").val(color);
      var size_input = $("<input>").attr("type", "hidden").attr("name", "size").val(size);
      $('#cartForm').append($(id_input));
      $('#cartForm').append($(color_input));
      $('#cartForm').append($(size_input));
    }
    return true;
  }
}

$('.variant_size_select').change(function() {
  var id = getVariantWrapperId(this);
  var variant_size = $(id + " .variant_size_select").get(0).selectedIndex;
  if (variant_size != 0) {
    $(id + " .err_msg_varient_size").text("");
    $(id + " .variant_size_select").css("background", "#ECECEC");
  }
});

$('.variant_color_select').change(function() {
  var id = getVariantWrapperId(this);
  var variant_color = $(id + " .variant_color_select").get(0).selectedIndex;
  if (variant_color != 0) {
    $(id + " .err_msg_varient_color").text("");
    $(id + " .variant_color_select").css("background", "#ECECEC");
  }
});


