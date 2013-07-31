var onSelect = false;
var lastCase = 0;
var longueur = 4;
var dico = new Array("UE", "BI");

$(document).ready(function(){
	/* ---- Création de la Database ---- */
	Wuzzle.indexedDB.open();

	$('.game-container .grille li').mousedown(function(){
		onSelect = true;
		$('.game-result').text('');
		addLetter($(this));
		var numCase = getnumCase($(this));
		lastCase = numCase;
	});
	$(document).mouseup(function(){
		checkWord();
		resetHover();
	});
	$('.game-container .grille li').mouseenter(function(){
		var numCase = getnumCase($(this));
		near = isNear(lastCase, numCase);
		//console.debug(near+" "+lastCase+" "+numCase);
		if (onSelect && !$(this).hasClass('selected') && near) {
			lastCase = numCase;
			addLetter($(this));
		} else {
			resetHover();
		}
	});
})

function checkWord(){
	var word = $('.game-result').text();
	if (word.length > 1) {
		if ($.inArray(word, dico) >= 0) {
			console.log(word+' ok');
		} else {
			console.log(word+' ko');
		}
	}
}

function getnumCase(caseLettre){
	var id = caseLettre.attr('id');
	return parseInt(id.replace("case_", ""));
}

function addLetter(caseLettre){
	caseLettre.addClass('selected');
	$('.game-result').append(caseLettre.text());
}

function resetHover(){
	lastCase = 0;
	onSelect = false;
	$('.game-container .grille li').removeClass('selected');
}

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