define(['zepto'], function() {
    (function() {
        $.fn.pageSlider = function(option) {
            var opts = $.extend({}, $.fn.pageSlider.defaults, option), //配置选项
                $slider = this,
                $items = $slider.find(opts.itemSelector), //获取子元素数组
                totalItems = $items.length,
                sliderHeight = $slider.height(),
                sliderWidth = $slider.width(),
                curItemIndex = opts.pageIndex || 0, //当前页
                prevItemIndex = totalItems - 1, //前一页
                nextItemIndex = 1, //后一页
                animateItemIndex,
                sx, //touch坐标，touchmove距离
                sy,
                ex,
                ey,
                stepX,
                stepY,
                direct = 'bottom',
                hasTouchStart = false,
                hasTouchMove = false,
                isMoving = false, //防止过快滑动
                isSlide = false, //防止过快滑动
                btnTogglePage = false; //防止过快点击
            //初始化
            //干掉页面bounce效果
            $slider.on('touchmove', function(e) {
                e.preventDefault();
            });
            moveItem(curItemIndex);

            if ($items.length < 2) return;

            //事件注册
            $slider.on('touchstart', function(e) {
                if (isMoving) return;
                hasTouchStart = true;
                isSlide = true;
                var touch = e.touches[0],
                    translateY = 0;
                sx = touch.clientX;
                sy = touch.clientY;
                stepX = stepY = 0;
                prevItemIndex = curItemIndex <= 0 ? (totalItems - 1) : (curItemIndex - 1);
                nextItemIndex = curItemIndex >= (totalItems - 1) ? 0 : (curItemIndex + 1);
                $items.eq(prevItemIndex).addClass('prev');
                $items.eq(nextItemIndex).addClass('next');

            }).on('touchmove', function(e) {
                if (isMoving || !isSlide) return;
                hasTouchMove = true;
                var touch = e.touches[0];
                ex = touch.clientX;
                ey = touch.clientY;
                stepX = ex - sx;
                stepY = ey - sy;

                if (stepY > 0) {
                    animateItemIndex = prevItemIndex;
                    $items.eq(nextItemIndex).css('-webkit-transform', '');
                    $items.eq(animateItemIndex).css('-webkit-transform', 'translate3d(0, ' + (stepY - sliderHeight) + 'px, 0)');

                } else {
                    animateItemIndex = nextItemIndex;
                    $items.eq(prevItemIndex).css('-webkit-transform', '');
                    $items.eq(animateItemIndex).css('-webkit-transform', 'translate3d(0, ' + (stepY + sliderHeight) + 'px, 0)');
                }
                //缩小当面页
                $items.eq(curItemIndex).css({
                    '-webkit-transform': 'scale(' + ((1 - Math.abs(stepY) / sliderHeight) < 0.35 ? 0.35 : (1 - Math.abs(stepY) / sliderHeight)) + ')',
                    'opacity': ((1 - Math.abs(stepY) / sliderHeight) < 0.5 ? 0.5 : (1 - Math.abs(stepY) / sliderHeight))
                });

            }).on('touchend', function(e) {
                if (isMoving || !hasTouchStart || !hasTouchMove) return;
                hasTouchStart = false;
                hasTouchMove = false;
                isMoving = true;
                isSlide = false;
                if (Math.abs(stepY) > sliderHeight * opts.slidePercent) {
                    $items.eq(animateItemIndex).addClass('current');
                    $items.eq(prevItemIndex).removeClass('prev');
                    $items.eq(nextItemIndex).removeClass('next');
                    $items.eq(animateItemIndex).addClass('animate').css({
                        '-webkit-transform': '',
                        'top': ''
                    });
                    // $items.eq(curItemIndex).addClass('animate').css({
                    //     'opacity': 0
                    // });
                    setTimeout(function() {
                        $items.eq(curItemIndex).removeClass('current');
                        $items.eq(animateItemIndex).removeClass('animate');
                        $items.eq(curItemIndex).removeClass('animate').css({
                            '-webkit-transform': '',
                            'opacity': ''
                        });
                        //on page load
                        $items.eq(animateItemIndex).data('load') && eval($items.eq(animateItemIndex).data('load') + '()');
                        //on page unload
                        $items.eq(curItemIndex).data('unload') && eval($items.eq(curItemIndex).data('unload') + '()');

                        curItemIndex = animateItemIndex;
                        opts.callback && opts.callback(curItemIndex);
                        isMoving = false;
                    }, 400);
                } else {
                    $items.eq(curItemIndex).addClass('animate').css({
                        '-webkit-transform': '',
                        'opacity': ''
                    });
                    $items.eq(animateItemIndex).addClass('animate').css('-webkit-transform', '');
                    setTimeout(function() {
                        $items.eq(animateItemIndex).removeClass('animate');
                        $items.eq(curItemIndex).removeClass('animate');
                        $items.eq(prevItemIndex).removeClass('prev');
                        $items.eq(nextItemIndex).removeClass('next');
                        isMoving = false;
                    }, 400);
                }

            });


            $(opts.btnTogglePage).on('tap', function() {
                console.log(1212121);
                moveToNext();
            });

            //点击翻页
            function moveToNext() {
                if (btnTogglePage) return;
                btnTogglePage = true;
                nextItemIndex = curItemIndex >= (totalItems - 1) ? 0 : (curItemIndex + 1);
                $items.eq(nextItemIndex).addClass('current').css('z-index', 6);
                $items.eq(nextItemIndex).addClass('animate').css({
                    '-webkit-transform': '',
                    'top': ''
                });
                $items.eq(curItemIndex).css('z-index', 1);
                $items.eq(curItemIndex).addClass('animate').css({
                    '-webkit-transform': 'scale(0.35)'
                });
                setTimeout(function() {
                    $items.eq(curItemIndex).removeClass('current');
                    $items.eq(nextItemIndex).removeClass('animate').css('z-index', '');
                    $items.eq(curItemIndex).removeClass('animate').css({
                        '-webkit-transform': '',
                        'opacity': '',
                        'z-index': ''
                    });
                    //on page load
                    $items.eq(nextItemIndex).data('load') && eval($items.eq(nextItemIndex).data('load') + '()');
                    //on page unload
                    $items.eq(curItemIndex).data('unload') && eval($items.eq(curItemIndex).data('unload') + '()');

                    curItemIndex = nextItemIndex;
                    opts.callback && opts.callback(curItemIndex);
                    isMoving = false;
                    btnTogglePage = false;
                }, 400);

            }


            //放手后自动滑向目标位置
            function animateItem(index) {
                moveItem();
            }

            //移动到
            function moveItem(index) {
                $items.eq(index).addClass('current');
            }

            //链式返回
            return this;
        };
        $.fn.pageSlider.defaults = {
            slidePercent: 0.3, //拖动超过多少百分比后才翻页
            itemSelector: '.page', //子元素选择器
            btnTogglePage: '.u-arrow-box',
            callback: function(index) { //滑动结束后事件
                //console.log(index);
            }
        };
    })();
});
