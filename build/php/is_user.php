<?php
require 'config.php';
$query = mysqli_query($con,"SELECT user FROM user WHERE user='{$_POST['user']}'") or die('SQL 错误！');
if(mysqli_fetch_array($query,MYSQLI_ASSOC)){
    echo 'false';
}else{
    echo 'true';
}
mysqli_free_result($query);
mysqli_close($con);
