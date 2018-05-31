#pragma strict

import UnityEngine.UI;
import UnityEngine.EventSystems;
import UnityEngine.Touch;
import UnityEngine.TouchPhase;

var radius : float = 120.0f;
var joy_input : Vector2;

private var rect : RectTransform;
private var init_pos : Vector2;
private var actual_scale : Vector2;
private var canvas_size = Vector2(800.0,600.0);


// becareful!! you have to set this joy's anchor origin to bottom-left.
function Start () 
{
	rect = GetComponent(RectTransform);
	init_pos = rect.anchoredPosition;
	
	actual_scale.x = canvas_size.x / Screen.width;
	actual_scale.y = canvas_size.y / Screen.height;
	
}

function Update ()
{
	
	if(Input.touchCount > 0)
	{
		var touch_analog = new Touch();
		if(Input.touchCount > 1)
		{
			for( var i = 0 ; i < Input.touchCount ; i++ ){
		    	if( Input.GetTouch(i).position.x < Screen.width/2 ){
		    		touch_analog = Input.GetTouch(i);
		    	}
		    }
		}
		else{
			touch_analog = Input.GetTouch(0);
		}
		
		var actual_touch : Vector2;						// find real positon on canvas
		actual_touch.x = actual_scale.x * touch_analog.position.x;
		actual_touch.y = actual_scale.y * touch_analog.position.y;
		
		joy_input = actual_touch - init_pos;
		var size = Mathf.Sqrt(joy_input.sqrMagnitude); // find size of vector

		if( size <= radius )
		{
			// touch on analog
			rect.anchoredPosition = actual_touch;
			joy_input.Normalize();	// normalize vector
		}
		else
		{
			// touch but not on analog
			rect.anchoredPosition = init_pos;
			joy_input = Vector2.zero;	
		}
	}
	else
	{
		// not touch somethig
		rect.anchoredPosition = init_pos;
		joy_input = Vector2.zero;
	}

}

