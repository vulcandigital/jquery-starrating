(function ($) {
    $.fn.starRating = function (options) {
        var settings = $.extend({
            stars: 5,
            targetInput: false,
            current: 0,
            callback: false
        }, options);

        var $ul = this;
        var $li = $('<li class="star"><i class="fa fa-star"></i></li>');

        if (this.attr('data-current')) {
            console.log('sup');
            settings.current = this.attr('data-current');
        }

        if (this.attr('data-stars')) {
            settings.stars = this.attr('data-current');
        }

        if (!settings.targetInput) {
            if (this.attr('data-target')) {
                settings.targetInput = this.attr('data-target');
            } else {
                settings.targetInput = '#' + makeId();
                var $target = $('<input type="hidden"/>').attr('name', 'rating').attr('id', settings.targetInput);
                $ul.after($target)
            }
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

        $(settings.targetInput).val($ul.find('li.active').length);

        function makeId() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 8; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
    };
}(jQuery));