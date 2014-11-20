define(['zepto','coffee'], function() {
    (function() {
        var defaults = {
            audioBtn: '.audio_btn',
            audioHost: "#audio_host"
        };
        $.fn.audioRender = function(option) {
            var opts = $.extend({}, defaults, option);
            var au = $(opts.audioBtn);
            var audioHost = $(opts.audioHost);
            var audioAnimate;

            //music
            $(".u-globalAudio").coffee({
                steams: ['<img src="css/images/musicalNotes.png"/>', '<img src="css/images/musicalNotes.png"/>', '<img src="css/images/musicalNotes.png"/>', '<img src="css/images/musicalNotes.png"/>', '<img src="css/images/musicalNotes.png"/>', '<img src="css/images/musicalNotes.png"/>'],
                steamHeight: 100,
                steamWidth: 50
            });

            audioHost.attr('src', audioHost.data('src'));
            audioHost.attr('loop', true);
            audioHost.attr('autoplay', false);
            au.addClass('z-play');
            $.fn.coffee.start();

            au.on('click', function() {
                if ($(this).data('status') === 'off') {
                    $(this).data('status', 'on');
                    $(this).data('clickStatus', 'on');
                    audioHost.get(0).play();
                    $.fn.coffee.start();
                } else {
                    $(this).data('status', 'off');
                    $(this).data('clickStatus', 'off');
                    audioHost.get(0).pause();
                    $.fn.coffee.stop();
                }
                au.toggleClass('z-play');
            });

            //摇一摇背景音乐开启或者暂停
            var SHAKE_THRESHOLD = 3000;
            var last_update = 0;
            var x, y, z, last_x = 0,
                last_y = 0,
                last_z = 0;
            var shake_play;

            function deviceMotionHandler(eventData) {
                var acceleration = eventData.accelerationIncludingGravity;
                var curTime = new Date().getTime();
                if ((curTime - last_update) > 10) {
                    var diffTime = curTime - last_update;
                    last_update = curTime;
                    x = acceleration.x;
                    y = acceleration.y;
                    z = acceleration.z;
                    var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                    if (speed > SHAKE_THRESHOLD) {
                        clearTimeout(shake_play);
                        shake_play = setTimeout(function() {
                            au.trigger('click');
                        }, 500);
                    }
                    last_x = x;
                    last_y = y;
                    last_z = z;
                }
            }

            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', deviceMotionHandler, false);
            }

            audioHost.get(0).play();
            $(document).one('touchstart', function() {
                audioHost.get(0).play();
            });

            //audio play/pause when page visibilityChange
            var visibilityChange;
            if (typeof document.hidden !== "undefined") {
                visibilityChange = "visibilitychange";
            } else if (typeof document.mozHidden !== "undefined") {
                visibilityChange = "mozvisibilitychange";
            } else if (typeof document.msHidden !== "undefined") {
                visibilityChange = "msvisibilitychange";
            } else if (typeof document.webkitHidden !== "undefined") {
                visibilityChange = "webkitvisibilitychange";
            }

            function handleVisibilityChange() {
                console.log('handleVisibilityChange ...');
                if (au.data('clickStatus') === 'off') return;
                if (au.data('status') === 'off') {
                    au.data('status', 'on');
                    audioHost.get(0).play();
                    $.fn.coffee.start();
                } else {
                    au.data('status', 'off');
                    audioHost.get(0).pause();
                    $.fn.coffee.stop();
                }
                au.toggleClass('z-play');
            }
            document.addEventListener(visibilityChange, handleVisibilityChange, false);
            //audio play/pause when page visibilityChange end
        };
    })();
});
