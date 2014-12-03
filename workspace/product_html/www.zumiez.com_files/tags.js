var overflow = false,
    Tags = {
        createOverflow : function (tags, $moreTags) {
            // check if tags list is exceeding offset and needs to be added to new div
            if (typeof tags !== "undefined") {
                var len = tags.length;
                for (var i = 0; i < len; i++ ) {
                    var tagsOffsetLeft = tags[i].offsetLeft;
                    if ( tagsOffsetLeft > 890 ){
                        overflow = true;
                        $moreTags.appendChild(tags[i]);
                    }
                }
            }
        },
        feedbackMessage : function () {
            $('validation_feedback').show();
            setTimeout(function () {
                $('validation_feedback').hide();
            }, 3000)
        },
        init: function () {

            var $tagContainer = $('tag_container'),
                $tagForm = $('tag_form'),
                $validationFeedback = $('validation_feedback'),
                tags = document.querySelectorAll(".product_tag"),
                $moreTags = $('more_tags'),
                $tagInput = $('tag_input'),
                $tagToggle = $('tag_toggle');

                Tags.createOverflow(tags, $moreTags);

            if ( overflow ) {
                $tagToggle.show();
                $tagToggle.observe('click', function () {
                    $moreTags.toggle();
                    if ($moreTags.visible()) {
                        $(this).addClassName('tag-toggle-open').removeClassName('tag-toggle-closed');
                    } else {
                        $(this).addClassName('tag-toggle-closed').removeClassName('tag-toggle-open');
                    }
                });
                // set height of parent based on dynamic child
                var formHeight = $tagContainer.offsetHeight;
                $tagForm.setStyle({
                    height: formHeight + 'px'
                });
                $moreTags.setStyle({
                    top: formHeight + 'px'
                });
            }

            if($tagContainer) {
                $tagContainer.removeClassName('invis-while-loading');

                $tagInput.onfocus = function () {
                    this.clear();
                    $validationFeedback.hide();
                };

                $$('.close-validation-feedback').invoke('observe', 'click', function () {
                    $validationFeedback.hide();
                });

                Event.observe('tag_form', 'submit', function (event) {

                    Event.stop(event);

                    var $tagInput = $$('[name="productTagName"]')[0].value,
                        $validationMessage = $('validation_message'),
                        $inputLoad = $('input_load');

                    if (($tagInput.length < 3)) {
                        $validationMessage.update('Try again - Your tag must be at least 3 characters.');
                        Tags.feedbackMessage();
                    }
                    if (($tagInput.length > 30)) {
                        $validationMessage.update('Try again - Your tag can\'t be more than 30 characters.');
                        Tags.feedbackMessage();
                    }
                    if (($tagInput.length > 2) && ($tagInput.length < 31)) {
                        $tagForm.request({
                            onLoading: function () {
                                $inputLoad.show();
                            },
                            onComplete: function () {
                                $inputLoad.hide();
                            },
                            onSuccess: function (response) {
                                $validationMessage.update(response.responseText);
                                Tags.feedbackMessage();
                            }
                        });
                    }
                });
            }
        }
    };

Event.observe(document, 'dom:loaded', function () {
    Tags.init();
});

