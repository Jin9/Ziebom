#pragma strict

var target : GameObject;
var damping : float = 1.0f;

private var offset : Vector3;

function Start() {
	Screen.orientation = ScreenOrientation.LandscapeRight;
	offset = target.transform.position - transform.position;
}

function LateUpdate() {
	var currentAngle = transform.eulerAngles.y;
	var desiredAngle = target.transform.eulerAngles.y;
	var angle = Mathf.LerpAngle (currentAngle, desiredAngle, Time.deltaTime * damping);
	
	var rotation = Quaternion.Euler (0, angle, 0);
	transform.position = target.transform.position - (rotation * offset);
	
	transform.LookAt (target.transform);
}

