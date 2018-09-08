import './lib/enchant'
import AssetsLoad from './assets'
import TargetNekokan from './TargetNekokan'
import Nekokan from './Nekokan'

Math.clamp = (value, min, max) => {
    return Math.min(Math.max(min, value), max)
}

enchant()

function main (core) {
    let GameScene = new Scene()
    GameScene.backgroundColor = 'burlywood'

    let nekokanCount = 0
    let nekokanList = []
    let targetNekokan = TargetNekokan(core)
    let labelNekokan = new Sprite(600, 600)
    labelNekokan.image = core.assets['assets/neko-kan.png']
    labelNekokan.scale(0.1, 0.1)
    labelNekokan.x = -260
    labelNekokan.y = -260
    GameScene.addChild(labelNekokan)
    let batuLabel = new Sprite(120, 120)
    batuLabel.image = core.assets['assets/batu.png']
    batuLabel.scale(0.2, 0.2)
    batuLabel.x = 30
    batuLabel.y = -17
    GameScene.addChild(batuLabel)
    let nekokanCountLabel = new Label()
    nekokanCountLabel.font = '34px "Yama"'
    nekokanCountLabel.text = nekokanCount.toString()
    nekokanCountLabel.x = 110
    nekokanCountLabel.y = 26
    GameScene.addChild(nekokanCountLabel)

    // Neko
    let cat = new Sprite(600, 600)
    cat.image = core.assets['assets/neko1.png']
    cat.x = 0
    cat.y = 0
    cat.level = 0
    cat.getNextLevelNekokan = () => (cat.level + 1) * 25
    cat.angle = Math.random() * Math.PI * 2
    cat.scale(0.3, 0.3)
    GameScene.addChild(cat)

    let levelUpLabel = new Label()
    levelUpLabel.textAlign = 'center'
    levelUpLabel.font = '34px "Yama"'
    levelUpLabel.x = 150
    levelUpLabel.y = 350
    GameScene.addChild(levelUpLabel)

    let giveButton = new Sprite(960, 720)
    giveButton.image = core.assets['assets/give.png']
    giveButton.scale(0.7, 0.7)
    giveButton.x = -190
    giveButton.y = 90
    GameScene.addChild(giveButton)
    
    
    targetNekokan.addEventListener('touchstart', () => {
        nekokanCount++
        let nekokan = Nekokan(core)
        nekokanList.push(nekokan)
        GameScene.addChild(nekokan)
    })
    
    giveButton.addEventListener('touchstart', () => {
        if (nekokanCount < cat.getNextLevelNekokan()) return
        nekokanCount -= cat.getNextLevelNekokan()
        cat.level++
    })

    nekokanCountLabel.addEventListener('enterframe', () => {
        nekokanCountLabel.text = nekokanCount.toString()
    })

    levelUpLabel.addEventListener('enterframe', () => {
        levelUpLabel.text = `ねこかんを「${cat.getNextLevelNekokan()}」個あげますか？`
    })

    cat.addEventListener('enterframe', () => {
        const move = () => {
            cat.x += Math.cos(cat.angle) * 3
            cat.y += Math.sin(cat.angle) * 3
        }

        move()

        if (cat.age % 40 == 0)
        {
            nekokanCount += cat.level
        }

        if (Math.floor(Math.random() * 200) === 0)
        {
            cat.angle = Math.random() * Math.PI * 2
        }

        while (cat.x <= -230 || cat.x >= 270 || cat.y >= 127 || cat.y <= -242)
        {
            cat.x = Math.clamp(cat.x, -230, 270)
            cat.y = Math.clamp(cat.y, -242, 127)
            cat.angle = Math.random() * Math.PI * 2
            move()
        }
    })


    GameScene.addChild(targetNekokan)
    core.pushScene(GameScene)
}

window.onload = () => {
    let core = new Core(640, 480)
    AssetsLoad(core)
    core.onload = function () {
        main(core)
    }
    core.start()

    window.c = core
}