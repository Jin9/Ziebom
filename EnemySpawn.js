#pragma strict

var player : GameObject;				// player
var enemy : GameObject;                // The enemy prefab to be spawned.
var spawnTime : float = 3f;            // How long between each spawn.
var spawnPoints : Transform[];         // An array of the spawn points this enemy can spawn from.
var can_spawn : boolean = false;


function Start ()
{
    // Call the Spawn function after a delay of the spawnTime and then continue to call after the same amount of time.
    InvokeRepeating ("Spawn", spawnTime, spawnTime);

}


function Spawn ()
{
	if(player.GetComponent(PlayerStatus).health > 0 && can_spawn)
	{
	
		// Find a random index between zero and one less than the number of spawn points.
		var spawnPointIndex : int = Random.Range (0, spawnPoints.Length);

		// Create an instance of the enemy prefab at the randomly selected spawn point's position and rotation.
		Instantiate (enemy, spawnPoints[spawnPointIndex].position, spawnPoints[spawnPointIndex].rotation);
	}
}