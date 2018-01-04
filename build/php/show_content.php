<?php
    require 'config.php';
    $query = mysqli_query($con,"SELECT (SELECT COUNT(*) FROM comment WHERE titleid=a.id) AS count,a.id,a.title,a.content,a.user,a.date FROM question a ORDER BY a.date DESC LIMIT 0,15")or die("SQL 错误！");
    echo
    $JSON='';
    while(!!$row=mysqli_fetch_array($query,MYSQLI_ASSOC)){
        foreach($row as $key => $value){
            $row[$key]=urlencode(str_replace("\n","",$value)).'';
        }

        $JSON .= urldecode(json_encode($row)).',';
    }
        echo '['.substr($JSON,0,strlen($JSON)-1).']';

    mysqli_close($con);