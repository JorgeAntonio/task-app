<?php

require_once 'database.php';

$query = "SELECT * FROM task";
$result = $connection->query($query);

if (!$result){
    die('Query failed' . mysqli_error($connection));
}

$json = array();
while ($row = $result->fetch()){
    $json[] = array(
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['id']
    );
}

$jsonstring = json_encode($json);
echo $jsonstring;