import { GameObject } from "./GameObject.js";

const commands = {
  upArrowKey: false,
  downArrowKey: false,
  leftArrowKey: false,
  rightArrowKey: false,
  spaceKey: false,
};

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    commands.leftArrowKey = true;
  }
  if (event.key === "ArrowRight") {
    commands.rightArrowKey = true;
  }
  if (event.key === "ArrowUp") {
    commands.upArrowKey = true;
  }
  if (event.key === "ArrowDown") {
    commands.downArrowKey = true;
  }
  if (event.key === " ") {
    commands.spaceKey = true;
  }
});
window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    commands.leftArrowKey = false;
  }
  if (event.key === "ArrowRight") {
    commands.rightArrowKey = false;
  }
  if (event.key === "ArrowUp") {
    commands.upArrowKey = false;
  }
  if (event.key === "ArrowDown") {
    commands.downArrowKey = false;
  }
  if (event.key === " ") {
    commands.spaceKey = false;
  }
});

class Player extends GameObject {
  isCrouching = false;
  isAttacking = false;
  isStunned = false;
  isJumping = false;
  hasDoubleJumped = false;
  facing;

  attackBox = {
    x: this.x + this.width / 2,
    y: this.y + this.height / 2 - 25,
    width: 0,
    height: 50,
  };
  attackCurrent = 0;
  realWidth;
  realHeight;

  constructor(x, y, width, height, color, facing) {
    super(x, y, width, height, color);
    this.facing = facing;
    this.realWidth = width;
    this.realHeight = height;
  }

  attack() {
    this.isAttacking = true;

    if (this.facing === "left") {
      this.attackBox.width = -this.attackCurrent;
    } else if (this.facing === "right") {
      this.attackBox.width = this.attackCurrent;
    }
  }

  move() {
    if (commands.downArrowKey && this.touchesGround) {
      if (!this.isCrouching) {
        this.y += 64;
        this.isCrouching = true;
      }
      this.xSpeed = 0;
      this.height = 64;
    }
    if (!commands.downArrowKey) {
      if (commands.leftArrowKey && commands.rightArrowKey) {
        this.xSpeed = 0;
      } else if (commands.leftArrowKey && !commands.downArrowKey) {
        this.xSpeed = -4;
        this.facing = "left";
      } else if (commands.rightArrowKey && !commands.downArrowKey) {
        this.xSpeed = 4;
        this.facing = "right";
      } else {
        this.xSpeed = 0;
      }
      this.isCrouching = false;
      this.height = 128;

      if (commands.upArrowKey && this.touchesGround) {
        super.jump(-12);
        this.isJumping = true;
      }

      if (this.isJumping && commands.upArrowKey && !this.hasDoubleJumped && this.ySpeed > -1 && this.ySpeed < 3) {
        super.jump(-10);
        this.hasDoubleJumped = true;
        this.width = this.width * 1.5;
      }


      if (!commands.upArrowKey && this.touchesGround && this.isJumping) {
        this.isJumping = this.hasDoubleJumped = false;
        this.width = this.realWidth;
      }
    }

    this.ySpeed *= this.drag;
  }

  update(gravity, canvas) {
    super.update(gravity, canvas);

    if (this.x + this.width >= canvas.width) {
      this.x = canvas.width - this.width;
    } else if (this.x <= 0) {
      this.x = 0;
    }

    this.move();

    if (commands.spaceKey) {
      if (this.attackCurrent < this.attackRange) {
        this.attackCurrent += this.attackCurrent / 2 * 1.01 + 1;
      } 
      this.attack();
    } else if (!commands.spaceKey) {
      this.isAttacking = false;
      this.attackCurrent = 0;
    }

    this.attackBox.x = this.x + this.width / 2;
    this.attackBox.y = this.y + this.width / 2;
  }

  draw(ctx) {
    super.draw(ctx);

    if (this.isAttacking) {
      ctx.fillStyle = "red";
      ctx.fillRect(
        this.attackBox.x,
        this.attackBox.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }
}

export { Player };
