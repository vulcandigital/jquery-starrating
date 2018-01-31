(function ($) {
    $.fn.starRating = function (options) {
        var settings = $.extend({
            stars: 5,
            current: 0,
            callback: function (value) {
                console.log(value);
            }
        }, options);

        var $ul = this;
        var $li = $('<li class="star"><i class="fa fa-star"></i></li>');

        if (this.attr('data-current')) {
            settings.current = this.attr('data-current');
        }

        if (this.attr('data-stars')) {
            settings.stars = this.attr('data-current');
        }

        for (var i = 0; i < settings.stars; i++) {
            var $clone = $li.clone();
            if (settings.current && i < settings.current) {
                $clone.addClass('active')
            }

            $ul.append($clone);
        }

        var _this = this;

        $ul.find('li').on('click', function () {
            if ($(this).hasClass('last')) {
                $ul.find('li.active').removeClass('active last');
                settings.callback(0);
                return;
            }
            $ul.find('li.active').removeClass('active last');
            $(this).addClass('active last');
            $(this).prevAll().addClass('active');

            var selected = $ul.find('li.active').length;
            $(settings.targetInput).val(selected);
            settings.callback(selected);
        }).hover(function () {
            $ul.addClass('hover');
            $(this).addClass('hover');
            $(this).prevAll().addClass('hover');
        }, function () {
            $ul.removeClass('hover');
            $(this).removeClass('hover');
            $(this).prevAll().removeClass('hover');
        });
    };
}(jQuery));