// ##### REQUIRES #####
// globals

class Utils {
	static logData = {
		text: {},
		spacing: 30,
	}

	static log(name, ...text) {
		Utils.logData.text[name] = text.join(" ");
	}

	static setupHTML() {
		G.canvas = document.getElementById("canvas");
		G.ctx = G.canvas.getContext("2d");
		G.playButtonImg = document.getElementById("playButtonImg");
		G.pauseButtonImg = document.getElementById("pauseButtonImg");

		document.getElementById("pauseButton").onmousedown = G.togglePause;

		document.addEventListener('mousedown', Mouse.down);
		document.addEventListener('mouseup', Mouse.up);
		document.addEventListener('mousemove', Mouse.move);
		document.addEventListener('keydown', Key.down);

		const checkboxes = document.getElementsByClassName("checkbox");
		for (const checkbox of checkboxes) {
			checkbox.onmousedown = (event) => {
				event.stopPropagation();
				Menu.toggleCheckbox(checkbox);
				console.log("owo")
			}
		}
		
		const menuButtons = document.getElementsByClassName("menuButton");
		for (const button of menuButtons) {
			button.onmousedown = (event) => {
				Menu.toggle(button.id.slice(0, -6));
			}
		}

		const closeButtons = document.getElementsByClassName("closeButton");
		for (const button of closeButtons) {
			button.onmousedown = (event) => {
				button.parentElement.style.display = "none";
				event.stopPropagation();
			}
		}

		const menus = document.getElementsByClassName("menu");
		for (const menu of menus) {
			menu.onmousedown = (event) => {
				Menu.dragging = menu;
			}
		}

		const inputFields = document.getElementsByTagName("INPUT");
		for (const inputField of inputFields) {
			inputField.onchange = (event) => {
				const menu = inputField.parentElement.parentElement.id.slice(0, -4);
				Menu.saveProperty(menu, inputField.name, inputField.value);
			}

			inputField.onkeydown = (event) => {
				if (event.code == "Enter") {
					document.activeElement.blur();
				}
			}
		}

		const selectFields = document.getElementsByTagName("SELECT");
		for (const selectField of selectFields) {
			selectField.onchange = (event) => {
				const menu = selectField.parentElement.parentElement.id.slice(0, -4);
				Menu.saveProperty(menu, selectField.name, selectField.value);
			}
		}
	}
}

