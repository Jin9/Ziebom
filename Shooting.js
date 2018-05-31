#pragma strict

var theBullet : Rigidbody;
var Speed = 100;

function Shoot () {
	
	var clone = Instantiate(theBullet, transform.position, transform.rotation);
	clone.velocity = transform.TransformDirection(Vector3(0, 0, Speed));
	
	GetComponent(AudioSource).Play();
	GetComponent(ParticleSystem).Stop ();
    GetComponent(ParticleSystem).Play ();
	
	Destroy (clone.gameObject, 1);
}