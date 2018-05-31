#pragma strict

import UnityEngine.UI;

var text : Text;
var slide : Slider;
var health : int;
var score : int;

function takeDamage(damage : int){
	health -= damage;
}

function Update () {
	text.text = "SCORE : " + score;
	slide.value = health;
}