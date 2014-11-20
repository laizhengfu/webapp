define(['zepto'], function(zep) {
    window.Meteor = function(options) {
        var defaults = {
            contain: $('.meteorbox'),
            boxW: $(window).width(),
            boxH: $(window).height()
        }
        this.opt = $.extend({}, defaults, options);
        this.empty = function() {
            this.opt.contain.empty();
        }
        this.init = function() {
            this.addMeteorSpirit();
        }
        this.addMeteorSpirit = function() {
            var i;
            var offsetL;
            var randTime;
            for (i = 0; i < 20; i++) {
                offsetL = Math.floor(-Math.random() * this.opt.boxW*1.5 + this.opt.boxW);
                offsetT = Math.floor(Math.random() * 50 + 1);
                randTime = Math.floor(Math.random() * 3 + 1);
                randTime2 = Math.floor(Math.random() * 4 + 1);
                //randTime = Math.round(Math.random()*300)/100;
                this.opt.contain.append('<i style="-webkit-animation-delay:' + randTime +'s;-webkit-animation-duration:' + randTime2 + 's;left:' + offsetL + 'px;top:-' + offsetT + 'px;" class="meteoritem style' + Math.floor(Math.random() * 3 + 1) + '"></i>');
            }

            for (i = 0; i < 10; i++) {
                offsetL = Math.floor(Math.random() * this.opt.boxW + 1);
                offsetT = Math.floor(Math.random() * this.opt.boxH + 1);
                randTime = Math.round(Math.random()*100)/100;
                randTime2 = Math.floor(Math.random() * 5 + 1);
                this.opt.contain.append('<i style="-webkit-animation-delay:' + randTime +'s;-webkit-animation-duration:' + randTime2 + 's;left:' + offsetL + 'px;top:' + offsetT + 'px;" class="staritem style' + Math.floor(Math.random() * 3 + 1) + '"></i>');
            }

        }
    }
});
