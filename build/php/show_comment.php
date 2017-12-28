<?php
    sleep(1);
    require 'config.php';

    $_sql = mysqli_query($con,"SELECT COUNT(*) AS count FROM comment WHERE titleid='{$_POST['titleid']}'");
    $_result = mysqli_fetch_array($_sql,MYSQLI_ASSOC);

    $_page=1;
    $_pagesize = 2;
    $_count = ceil($_result['count']/$_pagesize);


    if(!isset($_POST['page'])){
        $_page = 1;
    }else{
        $_page = $_POST['page'];
        if($_page>$_count){
            $_page=$_count;
        }
    }
    $_limit = ($_page - 1) * $_pagesize;

    $query = mysqli_query($con,"SELECT ({$_count}) AS count,titleid,`comment`,`user`,`date` FROM comment WHERE titleid={$_POST['titleid']} ORDER BY `date` DESC LIMIT {$_limit},{$_pagesize}")or die("SQL 错误！");
    $JSON='';
    while(!!$row=mysqli_fetch_array($query,MYSQLI_ASSOC)){
        foreach($row as $key => $value){
            $row[$key]=urlencode(str_replace("\n","",$value)).'';
        }

        $JSON .= urldecode(json_encode($row)).',';
    }
echo '['.substr($JSON,0,strlen($JSON)-1).']';

    mysqli_close($con);