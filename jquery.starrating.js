(function ($) {
    $.fn.starRating = function (options) {
        var settings = $.extend({
            stars: 5,
            current: 0,
            callback: function (value) {
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

        $ul.find('li').on('click', function () {
            $ul.find('li.active').removeClass('active');
            $(this).addClass('active');
            $(this).prevAll().addClass('active');
        }).hover(function () {
            $ul.addClass('hover');
            $(this).addClass('hover');
            $(this).prevAll().addClass('hover');
        }, function () {
            $ul.removeClass('hover');
            $(this).removeClass('hover');
            $(this).prevAll().removeClass('hover');
        });

        var selected = $ul.find('li.active').length;

        $(settings.targetInput).val(selected);
        settings.callback(selected);
    };
}(jQuery));