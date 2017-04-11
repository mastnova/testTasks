const direction = () => Math.random() < 0.5 ? 1 : -1;

export default class Circle {

  constructor(params) {
    this.id = params.id;
    this.x = params.x;
    this.y = params.y;
    this.dx = direction();
    this.dy = direction();
    this.radius = params.radius;
    this.ctx = params.ctx;
    this.frozen = false;
    this.color = '#ff9d2f';
    this.frozenColor = '#00a9ff';
    this.activeColor = '#ff9d2f'
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }

  move() {
    if(this.frozen) {
      return;
    }
    this.x += this.dx;
    this.y += this.dy;
    if(this.x + this.dx > canvas.width-this.radius || this.x + this.dx < this.radius) {
      this.dx = -this.dx;
    }
    if(this.y + this.dy < this.radius || this.y + this.dy > canvas.height-this.radius) {
      this.dy = -this.dy;
    }
  }

  toggleFreeze() {
    this.frozen = !this.frozen;
    this.color = this.color === this.activeColor ? this.frozenColor : this.activeColor;
  }

  isMouseOver(cursorX, cursorY) {
    const dx = Math.abs(this.x - cursorX);
    const dy = Math.abs(this.y - cursorY);
    const range = Math.sqrt( (Math.pow(dx, 2) + Math.pow(dy, 2)) );
    return range <= this.radius;
  }

}
