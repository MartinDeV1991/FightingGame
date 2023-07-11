export const states = {
    STANDING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    HIT: 4,
    DEAD: 5,
    ATTACK: 6,
}

class State {
    constructor(state) {
        this.state = state
    }
}

export class Standing extends State {
    constructor(player) {
        super('STANDING')
        this.player = player
    }
    enter() {
        this.player.maxFrame = 4
    }
    handleInput(input) {
        if (input === 'PRESS right') this.player.setState(states.RUNNING)
        else if (input === 'PRESS left') this.player.setState(states.RUNNING)
        else if (input === 'PRESS down') this.player.setState(states.ATTACK)
        else if (input === 'PRESS up') this.player.setState(states.JUMPING)
    }
}
export class Running extends State {
    constructor(player) {
        super('RUNNING')
        this.player = player
    }
    enter() {
        this.player.maxFrame = 8
    }
    handleInput(input) {
        if (input === 'PRESS left') this.player.setState(states.STANDING_LEFT)
        if (input === 'PRESS right') this.player.setState(states.RUNNING_RIGHT)
        else if (input === 'PRESS down') this.player.setState(states.SITTING_RIGHT)
        else if (input === 'PRESS up') this.player.setState(states.JUMPING_RIGHT)
    }
}

export class Jumping extends State {
    constructor(player) {
        super('JUMPING')
        this.player = player
    }
    enter() {
        this.player.maxFrame = 2
    }
    handleInput(input) {
        if (input === 'PRESS right') this.player.setState(states.RUNNING)
        else if (input === 'PRESS left') this.player.setState(states.RUNNING)
        else if (input === 'PRESS down') this.player.setState(states.ATTACK)
    }
}

export class Falling extends State {
    constructor(player) {
        super('FALLING')
        this.player = player
    }
    enter() {
        this.player.maxFrame = 2
    }
    handleInput(input) {
        if (input === 'PRESS right') this.player.setState(states.RUNNING)
        else if (input === 'PRESS left') this.player.setState(states.RUNNING)
        else if (input === 'PRESS down') this.player.setState(states.ATTACK)
    }
}

export class Hit extends State {
    constructor(player) {
        super('HIT')
        this.player = player
    }
    enter() {
        this.player.maxFrame = 3
    }
    handleInput(input) {
    }
}

export class Dead extends State {
    constructor(player) {
        super('DEAD')
        this.player = player
    }
    enter() {
        this.player.maxFrame = 4
    }
    handleInput(input) {
    }
}

export class Attack extends State {
    constructor(player) {
        super('ATTACK')
        this.player = player
    }
    enter() {
        this.player.maxFrame = 7
    }
    handleInput(input) {
        if (input === 'PRESS right') this.player.setState(states.RUNNING)
        else if (input === 'PRESS left') this.player.setState(states.RUNNING)
        else if (input === 'PRESS up') this.player.setState(states.JUMPING)
    }
}






export class Jumping extends State {
    constructor(player) {
        super('JUMPING')
        this.player = player
    }
    enter() {
        this.player.frameY = 2
        if (this.player.onGround()) this.player.vy -= 20
        this.player.speed = this.player.maxSpeed * 0.5
        this.player.maxFrame = 6
    }
    handleInput(input) {
        if (input === 'PRESS left') this.player.setState(states.JUMPING_LEFT)
        else if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT)
        else if (this.player.vy > 0) this.player.setState(states.FALLING_RIGHT)
    }
}

export class FallingLeft extends State {
    constructor(player) {
        super('FALLING left')
        this.player = player
    }
    enter() {
        this.player.frameY = 5
        this.player.maxFrame = 6
    }
    handleInput(input) {
        if (input === 'PRESS right') this.player.setState(states.FALLING_RIGHT)
        else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT)
    }
}
export class FallingRight extends State {
    constructor(player) {
        super('FALLING right')
        this.player = player
    }
    enter() {
        this.player.frameY = 4
        this.player.maxFrame = 6
    }
    handleInput(input) {
        if (input === 'PRESS left') this.player.setState(states.FALLING_LEFT)
        else if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT)
    }
}