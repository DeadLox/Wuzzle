<?php
include_once 'include/autoload.php';
?>
<!doctype html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<title>Wuzzle</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="stylesheet" href="css/design.css" />
	<link rel="stylesheet" href="css/bootstrap.min.css" />
	<script src="http://code.jquery.com/jquery.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="dico.js"></script>
	<script src="js/Wuzzle.js"></script>
</head>
<body>
	<div class="game-container">
		<div class="game-note"></div>
		<div class="game-time">00:00</div>
		<div class="game-point">0</div>
		<div class="game-result"></div>
		<ul class="grille"></ul>
		<div class="row" style="text-align: center;">
			<input class="btn btn-large" type="button" value="Nouvelle partie" onclick="startNewGame()"/>
		</div>
	</div>
</body>
</html>