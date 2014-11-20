define(['zepto'], function(zep) {
    window.Snow = function(options) {
        var defaults = {
            contain: $('#snowbox'),
            snowBg: '/demo/images/snow.png',
            boxW: $(window).width(),
            boxH: $(window).height()
        }
        this.opt = $.extend({}, defaults, options);
        this.empty = function() {
            this.opt.contain.empty();
        }
        this.init = function() {
            this.addSnowSpirit();
        }

        this.addSnowSpirit = function() {
            var i;
            var offsetL;
            var randTime;
            for (i = 0; i < 300; i++) {
                offsetL = Math.floor(Math.random() * this.opt.boxW + 1);
                offsetT = Math.floor(Math.random() * this.opt.boxH + 1) - 10;
                randTime = Math.floor(Math.random() * 30 + 10);
                this.opt.contain.append('<i style="-webkit-animation-duration:' + randTime + 's;left:' + offsetL + 'px;top:-' + offsetT + 'px;" class="snowitem' + Math.floor(Math.random() * 5 + 1) + '"></i>');
            }
        }
    }
});
