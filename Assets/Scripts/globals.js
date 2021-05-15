class G {
	static fps = 60;							//60
	static pps = 200;							//120

	// ########## SETTINGS ##########
	static gravity = 2000;				//2000
	static timeScale = 1;					//1
	static drag = 5;							//5
	static edge = "border";				//border, wrap around, empty

	// ########## ##########
	static paused = false;
	static frametime = 1 / G.fps;
	static physicstime = 1 / G.pps;
	static stop = false;
	static world = new Map();
	static collisions = new Map();
	static pauseButtonImg;
	static playButtonImg;
	static canvas;
	static ctx;
}