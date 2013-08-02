var onSelect = false;
var lastCase = 0;
var longueur = 4;

var totalPoint = 0;

var okArray = new Array();
var koArray = new Array();
var nbTentative = 0;

var letters = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
var pointsLetter = new Array(1,3,3,2,1,4,2,4,1,8,10,1,2,1,1,3,8,1,1,1,1,4,10,10,10,10);

var cpt = 120;

var timer;

var firstCaseSelected;

$(document).ready(function(){
	$(document).on('mousedown', '.game-container .grille li', function(){
		onSelect = true;
		$('.game-result').text('');
		var numCase = getnumCase($(this));
		addLetter($(this), numCase);
		lastCase = numCase;
		firstCaseSelected = $(this);
	});
	$(document).bind('mouseup', 'document', function(){
		if (onSelect) {
			checkWord();
		}
		resetHover();
		nbTentative++;
	});
	$(document).on('mouseenter', '.game-container .grille li', function(){
		var numCase = getnumCase($(this));
		near = isNear(lastCase, numCase);
		if (onSelect && !$(this).hasClass('selected') && near) {
			lastCase = numCase;
			addLetter($(this), numCase);
		} else {
			resetHover();
		}
	});
});

/**
 * Remet les variables du jeu à zéro
 * 
 * @return {[type]} [description]
 */
function resetGame(){
	cpt = 120;
	totalPoint = 0;
	okArray = new Array();
	koArray = new Array();
}

/**
 * Reset les paramètres du jeu, charge une nouvelle grille et démarre le chrono
 * 
 * @return {[type]} [description]
 */
function startNewGame(){
	resetGame();
	$.ajax({
		type: 'POST',
		url: 'ws.php',
		data: 'action=newGame',
		success: function(msg){
			grille = $.parseJSON(msg);
			generateGrille(grille);
			clearInterval(timer);
			timer = setInterval("refreshTime()", 1000);
		}
	});
}

/**
 * Affiche un message en fonction du nombre de point du mot réalisé
 * 
 * @param  {[type]} point [description]
 * @return {[type]}       [description]
 */
function showNote(point){
	var note = 'Très bien';
	var noteDiv = $('.game-note');
	noteDiv.text(note);
	noteDiv.stop(true, true).fadeIn('fast').animate({'font-size':'40px'}, 600).delay(200).fadeOut('slow').css({'font-size':'20px'});
	firstCaseSelected.append('<div class="game-note-point">+'+point+'</div>').children('.game-note-point').stop(true, true).fadeIn('fast').animate({'font-size':'40px'}, 600).delay(200).fadeOut('slow').css({'font-size':'20px'});
}

/**
 * Affiche le temps écoulé
 * 
 * @return {[type]} [description]
 */
function refreshTime(){
	cpt--;
	if (cpt == 0) clearInterval(timer);
	$('.game-time').text(convertToTime(cpt));
}

/**
 * Convertit le nombre de seconde écoulé en temps MM:SS
 * 
 * @param  {[type]} sec [description]
 * @return {[type]}     [description]
 */
function convertToTime(sec){
	var min = Math.floor(sec/60);
	var sec = sec - (min*60);
	if (min < 10) min = "0" + min;
	if (sec < 10) sec = "0" + sec;
	return min+':'+sec;
}

/**
 * Actualise l'affichage du score
 * 
 * @return {[type]} [description]
 */
function refreshScrore(){
	$('.game-point').text(totalPoint);
}

/**
 * Génère la grille passée en paramètre
 * 
 * @param  {[type]} grille [description]
 * @return {[type]}        [description]
 */
function generateGrille(grille){
	$('.grille').html('');
	for (var l in grille) {
		var lettre = grille[l];
		var point = getPointLettre(lettre);
		$('.grille').append('<li id="case_'+l+'">'+grille[l]+'<span class="point">'+point+'</span></li>');
	}
}

/**
 * Calcul le nombre point d'une lettre
 * 
 * @param  {[type]} lettre [description]
 * @return {[type]}        [description]
 */
function getPointLettre(lettre){
	var indexLetter = $.inArray(lettre, letters);
	return pointsLetter[indexLetter];
}

/**
 * Calcul le nombre de point d'un mot
 * 
 * @param  {[type]} word [description]
 * @return {[type]}      [description]
 */
function countWord(word){
	var tabWord = word.split("");
	var totalPoint = 0;
	for (var x in tabWord) {
		var letter = tabWord[x];
		var pointLetter = getPointLettre(letter);
		totalPoint += pointLetter;
	}
	showNote(totalPoint);
	console.log("Point du mot: "+totalPoint);
	return totalPoint;
}

/**
 * Vérifie l'éxistance du mot dans le dictionnaire
 * 
 * @return {[type]} [description]
 */
function checkWord(){
	var word = $('.game-result').text();
	if (word.length > 1) {
		var firstLetterWord = word.charAt(0);
		if ($.inArray(word, eval("dico"+firstLetterWord)) >= 0 && $.inArray(word, okArray) == -1) {
			console.log(word+' ok');
			totalPoint += countWord(word);
			refreshScrore();
			okArray.push(word);
		} else {
			console.log(word+' ko');
			koArray.push(word);
		}
	}
}

/**
 * Retourne le numéro de la case
 * 
 * @param  {[type]} caseLettre [description]
 * @return {[type]}            [description]
 */
function getnumCase(caseLettre){
	var id = caseLettre.attr('id');
	var num = parseInt(id.replace("case_", ""));
	return num;
}

/**
 * Ajoute la lettre à l'affichage du mot
 * 
 * @param {[type]} caseLettre [description]
 * @param {[type]} numCase    [description]
 */
function addLetter(caseLettre, numCase){
	caseLettre.addClass('selected');
	var letter = grille[numCase];
	$('.game-result').append(letter);
}

/**
 * Réinitialise toutes les cases
 * 
 * @return {[type]} [description]
 */
function resetHover(){
	lastCase = 0;
	firstCaseSelected = null;
	onSelect = false;
	$('.game-container .grille li').removeClass('selected');
}

/**
 * Contrôle si la case survolée et bien à côté de la précédente
 * 
 * @param  {[type]}  lastCase    [description]
 * @param  {[type]}  currentCase [description]
 * @return {Boolean}             [description]
 */
function isNear(lastCase, currentCase){
	if (lastCase != 0) {
		// Case en haut à gauche, milieu, droite
		if (lastCase - (longueur+1) == currentCase || lastCase - (longueur) == currentCase || lastCase - (longueur-1) == currentCase) {
			return true;
		}
		// Case à gauche et à droite
		else if (lastCase-1 == currentCase || lastCase+1 == currentCase) {
			return true;
		// Case en bas à gauche, milieu, droite
		} else if (lastCase + (longueur+1) == currentCase || lastCase + (longueur) == currentCase || lastCase + (longueur-1) == currentCase) {
			return true;
		}
	} else {
		return true;
	}
	return false;
}