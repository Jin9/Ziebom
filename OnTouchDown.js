#pragma strict

import UnityEngine.EventSystems;
import UnityEngine.Touch;
import UnityEngine.TouchPhase;
import System.Collections.Generic;

var button : GameObject;
var spawnBullet : GameObject;

private var pos : Vector2;
private var shoot : Shooting;
private var canvas_size = Vector2(800.0,600.0);
private var actual_scale : Vector2;
private var is_multi_touch : boolean = false;
private var timer : float = 0.0f;
private var timebetweenShot : float = 0.15f;
private var radius = 50.0f;
private var delayTime = 0.2f;
private var counter : float = 0.0f;

function Start(){
	pos = button.GetComponent(RectTransform).anchoredPosition;
	shoot = spawnBullet.GetComponent(Shooting);
	
	actual_scale.x = canvas_size.x / Screen.width;
	actual_scale.y = canvas_size.y / Screen.height; 
}

function Update () {

	
	if(Input.touchCount > 1 ){
		if (!is_multi_touch){
			
			is_multi_touch = true;
			var touch_button = new Touch();
		    
		    for( var i = 0 ; i < Input.touchCount ; i++ ){
		    	if( Input.GetTouch(i).position.x > Screen.width/2 ){
		    		touch_button = Input.GetTouch(i);
		    	}
		    }

		    // check touch_button is clicked
		    var actual_touch : Vector2;						// find real positon on canvas
			actual_touch.x = actual_scale.x * touch_button.position.x;
			actual_touch.y = actual_scale.y * touch_button.position.y;
			
			if( (pos.x-radius < actual_touch.x && actual_touch.x < pos.x+radius) && (pos.y-radius < actual_touch.y && actual_touch.y < pos.y+radius) ){
				
				// button is clicked button (button is touched)
				
				if( touch_button.phase.Equals(TouchPhase.Ended) ){
					button.GetComponent(Image).color = Color.red;
					shoot.Shoot();
				}
			}
		}
		
    }
    
    else
    {
    	counter += Time.deltaTime;
    	if( counter > delayTime ){
    		counter = 0.0f;
    		button.GetComponent(Image).color = Color.white;
    		is_multi_touch = false;	
    	}
    }

}