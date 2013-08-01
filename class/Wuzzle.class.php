<?php
/**
 * Wuzzle
 * 
 * @Author: DeadLox
 * @Date: 01/08/2013
 */
class Wuzzle {
	/* --- Variables --- */
	private $longueur;
	private $nbVoyelle;
	private $nbConsonne;
	private $grille = array();
	
	/* --- STATIC --- */
	private static $lettres = array("A" => array("point" => 1),
							"B" => array("point" => 3),
							"C" => array("point" => 3),
							"D" => array("point" => 2),
							"E" => array("point" => 1),
							"F" => array("point" => 4),
							"G" => array("point" => 2),
							"H" => array("point" => 4),
							"I" => array("point" => 1),
							"J" => array("point" => 8),
							"K" => array("point" => 10),
							"L" => array("point" => 1),
							"M" => array("point" => 2),
							"N" => array("point" => 1),
							"O" => array("point" => 1),
							"P" => array("point" => 3),
							"Q" => array("point" => 8),
							"R" => array("point" => 1),
							"S" => array("point" => 1),
							"T" => array("point" => 1),
							"U" => array("point" => 1),
							"V" => array("point" => 4),
							"W" => array("point" => 10),
							"X" => array("point" => 10),
							"Y" => array("point" => 10),
							"Z" => array("point" => 10));
	private static $voyelles  = array("A", "E", "I","O", "U", "Y");
	private static $consonnes = array("B","C","D","F","G","H","J","K","L","M","N","P","Q","R","S","T","V","W","X","Z");

	public function __construct($longueur = 16, $nbVoyelle = 5){
		$this->longueur  = $longueur;
		$this->nbVoyelle = $nbVoyelle;
		$this->nbConsonne = $longueur - $this->nbVoyelle;
		$this->genererGrille();
	}

	private function genererGrille(){
		$this->grille = array();
		// Génère les Consonnes
		for ($c = 0; $c < $this->nbConsonne; $c++) {
			$index = rand(0, sizeof(Wuzzle::$consonnes)-1);
			$this->grille[] = Wuzzle::$consonnes[$index];
		}
		// Génère les Voyelles
		for ($v = 0; $v < $this->nbVoyelle; $v++) {
			$index = rand(0, sizeof(Wuzzle::$voyelles)-1);
			$this->grille[] = Wuzzle::$voyelles[$index];
		}
		// Mélange la grille
		shuffle($this->grille);
	}

	/* --- GETTERS --- */
	public function getGrille(){
		return $this->grille;
	}
	public function getJSONGrille(){
		return json_encode($this->grille);
	}
}