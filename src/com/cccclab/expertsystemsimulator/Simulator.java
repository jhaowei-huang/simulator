package com.cccclab.expertsystemsimulator;

import com.vaadin.annotations.JavaScript;
import com.vaadin.ui.AbstractJavaScriptComponent;

@SuppressWarnings("serial")
@JavaScript({ 
	"https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js", 
	"js/three.min.js",
	"js/stats.js",
	"js/TrackballControls.js",
	"js/Detector.js",
	"js/OrbitControls.js",
	"js/scene.js" })
public class Simulator extends AbstractJavaScriptComponent {

}
