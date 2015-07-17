/**
 * [description] 广告重置
 * @return {[type]} [description]
 */
;(function(){
    var item = $('.cxg-ad-code-box');
    /**
     * [code description] 程序处理
     * @return {[type]} [description]
     */
    var code = function(){
         item.each(function(index, el) {
            var index = $(this).attr('data-index');
            var ele = $('#cxg-ad-box-' + index);
            var offset = ele.offset(),
                height = ele.height(),
                width = ele.width();
            $(this).css({width:width,height:height,top:offset.top,left:offset.left,overflow:'hidden'});     
        });    
    }
    code();

    /**
     * [description] 窗口改变事件
     * @return {[type]} [description]
     */
    $(window).resize(function() {
        code();     
    });
   
})();
