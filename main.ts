controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    let mySprite: Sprite = null
    duck.vy = -100
animation.runImageAnimation(
    duck,
    duckAnimationFrames,
    50,
    false
    )
})
game.onUpdate(function () {
    if (duck.top > scene.screenHeight()) {
        game.over(false)
    }
})
game.onUpdate(function () {
    if (duck.bottom < 0) {
        game.over(false)
    }
})
game.onUpdateInterval(2000,function() {
    let gapImage = image.create(1, scene.screenHeight())
    gapImage.fill(1)
    let gapSprite = sprites.create(gapImage, SpriteKind.Gap)
     gapSprite.setFlag(SpriteFlag.Invisible, true)
    gapSprite.vx = -45
    gapSprite.left = scene.screenWidth()
    let gapNumber = randint(0, 2)
    let topImage = obstacleTopImgs[gapNumber]
    let bottomImage = obstacleBottomImgs[gapNumber]
    let topSprite = sprites.create(topImage, SpriteKind.Enemy)
    let bottomSprite = sprites.create(bottomImage, SpriteKind.Enemy)

    topSprite.top = 0
    bottomSprite.bottom = scene.screenHeight()
    topSprite.left = 150
    bottomSprite.left = 150

    topSprite.vx = -45
    bottomSprite.vx = -45
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Gap, function(sprite: Sprite, otherSprite: Sprite) {
    info.changeScoreBy(1)
    otherSprite.setFlag(SpriteFlag.Ghost, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite: Sprite, otherSprite: Sprite) {
    game.over()
})