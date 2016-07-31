
<?php
	header("Content-Type:text/html;charset=utf-8");//设置网页编码
	ini_set('date.timezone','Asia/shanghai');//设置时区

	$connect=mysqli_connect('10.9.1.188','kdqlFOvAam1m5YZ4','z1iIU5oByAJBKKbQ','cf_776e48b4_9767_47b2_b221_6b15c4d646c1');//连接数据库服务器与数据库
	
	
if (mysqli_connect_errno($connect))  //没连上的时候
	{  
		echo "连接 MySQL 失败: ".mysqli_connect_error();  
	} 
	mysqli_set_charset ($connect,'utf8');//设置数据库编码
	
	$sql=mysqli_query($connect,"select * from reg");
	
	
	
	
	$arr=array();
	while($row=mysqli_fetch_array($sql))
	{
		array_push($arr,json_encode($row));
	}
	echo json_encode($arr);//返回json类型的数据
	
?>