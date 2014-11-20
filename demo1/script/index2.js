define(['zepto', 'pageSlider2', 'coffee', 'audio', 'meteor'], function() {
    $(function() {
        var pageWidth = Math.min($(window).width(), $(window).height()),
            pageHeight = Math.max($(window).width(), $(window).height());;


        //封面图片加载完,隐藏loading
        // var cacheCoverImage = new Image();
        // cacheCoverImage.src = $("#imageSrc").val();
        // cacheCoverImage.onload = function() {
        appinit();
        //}

        function appinit() { //app初始化
            //background music
            $('.audio_btn').length && $('.audio_btn').audioRender();
            //background music end

            initPages();

            function initPages() {
                //page init
                var mapLoaded = false;
                $('.main').pageSlider({
                    itemSelector: '.page',
                    callback: function(index) {
                        console.log(index);
                        if (index == 3 && !mapLoaded) {
                            console.log('load map');
                            mapLoaded = true;
                        }
                    }
                });


                $('.fullsizeimg,.inneritem').each(function() {
                    $(this).css('background-image', 'url(' + $(this).data('src') + ')');
                });

            }

        }

        window.load1 = function() {
            console.log('message load1');
        }
        window.unload1 = function() {
            console.log('message unload1');
        }
        var mymeteor = new Meteor()
        mymeteor.init();
        window.meteorplay = function() {
            mymeteor.init();
        }
        window.meteorstop = function() {
            mymeteor.empty();
        }

    });

});
