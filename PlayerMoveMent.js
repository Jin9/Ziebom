#pragma strict

var speed : float = 10.0f;
var turn : float = 60.0f;
var joystick : JoyStick;
var isJoyStick = false;

function Update() 
{
	var dir = Vector3.zero;
	
	if(isJoyStick)
	{
		// analog control
		dir.x = joystick.joy_input.x;
	}
	else
	{
		
		dir.x = Input.acceleration.x;
	}
	
	if (dir.sqrMagnitude > 1)
		dir.Normalize();
	
	// horizon axis
	var horizontal = dir.x * turn * Time.deltaTime;
	transform.Rotate(0, horizontal, 0);
	
	
	dir = Vector3.zero;
	if(isJoyStick)
	{
		dir.z = joystick.joy_input.y;
	}
	else
	{
		dir.z = (-1 * Input.acceleration.z) - 0.5;
	}
	
	if (dir.sqrMagnitude > 1)
		dir.Normalize();
	
	if(isJoyStick)
	{
		transform.Translate(0, 0, (dir.z) * speed * Time.deltaTime);	
	}
	else
	{
		transform.Translate(0, 0, (dir.z) * (2*speed) * Time.deltaTime);
	}
	
}

