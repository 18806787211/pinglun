
<?php
	header("Content-Type:text/html;charset=utf-8");//设置网页编码
	ini_set('date.timezone','Asia/shanghai');//设置时区
	if(!isset($_POST['a']))//防止直接访问，这样就需要经过前端来访问才有效
	{
		echo '无权访问';
		exit;//直接结束程序
	}
	
	
	$user=$_POST['a'];//接收前端用户名的值
	$password=$_POST['b'];//接收前端密码的值
	$time=date('Y-m-d H:i:s');//后端得到时间
	
	$connect=mysqli_connect('10.9.1.188','kdqlFOvAam1m5YZ4','z1iIU5oByAJBKKbQ','cf_776e48b4_9767_47b2_b221_6b15c4d646c1');//连接数据库服务器与数据库
	
	if (mysqli_connect_errno($connect))  //没连上的时候
	{  
		echo "连接 MySQL 失败: ".mysqli_connect_error();  
	} 
	mysqli_set_charset ($connect,'utf8');//设置数据库编码
	
	$fanhui=mysqli_query($connect,"insert into reg (user,password,time) values ('$user','$password','$time')");
	if($fanhui)
	{
		$json=array('user'=>$user,'password'=>$password,'time'=>$time);
		$respon=json_encode($json);//{"content":$content,"time":$time}
		echo $respon;//返回json类型数据
	}
	
	
	
?>

	

