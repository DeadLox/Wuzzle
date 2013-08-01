<?php
class Util {
	public static function dump($var){
		echo '<pre>';
		var_dump($var);
		echo '</pre>';
	}

	/**
	 * Retourne TRUE si la variable est vide
	 */
	public static function is_empty($var){
		if (!isset($var)) return true;
		if (is_null($var)) return true;
		if ($var == "") return true;
		return false;
	}

	/**
	 * Retourne TRUE si la variable n'est pas vide
	 */
	public static function not_empty($var){
		if (isset($var) && !is_null($var)) return true;
		else return false;
	}
}