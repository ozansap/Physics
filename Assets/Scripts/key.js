// ##### REQUIRES #####
// mouse
// globals

class Key {
	static down(event) {
		if (event.repeat) return;
	
		if (Key[event.code]) {
			if (Mouse.holding || Mouse.pushing || Mouse.deleting) MouseL.up();
			Key[event.code]();
		};
	}

	static Space() {
		G.togglePause();
	}

	static KeyQ() {
		Mouse.mode = "hold";
	}

	static KeyW() {
		Mouse.mode = "push";
	}

	static KeyA() {
		Mouse.mode = "circle";
	}

	static KeyS() {
		Mouse.mode = "spring";
	}
	
	static KeyX() {
		Mouse.mode = "delete";
	}
}

