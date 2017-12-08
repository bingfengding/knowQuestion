<?php
sleep(3);
    require 'config.php';
    $user=$_POST['user'];
    $pwd=$_POST['pass'];
    $email=$_POST['email'];
    //$sex=$_POST['sex']?$_POST['sex']:null;
    $sex=null;
    $birthday=$_POST['date'];
    $query="insert into user(`user`,pass,email,sex,birthday,`date`) VALUES ('$user',sha1('$pwd'),'$email','$sex','$birthday',now())";
    mysqli_query($con,$query) or die('新增失败:'.mysqli_error($con));
    echo mysqli_affected_rows($con);
    mysqli_close($con);
?>