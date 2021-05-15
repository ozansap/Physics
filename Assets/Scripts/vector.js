// ##### REQUIRES #####
//

class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	static zero() {
		return new Vector(0, 0);
	}

	dot(v) {
		return this.x * v.x + this.y * v.y;
	}

	distance(v) {
		return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
	}

	add(...vs) {
		let total = [this.x, this.y];

		for (const v of vs) {
			total[0] += isNaN(v) ? v.x : v;
			total[1] += isNaN(v) ? v.y : v;
		}

		return new Vector(...total);
	}
	
	subtract(...vs) {
		let total = [this.x, this.y];

		for (const v of vs) {
			total[0] -= isNaN(v) ? v.x : v;
			total[1] -= isNaN(v) ? v.y : v;
		}

		return new Vector(...total);
	}

	multiply(...vs) {
		let total = [this.x, this.y];

		for (const v of vs) {
			total[0] *= isNaN(v) ? v.x : v;
			total[1] *= isNaN(v) ? v.y : v;
		}

		return new Vector(...total);
	}

	divide(...vs) {
		let total = [this.x, this.y];

		for (const v of vs) {
			total[0] /= isNaN(v) ? v.x : v;
			total[1] /= isNaN(v) ? v.y : v;
		}

		return new Vector(...total);
	}

	magnitude() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}

	normalize() {
		return this.magnitude() ? this.divide(this.magnitude()) : Vector.zero();
	}

	distanceToLine(p1, p2) {
		const [a, b, c] = [p1.y - p2.y, p2.x - p1.x, p1.x * p2.y - p1.y * p2.x];
		return Math.abs(a * this.x + b * this.y + c) / (new Vector(a, b).magnitude());
	}

	distanceToLineSegment(p1, p2) {
		const l2 = Math.pow(p1.distance(p2), 2);
		if (l2 == 0) return this.distance(p1);
		const t = Math.max(0, Math.min(1, this.subtract(p1).dot(p2.subtract(p1)) / l2));
		const projection = p2.subtract(p1).multiply(t).add(p1);
		return this.distance(projection);
	}

	angle() {

	}
}