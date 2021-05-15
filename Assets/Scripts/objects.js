// ##### REQUIRES #####
// globals

class Object {
	constructor({
		name,
		tag = null
	}) {
		if (!name) name = "obj";
		if (G.world.has(name)) {
			let i = 2;
			while (G.world.has(name+i)) {
				i++;
			}
			name = name + i;
		}
		
		this.tag = tag;
		this.name = name;
	}
}

class PObject extends Object {
	constructor({
		name,
		tag = null,
		//
		visible = true,
		active = true,
		collider = true,
		color = "#FFFFFF"
	}) {
		super({ name, tag });

		this.visible = visible;
		this.active = active;
		this.collider = collider;
		this.color = color;

		G.world.set(this.name, this);
	}

	applyPhysics() {
		throw new Error("Abstract method!");
	}

	draw() {
		throw new Error("Abstract method!");
	}

	destroy() {
		if (this.dispose) this.dispose();
		G.world.delete(this.name);
	}
}

class PBody extends PObject {
	constructor({
		name,
		tag = null,
		visible = true,
		active = true,
		collider = true,
		color = "#FFFFFF",
		//
		mass,
		position,
		velocity,
		bounciness = 1
	}) {
		super({ name, tag, visible, active, collider, color });
	
		this.mass = mass;
		this.position = position;
		this.velocity = velocity;
		this.bounciness = bounciness;

		this.forces = new Map();
	}

	applyPhysics() {
		//movement
		let drag = this.velocity.multiply(G.drag, -1);
		
		let totalForce = drag.add(new Vector(0, G.gravity * this.mass));

		for (const force of this.forces.values()) {
			totalForce = totalForce.add(force);
		}
		
		let acceleration = totalForce.divide(this.mass);
		
		this.velocity = acceleration.multiply(G.timeScale, G.physicstime).add(this.velocity);
		this.position = this.velocity.multiply(G.timeScale, G.physicstime).add(this.position);

		this.collision();
	}
}

class PCircle extends PBody {
	constructor({
		name,
		tag = null,
		visible = true,
		active = true,
		collider = true,
		color = "#FFFFFF",
		mass,
		position,
		velocity,
		bounciness = 1,
		//
		radius
	}) {
		super({ name, tag, visible, active, collider, color, mass, position, velocity, bounciness });

		this.radius = radius;
	}

	collision() {
		//window borders
		if (this.position.x - this.radius < 0) {
			this.position.x = this.radius //- (this.position.x - this.radius) + this.radius;
			this.velocity.x *= -1 * this.bounciness;
		} else if (this.position.x + this.radius > G.canvas.width) {
			this.position.x = G.canvas.width - this.radius //c.width - (this.position.x + this.radius - c.width) - this.radius;
			this.velocity.x *= -1 * this.bounciness;
		}

		if (this.position.y - this.radius < 0) {
			this.position.y = this.radius//- (this.position.y - this.radius) + this.radius;
			this.velocity.y *= -1 * this.bounciness;
		} else if (this.position.y + this.radius > G.canvas.height) {
			this.position.y = G.canvas.height - this.radius //c.height - (this.position.y + this.radius - c.height) - this.radius;
			this.velocity.y *= -1 * this.bounciness;
		}

		//other objects
		if (!this.collider) return;
		for (const o of G.world.values()) {
			if (!o.collider || o.name == this.name) continue;
			switch (o.constructor.name) {
				case "PCircle":
					const overlap = this.radius + o.radius - this.position.distance(o.position);
					if (overlap <= 0) continue;
					const direction = this.position.subtract(o.position).normalize();
					this.position = this.position.add(direction.multiply((overlap) / 2));
					o.position = o.position.subtract(direction.multiply((overlap) / 2));

					if (!G.collisions.has(o.name+this.name)) G.collisions.set(this.name+o.name, [this, o]);
					break;
			}
		}
	}

	draw() {
		G.ctx.fillStyle = this.color;
		G.ctx.beginPath();
		G.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		G.ctx.fill();
	}

	collisionVelocity(o) {
		const part1 = (o.mass * 2) / (this.mass + o.mass);
		const part2top = this.velocity.subtract(o.velocity).dot(this.position.subtract(o.position));
		const part2bottom = Math.pow(this.position.subtract(o.position).magnitude(), 2);
		const part2 = part2top / part2bottom;
		const part3 = this.position.subtract(o.position);

		return this.velocity.subtract(part3.multiply(part1, part2));
	}
}

class PSpring extends PObject {
	constructor({
		name,
		tag = null,
		visible = true,
		active = true,
		collider = true,
		//
		width = 3,
		o1,
		o2,
		stiffness,
		length,
		damping,
		elasticity,
		colorPushing = "#FFFFFF",
		colorPulling = "#FFFFFF"
	}) {
		super({ name, tag, visible, active, collider });

		this.colorPushing = colorPushing;
		this.colorPulling = colorPulling;
		this.width = width;
		this.o1 = o1;
		this.o2 = o2;
		this.stiffness = stiffness;
		this.length = length;
		this.damping = damping;
		this.elasticity = 0;

		this.force = 0;
	}

	applyPhysics() {
		const distance = this.o1.position.distance(this.o2.position);

		// if (distance > this.length + this.elasticity) {
		// 	return;
		// } else if (distance < this.length - this.elasticity) {
		// 	return;
		// }

		this.force = -this.stiffness * (distance - this.length);

		const vectorFactor = this.force / distance;
		const vectorForce = this.o2.position.subtract(this.o1.position).multiply(vectorFactor);
	
		// const dot1 = this.o1.active ? this.o1.velocity.normalize().dot(vectorForce.normalize()) : 0;
		// const dot2 = this.o2.active ? this.o2.velocity.normalize().dot(vectorForce.normalize()) : 0;

		const dot1 = this.o1.active ? Math.abs(this.o1.velocity.normalize().dot(vectorForce.normalize())) : 0;
		const dot2 = this.o2.active ? Math.abs(this.o2.velocity.normalize().dot(vectorForce.normalize())) : 0;

		const damping1 = this.o1.active ? this.o1.velocity.multiply(this.damping, dot1) : 0;
		const damping2 = this.o2.active ? this.o2.velocity.multiply(this.damping, dot2) : 0;
		
		if (this.o1.active) this.o1.forces.set(this.name, vectorForce.multiply(-1).subtract(damping1));
		if (this.o2.active) this.o2.forces.set(this.name, vectorForce.subtract(damping2));
	}

	draw() {
		G.ctx.beginPath();
		G.ctx.lineWidth = this.width;
		G.ctx.strokeStyle = this.force > 0 ? this.colorPushing : this.colorPulling;
		G.ctx.moveTo(this.o1.position.x, this.o1.position.y);
		G.ctx.lineTo(this.o2.position.x, this.o2.position.y);
		G.ctx.stroke();
	}

	dispose() {
		if (this.o1.forces) this.o1.forces.delete(this.name);
		if (this.o2.forces) this.o2.forces.delete(this.name);
	}
}