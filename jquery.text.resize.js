; (function ($) {

    $.fn.TextSize = function (settings) {
        var THIS = this;
        var init = function () {

            $(THIS).children("*").each(function (id, data) {
                if (!$(data).is(settings.OutOfScope)) {
                    var pixels = parseInt($(data).css("font-size").substring(0, $(data).css("font-size").length - 2));
                    $(data).attr("data-font-size", pixels);
                }
            });
        };
        $("a[data-text-size-change]").each(function (id, data) {
            $(data).click(function (event) {
                event.preventDefault();
                var changedPercent = parseInt($(data).attr("data-text-size-change"));
                $(THIS).children("*").each(function (id, data2) {
                    if (!$(data).is(settings.OutOfScope)) {
                        var pixels = parseInt($(data2).attr("data-font-size"));
                        $(data2).css("font-size", pixels * (changedPercent / 100) + "px");
                    }
                });
                return false;
            });
        });
        init();
        return this;

    };

}(jQuery));
