<?php
//includes
require_once 'mods/sag-master/vendor/autoload.php';
require_once ('mods/sag-master/src/Sag.php');






//DB connection
$server="reebok_pyl_online";
$Username="bryan";
$Password="bryan";
$Url="ec2-54-164-39-45.compute-1.amazonaws.com";
$sag=new Sag($Url);
$sag->login($Username, $Password);
$sag->setDatabase($server);







?>