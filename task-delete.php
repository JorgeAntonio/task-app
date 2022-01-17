<?php

require_once 'database.php';

if (isset($_POST['id'])){

    $id = $_POST['id'];
    $query = "DELETE FROM task WHERE id = $id";
    $result = $connection->query($query);

    if (!$result){
        die('Query failed');
    }
    echo "Task deleted successfully";
}
