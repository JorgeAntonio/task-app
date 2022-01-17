<?php

require_once 'database.php';

if (isset($_POST['name'])){
    $name = $_POST['name'];
    $description = $_POST['description'];
    $query = "INSERT INTO task(name, description) VALUES ('$name', '$description')";
    $result = $connection->query($query);
    if (!$result){
        die('Query failed');
    }
    echo 'Task saved successfully';
}