// ##### REQUIRES #####
// menu
// globals
// presets

class Mouse {
	static mode = "hold";
	static holding = false;
	static pushing = false;
	static deleting = false;

	static object;
	static spring;
	static active = false;
	static position;

	static down(event) {
		Mouse.position = new Vector(
			event.clientX - canvas.offsetLeft,
			event.clientY - canvas.offsetTop
		)

		switch (event.button) {
			case 0:
				MouseL.down();
				break;
			case 1:
				MouseM.down();
				break;
			case 2:
				MouseR.down();
				break;
		}
	}

	static up(event) {
		Mouse.position = new Vector(
			event.clientX - canvas.offsetLeft,
			event.clientY - canvas.offsetTop
		)

		switch (event.button) {
			case 0:
				MouseL.up();
				break;
			case 1:
				MouseM.up();
				break;
			case 2:
				MouseR.up();
				break;
		}
	}

	static move(event) {
		const newPosition = new Vector(
			event.clientX - canvas.offsetLeft,
			event.clientY - canvas.offsetTop
		)

		if (Mouse.deleting) {
			const object = Mouse.findObject(Mouse.position);
			if (object) object.destroy();
		}

		if (Menu.dragging) {
			const positionChange = newPosition.subtract(Mouse.position);

			Menu.dragging.style.top = `${Menu.dragging.offsetTop + positionChange.y}px`; 
			Menu.dragging.style.left = `${Menu.dragging.offsetLeft + positionChange.x}px`;
		}

		Mouse.position = newPosition;
	}
	//

	static findObject(position, filter = (o) => true) {
		for (const o of G.world.values()) {
			if (!filter(o)) continue;
			switch (o.constructor.name) {
				case "PCircle":
					if (position.distance(o.position) < o.radius) {
						return o;
					}
					break;
				case "PSpring":
					if (position.distanceToLineSegment(o.o1.position, o.o2.position) < o.width) {
						return o;
					}
					break;
			} 
		}
	}
}

class MouseL {
	static down() {
		let object;

		switch (Mouse.mode) {
			case "hold":																												//hold
				object = Mouse.findObject(Mouse.position, (o) => {
					return o.constructor.name == "PCircle"
				});
				if (!object) return;
				Mouse.holding = true;
				Mouse.object = object;
				Mouse.spring = Presets.holdSpring(Mouse, object);
				break;
			case "circle":																											//circle
				Presets.PCircle(Mouse.position);
				break;
			case "delete":																											//delete
				Mouse.deleting = true;
				object = Mouse.findObject(Mouse.position);
				if (object) object.destroy();
				break;
			case "push":
				object = Mouse.findObject(Mouse.position, (o) => {
					return o.constructor.name == "PCircle"
				});
				if (!object) return;
				Mouse.pushing = true;
				Mouse.object = object;
				Mouse.spring = Presets.pushSpring(Mouse, object);
				break;
		}
	}

	static up() {
		let force;

		if (Menu.dragging) Menu.dragging = null;

		switch (Mouse.mode) {
			case "hold":																												//hold
				if (!Mouse.holding) return;
				Mouse.holding = false;
				Mouse.spring.destroy();
				break;
			case "circle":																											//circle
				break;
			case "delete":																											//delete
				Mouse.deleting = false;
				break;
			case "push":
				if (!Mouse.pushing) return;
				Mouse.pushing = false;
				force = Mouse.object.position.subtract(Mouse.position);
				Mouse.object.velocity = Mouse.object.velocity.add(force.multiply(5));
				Mouse.spring.destroy();
				break;
		}
	}
}

class MouseR {
	static down() {
		const o = Mouse.findObject(Mouse.position);
		if (!o) return;

		const menu = Menu.menuName(o);
		Menu.object[menu] = o;

		Menu.open(menu);
	}

	static up() {
		
	}
}

class MouseM {
	static down() {

	}

	static up() {

	}
}