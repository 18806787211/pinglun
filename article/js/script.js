//搜索
$(".text").focus(function(){
	if($.trim($(".text").val())==="请输入搜索内容")
	{
		$(".text").val("");
	}
});
$(".text").blur(function(){
	if($.trim($(".text").val())==="")
	{
		$(".text").val("请输入搜索内容");
	}
});
//登录btn
$(".login,.loginInterface-text a").click(function(){
	$(".loginInterface").slideToggle(200);
});

$(".login-left-btn input").click(function(){

	var userval=$(".loginInterface-left-user input").val();
	var passval=$(".loginInterface-left-password input").val();
		if(userval=="" ||passval=="")
		{
			alert("请勿输入空值！");
			return;
		}
		$.ajax({
			type:"get",
			url:"../reglist.php",
			dataType:"json",
			success:function(arr){
				
				var b=false;	
				for(var i=0;i<arr.length;i++)
				{
					
					var json=$.parseJSON(arr[i]);
				
					var username=json.user;
					var pass=json.password;
					//console.log(username,pass);
					if(username==userval && pass==passval)
					{
						//alert("登入成功");
						b=true;
						break;
					}
					/*if(username!=userval || pass!=passval)
					{
						alert("账号密码不对！");
						return;
					}*/
			
					
				}
				if(b)
				{
					alert("欢迎："+userval);
				}
				else
				{
					alert("用户或密码有误！");
				}
			
			}
		});
		
});





//注册
$(".register,.loginInterface-body-right a").click(function(){
	$(".reg").slideDown(200);
	$(".loginInterface").hide();
});
$(".reg_btn input").eq(-1).click(function(){
	$(".reg").slideUp(200);
});
//提交
$(".reg_btn input").eq(0).click(function(){
	var user=$.trim($(".reg_name input").val());
	var pass=$(".reg_password input").val();
	if($.trim($(".reg_name input").val())=="" ||$.trim($(".reg_password input").val())=="" )
	{
		alert("请勿输入空值！");
		return;
	}

	$.ajax({
		type:"get",
		url:"../reglist.php",
		dataType:"json",
		success:function(arr){	
			
			for(var i=0;i<arr.length;i++)
			{
				var json=$.parseJSON(arr[i]);
				var username=json.user;
				//console.log(username);
				if(user==username)
				{
					alert("用户名已经被注册，请重新输入其他用户名！");
					return;//跳出函数
					
				}
		
				
			}
			
			
			$.ajax({
				type:"post",
				url:"../reg.php",
			    dataType:"json",
				data:{a:user,b:pass},
				success:function(json){
					
					alert("注册成功！");
					$(".reg_name input").val('');
					$(".reg_password input").val('');
				}
				
			});
			
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
	    console.log(XMLHttpRequest,textStatus,errorThrown);
			alert("服务器忙，请稍后再试！");
		}
		
	});



});








//评论
$.ajax({
	type:"get",
	url:"../phplist.php",
	dataType:"json",
	success:function(arr){
		
		var frag=document.createDocumentFragment();
		for(var i=0;i<arr.length;i++)
		{
			var jsonObj=$.parseJSON(arr[i]);
			$(frag).prepend("<li><div class=\"text-title\"><span>匿名网友</span><i>"+jsonObj.time+"</i><em>发表</em></div><div class=\"text-content\"><p>"+jsonObj.content+"</p></div></li>");
		}
		$('.publish').append($(frag));
	},
	error:function(XMLHttpRequest,textStatus,errorThrown){
			alert("服务器忙，请稍后再试！");
		}
});




$('.Submit').click(function(){
	
	var val=$.trim($(".textframe").val());
	if(val)
	$.ajax({
		type:"post",
		url:"../php.php",
		data:{a:val},
		dataType:"json",
		success:function(json){
			$(".publish").prepend("<li><div class=\"text-title\"><span>匿名网友</span><i>"+json.time+"</i><em>发表</em></div><div class=\"text-content\"><p>"+json.content+"</p></div></li>");
			$(".textframe").val("");
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			alert("服务器忙，请稍后再试！");
		}
	});
});





