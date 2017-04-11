import React, { PureComponent } from 'react';
import Circle from './Circle';
import Button from './Button';

let requestID;
let circles;
let startButton;
let stopButton;

export default class Canvas extends PureComponent {

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.checkCollisions(circles);
    circles.forEach(circle => {circle.draw(); circle.move()});
    startButton.draw();
    stopButton.draw();
  }

  createCircles(number) {
    circles = [];
    const ctx = this.refs.canvas.getContext('2d');
    const width = this.refs.canvas.width;
    const height = this.refs.canvas.height;
    const minRadius = 10;
    const maxRadius = 25;
    const margin = 2 * maxRadius;
    let x = 0;
    let y = 45;
    let radius = 0;
    let id = 1;

    while(number) {
      radius = Math.random() * (maxRadius - minRadius) + minRadius;
      x += margin;
      if (x > width-radius) {
        y += margin;
        x = margin;
        if (y > height-radius) {
          alert('Not enough free space');
        }
      }
      const params = {id, x, y, radius, ctx};
      circles.push(new Circle(params));
      id++;
      number--;
    }
  }

  createButtons() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const params = {
      x: 50,
      y: canvas.height-100,
      width: 80,
      height: 40,
      text: 'START',
      ctx: ctx
    }
    startButton = new Button(params);
    params.x = 150;
    params.text = 'STOP';
    stopButton = new Button(params);
  }

  onClickCanvas(e) {
    const canvas = this.refs.canvas;
    const offsetX = canvas.offsetLeft;
    const offsetY = canvas.offsetTop;
    const x = e.pageX - offsetX;
    const y = e.pageY - offsetY;
    if (startButton.isMouseOver(x, y)) {
      this.startAnimation();
    } else if (stopButton.isMouseOver(x, y)) {
      this.stopAnimation();
    } else {
      circles.forEach(circle => {
        if(circle.isMouseOver(x, y)) {
          circle.toggleFreeze();
        }
      })
    }
  }

  onMouseMoveCanvas(e) {
    const canvas = this.refs.canvas;
    const offsetX = canvas.offsetLeft;
    const offsetY = canvas.offsetTop;
    const x = e.pageX - offsetX;
    const y = e.pageY - offsetY;

    let overCircle = false;
    circles.forEach(circle => {
      if(circle.isMouseOver(x, y)) {
        overCircle = true;
      }
    })

    if (startButton.isMouseOver(x, y) || stopButton.isMouseOver(x, y) || overCircle) {
      canvas.style.cursor = 'pointer';
    } else {
      canvas.style.cursor = 'default';
    }
  }

  startAnimation() {
    cancelAnimationFrame(requestID);
    this.updateCanvas()
    requestID = requestAnimationFrame(this.startAnimation.bind(this));
  }

  stopAnimation() {
    cancelAnimationFrame(requestID);
  }

  checkCollisions(circles) {

    const changeMovingPath = (ids) => {
      const filtered = circles.filter(circle => ids.has(circle.id))
      filtered.forEach(circle => {
        circle.dx = -circle.dx
        circle.dy = -circle.dy
      });
    }

    const isCollided = (firstCircle, secondCircle) => {
      const minRange = firstCircle.radius + secondCircle.radius;
      const dx = Math.abs(firstCircle.x - secondCircle.x);
      const dy = Math.abs(firstCircle.y - secondCircle.y);
      const range = Math.sqrt( (Math.pow(dx, 2) + Math.pow(dy, 2)) );
      return range <= minRange;
    };

    let ids = new Set();

    circles.forEach((circle) => {
      let i = circle.id;
      for(i; i < circles.length; i++) {
        if( isCollided(circle, circles[i]) ) {
          ids.add(circle.id)
          ids.add(circles[i].id)
        }
      }
    });
    changeMovingPath(ids);
  }

  componentDidMount() {
    this.createCircles(this.props.circlesNumber);
    this.createButtons();
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.createCircles(this.props.circlesNumber);
    this.updateCanvas();
  }

  render() {
    return (
      <canvas
        id='canvas'
        ref='canvas'
        height={this.props.height}
        width={this.props.width}
        onClick={this.onClickCanvas.bind(this)}
        onMouseMove={this.onMouseMoveCanvas.bind(this)}>
      </canvas>
    )
  }
}
