<?php
    require 'config.php';
    $_pass = sha1($_POST['login_pass']);
    $_user = $_POST['login_user'];
    $query = mysqli_query($con,"select `user`,pass FROM user WHERE pass ='{$_pass}'") or die('SQL 错误！');
    if(mysqli_fetch_array($query,MYSQLI_ASSOC)){
        echo 'true';
    } else{
        echo 'false';
    }
    mysqli_close($con);
	