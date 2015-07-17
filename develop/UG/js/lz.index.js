/**
 * [description] 滚动到底部获取分页数据库文件
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
;(function(){
     
    var scrollflag = false,time = null;  
    var scrollPrevData = 0;

    //合并项
    $.fn.scrollPagination = function(options) {
        var opts = $.extend($.fn.scrollPagination.defaults, options);
        return this.each(function() {
            $.fn.scrollPagination.init($(this), opts);
        });

    };

    //设置不请求状态
    $.fn.stopScrollPagination = function(){
        return this.each(function() {
            $(this).attr('scrollPagination', 'disabled');
        });
    };

    //与后台请求处理函数
    var requestLoad = function(element, opts){
        if($(opts.moreElement).length == 0 || element.length == 0) {
            return;
        }
        
        var retOptions = $.extend({},opts.data,{element:element});
        var pageNum = $(opts.moreElement).attr('data-page');
        
        //当页面数为0 表示没有下一页，请求跳出
        if(pageNum <= 0){
            scrollflag = false;
            return;
        };
        
        
        //当上次请求没有完成请求跳出
        if(scrollflag || (scrollPrevData == pageNum) && !opts.data.againSearch) {
            return;
        }
        scrollflag = true;
        opts.moreElement.css('visibility','visible');
        if (typeof opts.beforeLoad == 'function') opts.beforeLoad(opts);
        
        //请求数据
        var _data = GSY.util.getEleData(opts.moreElement, 'data-post') ? GSY.util.getEleData(opts.moreElement, 'data-post') : {};
        var data = $.extend({},{page_num : pageNum},opts.data, _data);
        scrollPrevData = pageNum;
        //发起请求
        var ajaxOptions =  {
            url : opts.url,
            data : data,
            dataType : 'json',
            type : opts.type,
            success : function(ret){
                setTimeout(function(){
                    if(typeof opts.afterLoad == 'function'){
                         opts.afterLoad(ret,opts);  
                    }else{
                        if(ret && ret.data && ret.status === 0){
                            $(element).append(ret.data.html);
                        }   
                    }
                    //$(opts.moreElement).attr('data-page',ret.data.page_num);
                    opts.moreElement.css('visibility','hidden');
                    setTimeout(function(){
                        scrollflag = false;     
                    },200);
                },opts.time);
            },
            error : function(ret){
                if(typeof opts.error == 'function'){
                    opts.error(opts);
                }
                setTimeout(function(){
                    scrollflag = false;     
                },200);
                opts.moreElement.css('visibility','hidden');    
            } 
        }
        GSY.util.ajax(ajaxOptions);
    }
     
     

    //判断是否可以发起请求
    $.fn.scrollPagination.loadContent = function(element, opts){
        var target = opts.scrollTarget;
        var mayLoadContent = $(target).scrollTop() + $(target).height() > $(document).height() - opts.heightOffset;
        if (mayLoadContent) requestLoad(element, opts);
    };
      
    //初始化方法
    $.fn.scrollPagination.init = function(element, opts){
        var target = opts.scrollTarget;
        $(element).attr('scrollPagination', 'enabled');
        $(target).bind('scroll', function(event){
            if ($(element).attr('scrollPagination') == 'enabled'){
                $.fn.scrollPagination.loadContent(element, opts);   
            } else {
                event.stopPropagation();
            }
        });
    };

    $.fn.scrollPagination.init.first = false;;
        
    //默认值
    $.fn.scrollPagination.defaults = {
        'url' : null,
        'data' : {},
        'beforeLoad': null,
        'afterLoad': null   ,
        'scrollTarget': null,
        'heightOffset': 0,
        'time' : 0,
        'error' : null,
        'moreElement' : null,
        'time' : 500      
    };  

    /**
     * [pagination description] 滚动到底部获取分页数据
     * @param  {[object]}       options.element         [description] 被加载数据的父元素块
     * @param  {[string]}       options.url             [description] 后台交互连接地址
     * @param  {[object]}       options.data            [description] 交互所传参数
     * @param  {[object]}       options.moreElement     [description] load标显示元素框
     * @param  {[number]}       options.heightOffset    [description] 距离底部偏移量高度
     * @param  {[function]}     options.start           [description] 当向后台发起请求的时回调函数
     * @param  {[function]}     options.callback        [description] 成功回调函数
     * @param  {[function]}     options.error           [description] 失败请求回调函数
     */
    GSY.util.pagination = function(options){
        if(options == undefined || $(options.element).length == 0 || !options.url ) return;
        $(options.element).scrollPagination({
            'url' : options.url,
            'type' : options.type ? options.type : 'post',
            'data' : options.data ? options.data : {} , 
            'scrollTarget' : $(window),
            'moreElement' : options.moreElement,
            'heightOffset' : options.heightOffset ? options.heightOffset : 60,
            'beforeLoad' : typeof options.start == 'function' ? options.start : null,
            'afterLoad' : typeof options.callback == 'function' ? options.callback : null,
            'error' : typeof options.error == 'function' ? options.error : null
        }); 
    }
})();
;(function(){
    if($(".lz-loading").attr("data-post")){
        var page_type = $(".lz-loading").attr("data-post").split('=')[1];
    }
    var listTpl = function(){
        var html =  '<div class="lz-common-list">';
            html += '   <div class="lz-common-list-wrap lz-block-box" >';
            html += '       <div class="lz-block-icon"></div>';
            html += '       <div class="lz-block-box-warp">';
            html += '       <!--title-->';
            html += '       <div class="lz-common-list-top">';
            html += '            <div class="lz-common-list-top-share">';
            html += '                 <a href="">×ª·¢</a>';
            html += '                 <div class="lz-common-list-share-more">';
            html += '                      <span class="lz-common-list-more-bg"></span>';
            html += '                      <a class="lz-list-share-fac lz-share-moki-to" onclick="ga(\'send\', \'event\', \'{page_type}_list\', \'click\', \'{page_type}_share_facebook\');" href="http://www.facebook.com/sharer.php?app_id=1582426445349099&sdk=joey&u={url}&t={title}&display=popup&ref=plugin" target="_blank">Facebook</a>';
            html += '                      <a class="lz-list-share-goo lz-share-moki-to" onclick="ga(\'send\', \'event\', \'{page_type}_list\', \'click\', \'{page_type}_share_google\');" href="https://plus.google.com/share?url={url}" target="_blank">Google+</a>';
            html += '                      <a class="lz-list-share-twi lz-share-moki-to" onclick="ga(\'send\', \'event\', \'{page_type}_list\', \'click\', \'{page_type}_share_twitter\');" href="http://twitter.com/home?status={url} {title}" target="_blank" title="share to Twitter" rel="nofollow">Twitter</a>';
            html += '                 </div>';
            html += '             </div>';
            html += '             <div class="lz-common-list-top-t" onclick="ga(\'send\', \'event\', \'{page_type}_list\', \'click\', \'{title}\');"><a href="{url}" target="_blank">{title}</a></div>';
            html += '             <div class="clear"></div>';
            html += '        </div>';
            html += '        <!--title end-->';
            html += '        <!--show img-->';
            html += '        <div class="lz-common-list-cont" onclick="ga(\'send\', \'event\', \'{page_type}_list\', \'click\', \'{title}\');">';
            html += '           <a href="{url}" target="_blank">{content}</a>';
            html += '        </div>';
            html += '        <!--show img end-->';
            html += '        <!--num-->';
            html += '        <div class="lz-common-list-num">';
            html += '            <span class="lz-common-list-dest-num">{like_num}</span>';
            html += '            <em>'+langArr.good_reputation+'</em>';
            html += '            <em class="dat">．</em>';
            html += '            <span>{repay}</span>';
            html += '            <em class="lz-common-reply-btn">'+langArr.Comments+'</em>';
            html += '        </div>';
            html += '        <!--num end-->';
            html += '        <!--btn-->';
            html += '        <div class="lz-common-list-other">';
            html += '            <div class="lz-common-list-other-l">';
            html += '               <div class="lz-common-list-other-btn {likeClass}" onclick="ga(\'send\', \'event\', \'{page_type}_list\', \'click\', \'{page_type}_like\');"><span class="lz-icon-best" data-post="postid={id}&like=1">ÔÞ</span></div>';
            html += '                <div class="lz-common-list-other-btn {unlikeClass}" onclick="ga(\'send\', \'event\', \'{page_type}_list\', \'click\', \'{page_type}_unlike\');"><span class="lz-icon-unbest" data-post="postid={id}">²È</span></div>';
            html += '                <div class="lz-common-list-other-btn" onclick="ga(\'send\', \'event\', \'{page_type}_list\', \'click\', \'{page_type}_comment\');"><span class="lz-icon-comment" data-post="{url}?comments=1">ÆÀÂÛ</span></div>';
            html += '                <div class="lz-common-list-other-btn {collectClass}" onclick="ga(\'send\', \'event\', \'{page_type}_list\', \'click\', \'{page_type}_collect\');"><span class="lz-icon-save" data-post="userid={uid}&postid={id}">ÊÕ²Ø</span></div>';
            html += '            </div>';
            html += '            <div class="lz-common-list-other-r">';
            html += '                <a class="lz-icon-facebook lz-share-moki-to" onclick="ga(\'send\', \'event\', \'{page_type}_list\', \'click\', \'{page_type}_share_facebook\');" href="http://www.facebook.com/sharer.php?app_id=1524037924476565&sdk=joey&u={url}&t={title}&display=popup&ref=plugin" target="_blank">facebook</a>';
            html += '                <a class="lz-icon-twitter lz-share-moki-to" onclick="ga(\'send\', \'event\', \'{page_type}_list\', \'click\', \'{page_type}_share_twitter\');" href="http://twitter.com/home?status={url} {title}" target="_blank" title="share to Twitter" rel="nofollow">twitter</a>';
            html += '            </div>';
            html += '            <div class="clear"></div>';
            html += '        </div>';
            html += '        <!--btn end-->';
            html += '         </div>';
            html += '     </div>';
            html += ' </div>';
        return html;
    }
    GSY.util.pagination({
        element : $(".lz-common-box"),
        moreElement : $('.lz-common-more span'),
        url : web_url+'/api/?m=get_pc_blog_lists',
        type : 'post',
        heightOffset : 100,
        callback : function(ret){
            if(ret.data == null){
                $(".lz-pagination").show();
                $(".lz-common-more").hide();
                return;
            }
            if($(".lz-loading").attr('data-page')%5 == 0){
                $(".lz-loading").attr('data-page',"-1");  //页数加1
            }else{
                $(".lz-loading").attr('data-page',parseInt( $(".lz-loading").attr('data-page'))+1);
            }  
            var listHtml = listTpl();
            var listAll = ' ';
            var imgs = '<p><img src="{img}" errUrl="http://cdn.brotsoft.com/static/joke/1.3/images/defin_img.jpg" thumbUrl="{img}" onload="CXGLoadImg(this,625,\'\')" data-loaded="false" alt=""></p>';
            var length = ret.data.length;
            var cookieKey = GSY.config.get('lang') + '_ludou_jacking_score_'; // 赞
            var cookieKeyDel = GSY.config.get('lang') + '_ludou_trample_score_';
            for(var i=0; i<length; i++){
                 listHtml = listTpl();
                var data_val = ret.data[i];
                listHtml = listHtml.replace(/{url}/g,data_val.url);
                listHtml = listHtml.replace(/{title}/g,data_val.title);
                
                listHtml = listHtml.replace('{like_num}',data_val.funny_number);
                listHtml = listHtml.replace('{repay}',data_val.comments);
                listHtml = listHtml.replace(/{id}/g,data_val.id);
                listHtml = listHtml.replace(/{page_type}/g,page_type);

                var content = ' ';
                if(data_val.content.pics.length != 0){
                    for(var j=0; j<data_val.content.pics.length; j++){
                        content += imgs.replace(/{img}/g,data_val.content.pics[j].url);
                    }
                    
                }
                if(data_val.content.words){
                    content += data_val.content.words;
                }
                listHtml = listHtml.replace('{content}',content);
                data_val.userid?listHtml = listHtml.replace('{uid}',data_val.userid):listHtml = listHtml.replace('{uid}',data_val.userid);
                GSY.cookie.get(cookieKey + data_val.id)?listHtml = listHtml.replace('{likeClass}','active'):listHtml = listHtml.replace('{likeClass}','');
                GSY.cookie.get(cookieKeyDel + data_val.id)?listHtml = listHtml.replace('{unlikeClass}','active'):listHtml = listHtml.replace('{unlikeClass}','');
                (data_val.favoritesStatus == 1)?listHtml = listHtml.replace('{collectClass}','active'):listHtml = listHtml.replace('{collectClass}','');
               $(".lz-common-box").append(listHtml); 
               GSY.util.setScrollBottom();
            } 
            if($(".lz-loading").attr("data-page") < 0){
                $(".lz-pagination").show();
                $(".lz-common-more").hide();
                return;
            } 
        }
    });
})()
;(function(){
    $(".lz-common-list-top-share").live('mouseover', function() { 
        $(this).find(".lz-common-list-share-more").show();
    });
    $(".lz-common-list-top-share").live('mouseout', function() { 
        $(this).find(".lz-common-list-share-more").hide();
    });
    $(".lz-list-share-fac").live('mouseover', function() { 
        $(this).prev(".lz-common-list-more-bg").addClass("lz-common-list-more-bg-hover");
    });
    $(".lz-list-share-fac").live('mouseout', function() { 
        $(this).prev(".lz-common-list-more-bg").removeClass("lz-common-list-more-bg-hover");
    });
})()


