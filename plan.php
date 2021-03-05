<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "php_auth_api";
 
 // Create connection
 $conn = mysqli_connect($servername, $username, $password, $dbname);
 
 // Check connection
 if ($conn->connect_error) {
	 die("Connection failed: " . $conn->connect_error);
 } 

$sql = "SELECT * FROM plan";
$result = mysqli_query($conn,$sql); 
$myArray = array();
if ($result->num_rows > 0) {
// output data of each row
 while($row = $result->fetch_assoc()) {
	 $myArray[] = $row;
 }
 //print_r($myArray);exit;
 echo json_encode($myArray);
} 
else 
{
 echo "0 results";
}
?>