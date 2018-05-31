#pragma strict

var player : GameObject;
var spawn_player : GameObject;

function OnTriggerEnter (other : Collider)
{
	if( other.gameObject == player ){
		player.transform.position = spawn_player.transform.position;
		player.transform.rotation = spawn_player.transform.rotation;
	}
}