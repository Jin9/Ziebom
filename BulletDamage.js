#pragma strict

var Damage = 100;

function OnCollisionEnter (info : Collision)
{
	info.transform.SendMessage("BulletDamage", Damage, SendMessageOptions.DontRequireReceiver);
}