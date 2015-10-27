function js_date_time(unixtime) {
	var datetime = new Date(parseInt(unixtime) * 1000);
	var y = datetime.getFullYear();
	var m = datetime.getMonth()+1;
	var d = datetime.getDate();
	return y+'-'+m+'-'+d;
}

if(typeof urlParams['oem'] !== 'undefined'){
	var rst_date_time = js_date_time(urlParams['tm']);
	var oemtime = urlParams['oem'] +'_'+ rst_date_time ;
	if(typeof urlParams['uid'] !== 'undefined'){
		_gaq.push(['_trackEvent', 'bind_SearchEveryDayActive', oemtime , urlParams['uid']]); 
	}else{
		_gaq.push(['_trackEvent', 'bind_SearchEveryDayActive', oemtime , 'uidIsEmpty']); 
	}	
}

if(typeof urlParams['op'] !== 'undefined' && urlParams['op'] == 'other'){
	_gaq.push(['_trackEvent', 'search', 'plug_other' , urlParams['q']]); 
}


var kwds = urlParams['q'];
var adventurefeeds = function(){
    var that = this,
        url = 'http://xml.adventurefeeds.com/search?feed=54321&auth=ytMjvU&url=http://search.navegaki.com/index.php&user_ip=65.66.66.66&format=json&query=';
    $.ajax({
        url:url+kwds,
        success:function(evt){
            var list = evt.result.listing,
                html = '<div id="adventurefeeds">';
            $.each(list,function(i,item){
                var a = '<p><a target="_blank" href="'+item.url+'" title="'+item.descr+'" data-bid="'+item.bid+'" data-site="'+item.site+'">'+item.title+'</a></p>'
                html += a;
            });
            html += '</div>'
            $('.content').after(html);

        }
    })
};
adventurefeeds();