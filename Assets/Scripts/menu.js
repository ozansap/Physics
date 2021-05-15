// ##### REQUIRES #####
// globals

class Menu {
	static dragging;
	static object = {
		tuneCircle: null,
		tuneSpring: null
	};
	static menus = {
		search: document.getElementById("searchMenu"),
		help: document.getElementById("helpMenu"),
		save: document.getElementById("saveMenu"),
		add: document.getElementById("addMenu"),
		tuneWorld: document.getElementById("tuneWorldMenu"),
		tuneSpring: document.getElementById("tuneSpringMenu"),
		tuneCircle: document.getElementById("tuneCircleMenu"),
		settings: document.getElementById("settingsMenu")
	}

	static toggle(menu) {
		const menuElement = Menu.menus[menu];
	
		if (menuElement.style.display == "none" || !menuElement.style.display) {
			menuElement.style.display = "flex";
			Menu.loadProperties(menu);
		} else {
			menuElement.style.display = "none";
		}
	}

	static open(menu) {
		const menuElement = Menu.menus[menu];
		menuElement.style.display = "flex";
		Menu.loadProperties(menu);
	}

	static loadProperties(menu) {
		switch (menu) {
			case "tuneWorld":																																//tuneWorld
				for (const section of Menu.menus["tuneWorld"].children) {
					const isSection = section.classList.contains("menuSection");
					const isSpacer = section.classList.contains("spacer");
					if (!isSection || isSpacer) continue;

					for (const property of section.children) {
						if (property.tagName == "INPUT" || property.tagName == "SELECT") { 				//input, select
							property.value = G[property.name];
							property.onmousedown = (event) => event.stopPropagation();
						} else if (property.classList.contains("checkbox")) { 										//checkbox
							Menu.setCheckbox(property, G[property.id]);
						}
					}
				}
				break;
			case "tuneCircle":																															//tuneObject
			case "tuneSpring":
				const o = Menu.object[menu];
				for (const section of Menu.menus[menu].children) {
					if (section.tagName == "P") {
						section.innerHTML = o.name;
					}
					const isSection = section.classList.contains("menuSection");
					const isSpacer = section.classList.contains("spacer");
					if (!isSection || isSpacer) continue;

					for (const property of section.children) {
						if (property.tagName == "INPUT" || property.tagName == "SELECT") {				//input, select
							property.onmousedown = (event) => event.stopPropagation();
							property.value = o[property.name];
						} else if (property.classList.contains("checkbox")) { 										//checkbox
							Menu.setCheckbox(property, o[property.id]);
						}
					}
				}
				break;
		}
	}

	static saveProperty(menu, property, value) {
		if (!isNaN(parseFloat(value))) value = parseFloat(value);
		switch (menu) {
			case "tuneWorld":
				G[property] = value;
				break;
			case "tuneCircle":
			case "tuneSpring":
				Menu.object[menu][property] = value;
				break;
		}
	}

	static toggleCheckbox(checkbox) {
		checkbox.classList.toggle("checked");
		const menu = checkbox.parentElement.parentElement.id.slice(0, -4);
		Menu.saveProperty(menu, checkbox.id, checkbox.classList.contains("checked"));
	}

	static setCheckbox(checkbox, value) {
		if (checkbox.classList.contains("checked") !== value) {
			checkbox.classList.toggle("checked");
		}
	}

	static menuName(object) {
		return "tune" + object.constructor.name.slice(1);
	}
}