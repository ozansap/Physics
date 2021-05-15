let fps;
let pps;

Utils.setupHTML();

document.body.onload = async () => {
	G.canvas.width = window.innerWidth;
	G.canvas.height = window.innerHeight - 1;

	let then = Date.now();
	let startTime = then;
	let drawTimer = 0;
	let updateTimer = 0;
	let drawCount = 0;
	let updateCount = 0;

	const drawInterval = G.frametime * 1000;
	const updateInterval = G.physicstime * 1000;

	start();
	
	while (!G.stop) {
		let now = Date.now();
		let elapsed = now - then; //in miliseconds
		then = now;
		drawTimer += elapsed;
		updateTimer += elapsed;

		if (drawTimer >= drawInterval) {
			draw();
			drawCount++;
			drawTimer -= drawInterval;
		}

		if (updateTimer >= updateInterval) {
			update();
			updateCount++;
			updateTimer -= updateInterval;
		}

		const seconds = (Date.now() - startTime) / 1000;
		fps = Math.round(drawCount / seconds);
		pps = Math.round(updateCount / seconds);

		const sleep = Math.min(drawInterval - drawTimer, updateInterval - updateTimer);
		if (sleep > 0) {
			await (new Promise(resolve => setTimeout(resolve, sleep)));
		}
	}
}

// ########## START ##########
function start() {
	//Presets.chain();
	//Presets.rope();
	Presets.softBody();
	//Presets.joint();
	//Presets.single();
}

// ########## UPDATE ##########
function update() {
	if (G.paused) return;
		
	for (const o of G.world.values()) {
		if (!o.active) continue;
		o.applyPhysics();
	}
	for (const [o1, o2] of G.collisions.values()) {
		const o1Velocity = o1.collisionVelocity(o2);
		const o2Velocity = o2.collisionVelocity(o1);
		
		o1.velocity = o1Velocity;
		o2.velocity = o2Velocity;
	}
	G.collisions = new Map();
}


// ########## DRAW ##########
function draw() {
	//canvas
	G.canvas.width = window.innerWidth;
	G.canvas.height = window.innerHeight - 1;

	G.ctx.fillStyle = "#3e3e42";
	G.ctx.fillRect(0, 0, G.canvas.width, G.canvas.height);

	//log
	G.ctx.fillStyle = "white";
	G.ctx.font = "10px Roboto";
	G.ctx.fillText(`FPS: ${fps}`, 10, G.canvas.height - 25);
	G.ctx.fillText(`PPS: ${pps}`, 10, G.canvas.height - 10);
	
	G.ctx.font = "20px Roboto";
	Utils.log("mode", Mouse.mode.substring(0, 1).toUpperCase() + Mouse.mode.substring(1));
	let y = Utils.logData.spacing;
	for (const t in Utils.logData.text) {
		G.ctx.fillText(Utils.logData.text[t], 20, y);
		y += Utils.logData.spacing;
	}

	for (const o of G.world.values()) {
		if (!o.visible) continue;
		o.draw();
	}
}