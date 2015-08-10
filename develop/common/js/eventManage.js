function scrollEventSwitch (close) {

    if (close) {
        disableScroll();
    }else {
        enableScroll();
    }

    var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    var oldonwheel, oldonmousewheel1, oldonmousewheel2, oldontouchmove, oldonkeydown, isDisabled;

    //禁止默认事件
    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    //禁止方向键默认事件
    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    //兼容处理关闭默认事件
    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        oldonwheel = window.onwheel;
        window.onwheel = preventDefault; // modern standard

        oldonmousewheel1 = window.onmousewheel;
        window.onmousewheel = preventDefault; // older browsers, IE
        oldonmousewheel2 = document.onmousewheel;
        document.onmousewheel = preventDefault; // older browsers, IE

        oldontouchmove = window.ontouchmove;
        window.ontouchmove = preventDefault; // mobile

        oldonkeydown = document.onkeydown;
        document.onkeydown = preventDefaultForScrollKeys;
        isDisabled = true;
    }

    //兼容处理开启默认事件
    function enableScroll() {
        if (!isDisabled) return;
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);

        window.onwheel = oldonwheel; // modern standard

        window.onmousewheel = oldonmousewheel1; // older browsers, IE
        document.onmousewheel = oldonmousewheel2; // older browsers, IE

        window.ontouchmove = oldontouchmove; // mobile

        document.onkeydown = oldonkeydown;
        isDisabled = false;
    }
}