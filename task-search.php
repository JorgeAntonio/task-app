<?php

require_once 'database.php';

$search = $_POST['search'];

if (!empty($search)){
    $query = "SELECT * FROM task WHERE name LIKE '$search%'";
    $result = $connection->query($query);
    if (!$result){
        die('Query error'. mysqli_error($connection));
//        echo 'No result found';
    }

    $json = array();
    while ($row = $result->fetch()){
        $json[] = array(
            'name' => $row['name'],
            'description' => $row['description'],
            'id' => $row['id'],
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;

}