<?php
    include "../connect/connect.php";

    $commentPass = $_POST['pass'];
    $commentID = $_POST['commentID'];


    $sql = "SELECT commentPass FROM myComment WHERE myCommentID = {$commentID}";
    $result = $connect -> query($sql);
    $memberInfo = $result -> fetch_array(MYSQLI_ASSOC);


    if($memberInfo['commentPass'] == $commentPass){
        $sql = "DELETE FROM myComment WHERE myCommentID = {$commentID} AND commentPass = {$commentPass}";
        $result = $connect -> query($sql);
        echo json_encode(array("info" => $commentID));
    } else {
        $passWorng = "bad";
        echo json_encode(array("info" => $passWorng));
    }
    


?>