#pragma strict

import UnityEngine.UI;

var player : GameObject;
var spawnPlayer : GameObject;
var enemyManager : GameObject;

var start_panel : GameObject;
var option_panel : GameObject;
var play_panel : GameObject;
var over_panel : GameObject;
var joyStick : GameObject;
var highscore_start : Text;
var yourscore : Text;
var highscore_over : Text;

var joyStickChoice : GameObject;
var playButton : GameObject;

private var highScore : int;
private var player_movement : PlayerMoveMent;
private var player_stat : PlayerStatus;
private var enemy_spawn : EnemySpawn;
private var isSink : boolean = false;

function Start()
{
	
	start_panel.SetActive(true);
	play_panel.SetActive(false);
	over_panel.SetActive(false);

	player_movement = player.GetComponent (PlayerMoveMent);
	player_stat = player.GetComponent (PlayerStatus);
	enemy_spawn = enemyManager.GetComponent (EnemySpawn);
	
	player_movement.isJoyStick = false;
	
	player_movement.enabled = false;
	enemy_spawn.can_spawn = false;
	
	if(PlayerPrefs.HasKey("highscore")){
		highScore = PlayerPrefs.GetInt("highscore");
		highscore_start.text = "HIGH SCORE\n" + highScore;
	}
	else{
		highScore = 0;
		highscore_start.text = "HIGH SCORE\n" + highScore;
	}
	
}

function home()
{
	
	start_panel.SetActive(true);
	over_panel.SetActive(false);
	
	highscore_start.text = "HIGH SCORE\n" + highScore;
	
}

function replay()
{
	isSink = false;
	
	play_panel.SetActive(true);
	over_panel.SetActive(false);
	
	player_movement.enabled = true;
	enemy_spawn.can_spawn = true;
	
	player_stat.score = 0;
	player_stat.health = 100;
	
	if(player_movement.isJoyStick)
		joyStick.SetActive(true);
	else
		joyStick.SetActive(false);
	
}

function play()
{

	isSink = false;
	
	start_panel.SetActive(false);
	play_panel.SetActive(true);
	
	player_movement.enabled = true;
	enemy_spawn.can_spawn = true;
	
	player_stat.score = 0;
	player_stat.health = 100;
	
	if(player_movement.isJoyStick)
		joyStick.SetActive(true);
	else
		joyStick.SetActive(false);	
	
}

function over()
{
	isSink = true;
	
	play_panel.SetActive(false);
	over_panel.SetActive(true);
	
	player_movement.enabled = false;
	enemy_spawn.can_spawn = false;
		
	yourscore.text = "YOUR SCORE : " + player_stat.score;
	if(highScore < player_stat.score)
	{
		highScore = player_stat.score;
		PlayerPrefs.SetInt("highscore", highScore);
		PlayerPrefs.Save();
	}
	highscore_over.text = "HIGH SCORE : " + highScore;
	
	player.transform.position = spawnPlayer.transform.position;
	player.transform.rotation = spawnPlayer.transform.rotation;


	
}

function option()
{
	playButton.SetActive(false);
	option_panel.SetActive(true);
}

function joyChoice()
{
	if(player_movement.isJoyStick == true)
	{
		joyStickChoice.GetComponent(Image).color = Color.red;
		player_movement.isJoyStick = false;
	}
	else
	{
		joyStickChoice.GetComponent(Image).color = Color.green;
		player_movement.isJoyStick = true;
	}
}

function closeSetting()
{
	option_panel.SetActive(false);
	playButton.SetActive(true);
}

function Update()
{
	if(player_stat.health <= 0)
	{
		if(!isSink)
		{
			over();
		}
	}
}



