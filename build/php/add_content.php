<?php
    sleep(1);
    require "config.php";
    $title = $_POST['title'];
    $user = $_POST['user'];
    $content = $_POST['editorValue'];
    $query = "insert into question(title,content,`user`,`date`) VALUES ('$title','$content','$user',now())";
    mysqli_query($con,$query) or die('新增失败!'.mysqli_error($con));
    echo mysqli_affected_rows($con);
    mysqli_close($con);
