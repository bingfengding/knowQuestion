<?php
    sleep(1);
    require 'config.php';
    $query = "INSERT INTO `comment`(titleid,`comment`,`user`,`date`) VALUES('{$_POST['titleid']}','{$_POST['comment']}','{$_POST['user']}',now())";
    mysqli_query($con,$query) or die('新增失败'.mysqli_error($con));
    echo mysqli_affected_rows($con);
    mysqli_close($con);