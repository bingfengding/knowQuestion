<?php
    require 'config.php';

    $query = mysqli_query($con,"SELECT title,content,`user`,`date` FROM question ORDER BY `date` DESC LIMIT 0,10")or die("SQL 错误！");
    $JSON='';
    while(!!$row=mysqli_fetch_array($query,MYSQLI_ASSOC)){
        foreach($row as $key => $value){
            $row[$key]=urlencode(str_replace("\n","",$value)).'';
        }

        $JSON .= urldecode(json_encode($row)).',';
    }
        echo '['.substr($JSON,0,strlen($JSON)-1).']';

    mysqli_close($con);