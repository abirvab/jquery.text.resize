/// <reference path="../libs/jquery-1.8.3.js" />
; (function ($) {

    $.fn.TextSize = function (settings) {
        var THIS = this;
        var init = function () {
            addDataFontSize();
            var changedPercent = loadStoredData("textsizepercent");
            resizeText(changedPercent);
            $("a[data-text-size-change]").removeClass("active");
            $("a[data-text-size-change=" + changedPercent + "]").addClass("active");
        };
        var addDataFontSize = function () {
            $($(THIS)[0].tagName + " *").each(function (id, data) {
                if (!$(data).is(settings.OutOfScope)) {
                    if (!$(data).is("[data-font-size]")) {
                        var pixels = parseInt($(data).css("font-size").substring(0, $(data).css("font-size").length - 2));
                        $(data).attr("data-font-size", pixels);
                    }
                }

            });
        };
        var storeData = function (type, obj) {
            var data = obj;

            // If using a modern browser, lets use localStorage and avoid the overhead
            // of a cookie
            if (typeof localStorage != 'undefined' && localStorage !== null) {
                localStorage[type] = data;
            }

                // Otherwise we need to store data in a cookie, not quite so eloquent.
            else {
                jQuery.cookie(type, data, { expires: 365, path: '/' });
            }
        };
        var loadStoredData = function (type) {
            var data;

            // If using localStorage, retrieve from there
            if (typeof localStorage != 'undefined' && localStorage !== null) {
                data = localStorage[type];
            }

                // Otherwise we have to use cookie based storage
            else {
                data = jQuery.cookie(type);
            }

            // If we have data, lets turn it into an object, otherwise return false
            if (data) {
                return parseInt(data);
            }
            return 100;
        };
        var resizeText = function (changedPercent) {
            addDataFontSize();
            $($(THIS)[0].tagName + " *").each(function (id, data2) {
                if (!$(data2).is(settings.OutOfScope)) {
                    if (changedPercent != 100) {
                        var pixels = parseInt($(data2).attr("data-font-size"));
                        $(data2).css("font-size", (pixels * (changedPercent / 100)) | 0 + "px");
                    }
                    else {
                        $(data2).css("font-size", "initial");
                        var str = $(data2).attr("style");
                        try {
                            if (str.search("font-size") != -1) {
                                str = str.replace(/font-size:/i, "");
                                str = str.replace(/initial;/i, "");

                            }
                            $(data2).attr("style", str);
                        } catch (e) {

                        }
                    }
                }

            });
        };
        $("a[data-text-size-change]").each(function (id, data) {
            $(data).click(function (event) {
                event.preventDefault();
                var changedPercent = parseInt($(this).attr("data-text-size-change"));
                resizeText(changedPercent);
                storeData("textsizepercent", changedPercent);
                $("a[data-text-size-change]").removeClass("active");
                $("a[data-text-size-change=" + changedPercent + "]").addClass("active");

                return false;
            });
        });

        init();
        return this;

    };

}(jQuery));
