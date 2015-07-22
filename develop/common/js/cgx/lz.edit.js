
/**
 * [description] tags功能
 * @return {[type]} [description]
 */
;(function(){
	var parent = $('#lz-js-edit-tags');
	var textarea = parent.find('.lz-edit-tags-textarea');
	var span = parent.find('.lz-edit-tags-input');
	var list = parent.find('.lz-edit-tags-f');
	var hidde = $('#lz-tags-content');
	var tagsVal = []; 
	var joinStr = "@";

	//创建标签
	var createTag = function(val){
		var html = '<a data-post="id=0" href=""><em>'+ val +'</em><span class="lz-i"></span></a>';
		tagsVal.push(val);
		return $(html);
	}

	//检查数据是否重复
	var checkData = function(key){
		var status = false;
		var len = tagsVal.length;
		for(var i =0 ; i < len ; i++){
			if(tagsVal[i] == key) {
				status = true;
				break;
			}
		}
		return status;
	}

	//删除数组默认值
	var removeArray = function(str){
		var newArray = [] , len = tagsVal.length;
		for(var i = 0 ; i < len ; i++){
			if(str != tagsVal[i]) newArray.push(tagsVal[i]);
		}
		tagsVal = newArray;
	}

	//创建数据
	var createData = function(){
		var save = '';
		var i = 0;
		textarea.find('a').each(function(){
			var data = GSY.util.getEleData($(this).closest('a'),'data-post');
			var val = $(this).find('em').html();
			var str = data.id + joinStr + val;
			if(i == 0) save = str;
			else save += ',' + str;
			i++;
		});
		hidde.val(save);
	}

	if(parent.length == 0 ) return;
	createData();//初始化tags数据

	//存储推荐tags数据
	list.find('a').each(function(){
		tagsVal.push($(this).find('em').html());
	});

	//绑定选择文本域框
	textarea.click(function(e){
		$(this).find('input').focus();
		e.preventDefault();
	});

	//删除tags事件
	textarea.find('.lz-i').live('click',function(e){
		var data = GSY.util.getEleData($(this).closest('a'),'data-post');
		if(data.id == 0){
			var val = $(this).siblings().html();
			removeArray(val);
			$(this).closest('a').remove();
		}else{
			$(this).unbind('');
			list.append($(this).closest('a'));	
		}
		createData();
		return false;
	});

	//添加tags事件
	list.find('a').live('click',function(){
		span.before($(this).unbind(''));
		createData();
		return false;
	});

	//回车生成标签
	span.find('input').keyup(function(e){
		var val = $.trim($(this).val());
		if(e.keyCode == 13 && val != '' && !checkData(val)){
			var str = createTag(val);
			span.before(str);
			createData();
			$(this).val('');
		}
	});
	span.find('input').blur(function(e){
		var val = $.trim($(this).val());
		if( val != '' && !checkData(val)){
			var str = createTag(val);
			span.before(str);
			createData();
			$(this).val('');
		}
	});
})();


/**
 * [description] 提交保存文章
 * @return {[type]} [description]
 */
(function(){
	var form = $('#lz-js-create-content');
	if(form.length == 0) return;

	var title = form.find('input[name=title]');
	var desc = form.find('textarea[name=content]');
	var img = form.find('.sr-js-upload-input');
	var tags = form.find('#lz-tags-content');
	var submit = form.find('a.lz-btn-orange-nobg');
	var tagsBox = form.find('.lz-edit-tags-textarea');
	$('#lz-upload-content').val('');

	form.find('.sr-js-upload-box').change(function(){
		form.find('.sr-js-upload-input').val($(this).val());
	});

	//绑定提交事件
	submit.on('click',function(){
		
		//标题不能为空
		if($.trim(title.val()) == ''){
			GSY.util.maxCharTips(title);
			title.focus();
			return false;	
		}

		//标题字符数不能超过100
		if($.trim(title.val()).length > 100){
			GSY.util.maxCharTips(title);
			title.focus();
			alert(LANG[GSY.config.get('lang')]['enter_char_too_much']);
			return false;
		}

		//描述不能为空
		if($.trim(desc.val()) == ''){
			desc.focus();
			GSY.util.maxCharTips(desc);
			return false;	
		}

		//描述字符数不能超过100
		if($.trim(desc.val()).length > 500){
			GSY.util.maxCharTips(desc);
			desc.focus();
			alert(LANG[GSY.config.get('lang')]['enter_char_too_much']);
			return false;
		}

		//标签不能为空
		if($.trim(tags.val()) == ''){
			tagsBox.click();
			GSY.util.maxCharTips(tagsBox);
			return false;	
		}
		
		//提交数据
		form.find('form').submit();
		
	});
})();