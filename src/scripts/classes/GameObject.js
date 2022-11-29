class GameObject {
  x;
  y;
  xSpeed;
  ySpeed;
  width;
  height;
  color;
  touchesGround;
  drag;

  constructor(
    x,
    y,
    width,
    height,
    color = "gray",
    xSpeed = 0,
    ySpeed = 1,
    touchesGround = false,
    drag = 0.99
  ) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.width = width;
    this.height = height;
    this.color = color;
    this.touchesGround = touchesGround;
    this.drag = drag;
  }

  jump(strength) {
    this.ySpeed = strength;
  }

  update(gravity, canvas) {
    this.x += this.xSpeed;

    this.ySpeed += gravity;
    this.y += this.ySpeed;

    if (this.y + this.height >= canvas.height) {
      this.y = canvas.height - this.height;
      this.ySpeed = 0;
      this.touchesGround = true;
    } else {
      this.touchesGround = false;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export { GameObject };
