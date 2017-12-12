<?php
    sleep(3);
    require "config.php";
    $query = "insert into question(title,content,user,date) VALUES ('{$_POST['title']}','{$_POST['user']}',NOW())";
    masqli_query($query) or die('新增失败!'.mysqli_error());
    echo mysqli_affected_rows();
    mysqli_close();
