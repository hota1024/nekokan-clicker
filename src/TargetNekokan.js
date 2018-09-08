export default (core) => {
    let targetNekokan = new Sprite(600, 600)
    targetNekokan.image = core.assets['assets/neko-kan.png']
    targetNekokan.x = 0
    targetNekokan.y = -64
    targetNekokan.scaleX = 0.2
    targetNekokan.scaleY = 0.2

    return targetNekokan
}