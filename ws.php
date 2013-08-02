<?php
include_once 'include/autoload.php';

if (isset($_POST) && !empty($_POST)) {
	extract($_POST);
	$wuzzle = new Wuzzle();
	switch ($action) {
		case 'newGame':
			echo $wuzzle->getJSONGrille();
			break;
	}
}
?>