<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}

require __DIR__.'/classes/Database.php';
require __DIR__.'/classes/JwtHandler.php';

$db_connection = new Database();
$conn = $db_connection->dbConnection();

$data = json_decode(file_get_contents("php://input"));
//print_r($data);exit;
$returnData = [];
$id = trim($data->data);
// IF REQUEST METHOD IS NOT EQUAL TO POST
$check_email = "SELECT * FROM `plan` WHERE `id`=$id";
$query_stmt = $conn->prepare($check_email);
$query_stmt->execute();
//echo $query_stmt->rowCount();exit;
// IF THE USER IS FOUNDED BY EMAIL
if($query_stmt->rowCount()):
	$row = $query_stmt->fetch(PDO::FETCH_ASSOC);
	//print_r($row);exit;
	$title = $row['name'];
	$type = $row['type'];
	$created_at = date('Y-m-d');
	$updated_at = date('Y-m-d');
	/* $jwt = new JwtHandler();
	$token = $jwt->_jwt_encode_data(
		'http://localhost/angular-8-jwt-authentication-example-master',
		array("id"=> '')
	); */
	//print_r($token);exit;
	$insert_query = "INSERT INTO `company`(`title`,`type`,`created_at`,`updated_at`) VALUES('$title','$type','$created_at','$updated_at')";

	$insert_stmt = $conn->prepare($insert_query);

	// DATA BINDING
	$insert_stmt->bindValue(':title', htmlspecialchars(strip_tags($title)),PDO::PARAM_STR);
	$insert_stmt->bindValue(':type', htmlspecialchars(strip_tags($type)),PDO::PARAM_STR);
	$insert_stmt->bindValue(':created_at', htmlspecialchars(strip_tags($created_at)),PDO::PARAM_STR);
	$insert_stmt->bindValue(':updated_at', htmlspecialchars(strip_tags($updated_at)),PDO::PARAM_STR);

   // $insert_stmt->bindValue(':token', $token,PDO::PARAM_STR);

	$insert_stmt->execute();

	//$returnData = msg(1,201,'You have successfully registered.',$token);
	$returnData = [
			'success' => 1,
			'status' => 201,
			'message' => 'You have successfully added company details.'
		];
	
	

endif;

echo json_encode($returnData);
