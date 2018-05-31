#pragma strict

var timeBetweenAttacks : float = 1.0f;     // The time in seconds between each attack.
var scoreValue : int = 10;
var attackclip : AudioClip;
var deadclip : AudioClip;

private var player : GameObject;
private var player_stat : PlayerStatus;
private var nav : NavMeshAgent;
private var anim : Animator;
private var enemyAudio : AudioSource;
private var capsuleCollider : CapsuleCollider;
private var playerInRange : boolean;
private var timer : float;
private var health = 100.0f;
private var damage = 5;
private var isPlayerDead = false;

function Awake ()
{
    // Set up the references.
    player = GameObject.FindGameObjectWithTag ("Player");
    player_stat = player.GetComponent (PlayerStatus);
    nav = GetComponent (NavMeshAgent);
    anim = GetComponent (Animator);
    enemyAudio = GetComponent (AudioSource);
    capsuleCollider = GetComponent (CapsuleCollider);
}

function attack ()
{
	timer = 0f;
	anim.SetTrigger("Attack");
	
	enemyAudio.clip = attackclip;
	enemyAudio.Play ();
	
	if(player_stat.health > 0)
	{
		player_stat.takeDamage(damage);
	}
}

function BulletDamage(TheDamage : int)
{
	health -= TheDamage;
	
    GetComponentInChildren(ParticleSystem).Stop();
	GetComponentInChildren(ParticleSystem).Play();
	
	if(health <= 0)
	{
		Dead();
	}
}

function Dead()
{
	nav.enabled = false;
	this.GetComponent(Rigidbody).isKinematic = true;
	capsuleCollider.isTrigger = true;
	if(player_stat.health > 0)
	{
		anim.SetTrigger("Dead");
		enemyAudio.clip = deadclip;
		enemyAudio.Play ();
		player_stat.score += scoreValue;
	}
	else
	{
		anim.SetTrigger("Dead");
		isPlayerDead = true;
	}
	Destroy (gameObject, 3f);
}

function move ()
{
	anim.SetTrigger("Walk");
	nav.SetDestination (player.transform.position);
}

function OnTriggerEnter (other : Collider)
{
    // If the entering collider is the player...
    if(other.gameObject == player)
    {
        // ... the player is in range.
        playerInRange = true;
    }
}


function OnTriggerExit (other : Collider)
{
    // If the exiting collider is the player...
    if(other.gameObject == player)
    {
        // ... the player is no longer in range.
        playerInRange = false;
    }
}


function Update ()
{
	timer += Time.deltaTime;
	
	if(health > 0 && player_stat.health > 0)
	{
		move();
	}
	else if(player_stat.health > 0)
	{
		nav.enabled = false;
	}
	else
	{
		if(!isPlayerDead)
		{
			Dead();
		}
	}
	
    if(timer >= timeBetweenAttacks && playerInRange && health > 0)
    {
		attack();
    }
}



