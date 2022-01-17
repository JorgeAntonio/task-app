<?php

require_once 'database.php';

$id = $_POST['id'];

$query = "SELECT * FROM task WHERE id = $id";
$result = $connection->query($query);

if (!$result){
    die("Query failed");
}

$json = array();
while ($row = $result->fetch()){
    $json[] = array(
        'id' => $row['id'],
        'name' => $row['name'],
        'description' => $row['description']
    );
}

$jsonstring = json_encode($json[0]);
echo $jsonstring;