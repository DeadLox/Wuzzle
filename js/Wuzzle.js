var onSelect = false;
var lastCase = 0;
var longueur = 4;

var totalPoint = 0;

var okArray = new Array();
var koArray = new Array();

var letters = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
var pointsLetter = new Array(1,3,3,2,1,4,2,4,1,8,10,1,2,1,1,3,8,1,1,1,1,4,10,10,10,10);

var grille = new Array("E","U","A","P","T","R","E","S","A","N","E","R","R","Q","D","S");

var cpt = 0;

$(document).ready(function(){
	/* ---- Création de la Database ---- */
	//Wuzzle.indexedDB.open();
	generateGrille(grille);

	setInterval("refreshTime", 1000);

	$('.game-container .grille li').mousedown(function(){
		onSelect = true;
		$('.game-result').text('');
		var numCase = getnumCase($(this));
		addLetter($(this), numCase);
		lastCase = numCase;
	});
	$(document).mouseup(function(){
		if (onSelect) {
			checkWord();
		}
		resetHover();
	});
	$('.game-container .grille li').mouseenter(function(){
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

function refreshTime(){

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
		if ($.inArray(word, eval("dico"+firstLetterWord)) >= 0) {
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