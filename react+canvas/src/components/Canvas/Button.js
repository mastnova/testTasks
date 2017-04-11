export default class Button {

  constructor(params) {
    this.x = params.x;
    this.y = params.y;
    this.width = params.width;
    this.height = params.height;
    this.text = params.text;
    this.ctx = params.ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(this.text, this.x+15, this.y+25);
    this.ctx.closePath();
  }

  isMouseOver(cursorX, cursorY) {
    return cursorX > this.x &&
           cursorX < this.x + this.width &&
           cursorY > this.y &&
           cursorY < this.y + this.height
  }
}
