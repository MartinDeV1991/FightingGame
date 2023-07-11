

class Fighter extends Sprite {
    constructor({ position, velocity, color = 'red', imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, sprites, attackBox = { offset: {}, width: undefined, height: undefined } }) {
        super({ position, imageSrc, scale, framesMax, offset })
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastAction
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        this.dead = false
        this.inAir = false
        this.timeOut = 0

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    update() {
        this.draw()
        if (!this.dead) this.animateFrames()

        if (this.timeOut > 0) {
            this.timeOut--
        }


        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // draw out attackboxes
        // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        if ((this.position.x + this.velocity.x > 0 && this.position.x + this.width + this.velocity.x < canvas.width) && this.timeOut === 0 && !this.dead) {
            this.position.x += this.velocity.x
        }
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0
            this.position.y = 330
            this.inAir = false;
        } else {
            this.velocity.y += gravity
            this.inAir = true;
        }

        this.velocity.x = 0

        // movement
        if (this.left && this.lastAction === 'left') {
            this.velocity.x = -10
            this.switchSprite('run')
        } else if (this.right && this.lastAction === 'right') {
            this.velocity.x = 10
            this.switchSprite('run')
        } else {
            this.switchSprite('idle')
        }

        // jumping
        if (this.velocity.y < 0) {
            this.switchSprite('jump')
        } else if (this.velocity.y > 0) {
            this.switchSprite('fall')
        }
    }

    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
    }

    takeHit() {
        this.health -= 20
        this.timeOut = 20

        if (this.health <= 0) {
            this.switchSprite('death')
        } else this.switchSprite('takeHit')
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax - 1) this.dead = true
            return
        }

        // overriding all other animations with the attack animation
        if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1) return

        // override when fighter gets hit
        if (this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1) return

        const spriteObj = this.sprites[sprite];
        if (this.image !== spriteObj.image) {
            this.image = spriteObj.image
            this.framesMax = spriteObj.framesMax
            this.framesCurrent = 0
        }
    }
}