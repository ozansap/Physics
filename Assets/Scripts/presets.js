// ##### REQUIRES #####
// vector
// globals

class Presets {
	static joint() {
		const stiffness = 10000;
		const damping = 8;

		const circle1 = new PCircle({
			name: "circle1",
			mass: 10,
			position: new Vector(100, 100),
			velocity: Vector.zero(),
			force: Vector.zero(),
			radius: 10,
			bounciness: 0.8
		});

		const circle2 = new PCircle({
			name: "circle2",
			mass: 10,
			position: new Vector(150, 100),
			velocity: Vector.zero(),
			force: Vector.zero(),
			radius: 10,
			bounciness: 0.8
		});

		const spring1 = new PSpring({
			name: "spring1",
			o1: circle1,
			o2: circle2,
			stiffness: stiffness,
			length: 30,
			damping: damping
		})
	}

	static rope() {
		const stiffness = 100000;
		const damping = 10;

		const circle1 = new PCircle({
			name: "circle1",
			mass: 10,
			position: new Vector(100, 100),
			velocity: Vector.zero(),
			force: Vector.zero(),
			radius: 10,
			bounciness: 0.8
		});

		const circle2 = new PCircle({
			name: "circle2",
			mass: 10,
			position: new Vector(150, 100),
			velocity: Vector.zero(),
			force: Vector.zero(),
			radius: 10,
			bounciness: 0.8
		});

		const spring1 = new PSpring({
			name: "spring1",
			o1: circle1,
			o2: circle2,
			stiffness: stiffness,
			length: 50,
			damping: damping
		})
	}

	static chain() {
		const stiffness = 10000;
		const damping = 10;
		const bounciness = 0.5;

		const circle1 = new PCircle({
			name: "circle1",
			mass: 10,
			position: new Vector(100, 100),
			velocity: Vector.zero(),
			force: Vector.zero(),
			radius: 10,
			bounciness: bounciness
		});

		const circle2 = new PCircle({
			name: "circle2",
			mass: 10,
			position: new Vector(150, 100),
			velocity: Vector.zero(),
			force: Vector.zero(),
			radius: 10,
			bounciness: bounciness
		});

		const spring1 = new PSpring({
			name: "spring1",
			o1: circle1,
			o2: circle2,
			stiffness: stiffness,
			length: 30,
			damping: damping
		})

		const circle3 = new PCircle({
			name: "circle3",
			mass: 10,
			position: new Vector(200, 100),
			velocity: Vector.zero(),
			force: Vector.zero(),
			radius: 10,
			bounciness: bounciness
		});

		const spring2 = new PSpring({
			name: "spring2",
			o1: circle2,
			o2: circle3,
			stiffness: stiffness,
			length: 30,
			damping: damping
		})

		const circle4 = new PCircle({
			name: "circle4",
			mass: 10,
			position: new Vector(250, 100),
			velocity: Vector.zero(),
			force: Vector.zero(),
			radius: 10,
			bounciness: bounciness
		});

		const spring3 = new PSpring({
			name: "spring3",
			o1: circle3,
			o2: circle4,
			stiffness: stiffness,
			length: 30,
			damping: damping
		})

		const circle5 = new PCircle({
			name: "circle5",
			mass: 10,
			position: new Vector(300, 100),
			velocity: Vector.zero(),
			force: Vector.zero(),
			radius: 10,
			bounciness: bounciness
		});

		const spring4 = new PSpring({
			name: "spring4",
			o1: circle4,
			o2: circle5,
			stiffness: stiffness,
			length: 30,
			damping: damping
		})
	}

	static softBody() {
		const side = 50;
		const stiffness = 50000;
		const damping = 10;
		const middle = new Vector(G.canvas.width/2, G.canvas.height/2);

		const circle1 = new PCircle({
			name: "circle1",
			mass: 10,
			position: middle.add(new Vector(-side/2, -side/2)),
			velocity: Vector.zero(),
			force: Vector.zero(),
			radius: 10,
			bounciness: 0.8
		});
	
		const circle2 = new PCircle({
			name: "circle2",
			mass: 10,
			position: middle.add(new Vector(side/2, -side/2)),
			velocity: Vector.zero(),
			force: Vector.zero(),
			radius: 10,
			bounciness: 0.8
		});
	
		const circle3 = new PCircle({
			name: "circle3",
			mass: 10,
			position: middle.add(new Vector(side/2, side/2)),
			velocity: Vector.zero(),
			force: Vector.zero(),
			radius: 10,
			bounciness: 0.8
		});
	
		const circle4 = new PCircle({
			name: "circle4",
			mass: 10,
			position: middle.add(new Vector(-side/2, side/2)),
			velocity: Vector.zero(),
			force: Vector.zero(),
			radius: 10,
			bounciness: 0.8
		});
	
		const spring1 = new PSpring({
			name: "spring1",
			o1: circle1,
			o2: circle2,
			stiffness: stiffness,
			length: side,
			damping: damping
		})
	
		const spring2 = new PSpring({
			name: "spring2",
			o1: circle2,
			o2: circle3,
			stiffness: stiffness,
			length: side,
			damping: damping
		})
	
		const spring3 = new PSpring({
			name: "spring3",
			o1: circle3,
			o2: circle4,
			stiffness: stiffness,
			length: side,
			damping: damping
		})
		
		const spring4 = new PSpring({
			name: "spring4",
			o1: circle4,
			o2: circle1,
			stiffness: stiffness,
			length: side,
			damping: damping
		})
	
		const spring5 = new PSpring({
			name: "spring5",
			o1: circle1,
			o2: circle3,
			stiffness: stiffness,
			length: side * Math.sqrt(2),
			damping: damping
		})
	
		const spring6 = new PSpring({
			name: "spring6",
			o1: circle2,
			o2: circle4,
			stiffness: stiffness,
			length: side * Math.sqrt(2),
			damping: damping
		})
	}

	static holdSpring(mouse, object) {
		return new PSpring({
			name: "holdSpring",
			stiffness: 50000,
			damping: 500,
			length: 0,
			colorPulling: "#FFFFFF",
			colorPushing: "#FFFFFF",
			o1: object,
			o2: mouse
		});
	}

	static pushSpring(mouse, object) {
		return new PSpring({
			name: "pushSpring",
			stiffness: 0,
			damping: 0,
			length: 0,
			colorPulling: "#FFFFFF",
			colorPushing: "#FFFFFF",
			o1: object,
			o2: mouse
		});
	}

	static PCircle(position) {
		return new PCircle({
			name: "circle",
			mass: 10,
			position: position,
			velocity: Vector.zero(),
			force: Vector.zero(),
			radius: 20,
			bounciness: 0.8,
			color: "#" + Math.floor(Math.random()*16777215).toString(16)
		});
	}
}