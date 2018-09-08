export default (core) => {
    let nekokan = new Sprite(600, 600)
    nekokan.image = core.assets['assets/neko-kan.png']
    nekokan.scale(0.1, 0.1)
    nekokan.x = 0
    nekokan.y = -64
    nekokan.opacity = 1
    nekokan.angle = Math.random() * Math.PI * 2
    nekokan.addEventListener('enterframe', function () {
        nekokan.x += Math.cos(nekokan.angle) * 10
        nekokan.y += Math.sin(nekokan.angle) * 10
        nekokan.opacity = 1 - nekokan.age / 15
        if (nekokan.opacity === 0)
        {
            nekokan.parentNode.removeChild(nekokan)
        }
    })
    return nekokan
}