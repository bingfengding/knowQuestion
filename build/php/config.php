<?php
header('Content-Type:text/html;charset=utf-8');
define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PWD','');
define('DB_NAME','zhiwen');
$con = @mysqli_connect(DB_HOST,DB_USER,DB_PWD) or die('数据库链接失败'.mysqli_error($con));
@mysqli_select_db($con,DB_NAME) or die('数据库错误:'.mysqli_error($con));
@mysqli_query($con,'SET NAMES UTF8') or die('字符串错误:'.mysqli_error($con));
?>

