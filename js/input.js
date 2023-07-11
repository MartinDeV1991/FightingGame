window.addEventListener('keydown', (event) => {
    if (!player.dead) {
        switch (event.key) {
            case 'd':
                player.right = true
                player.lastAction = 'right'
                break
            case 'a':
                player.left = true
                player.lastAction = 'left'
                break
            case 'w':
                if (player.inAir === false) player.velocity.y = -20
                break
            case ' ':
                player.attack()
                break
        }
    }
    if (!enemy.dead) {
        switch (event.key) {
            case 'ArrowRight':
                enemy.right = true
                enemy.lastAction = 'right'
                break
            case 'ArrowLeft':
                enemy.left = true
                enemy.lastAction = 'left'
                break
            case 'ArrowUp':
                if (enemy.inAir === false) enemy.velocity.y = -20
                break
            case 'ArrowDown':
                enemy.attack()
                break
        }
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            player.right = false
            break
        case 'a':
            player.left = false
            break
    }

    switch (event.key) {
        case 'ArrowRight':
            enemy.right = false
            break
        case 'ArrowLeft':
            enemy.left = false
            break
    }
})