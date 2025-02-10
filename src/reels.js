import { tweenTo, updateTweens } from "./tween.js";

const REEL_WIDTH = 160;
const SYMBOL_SIZE = 150;

export function createReels(app, textures) {
    const container = new PIXI.Container();
    app.stage.addChild(container);

    const symbolKeys = Object.keys(textures);
    const reels = [];

    for (let i = 0; i < 5; i++) {
        reels.push(createReel(i, container, symbolKeys, textures));
    }

    // Make the reels container responsive
    function resizeReels() {
        const scaleFactor = Math.min(
            window.innerWidth / (5 * REEL_WIDTH), // Scale based on width
            window.innerHeight / (4 * SYMBOL_SIZE) // Scale based on height
        );

        container.scale.set(scaleFactor);
        container.x = (window.innerWidth - (5 * REEL_WIDTH * scaleFactor)) / 2;
        container.y = (window.innerHeight - (3 * SYMBOL_SIZE * scaleFactor)) / 2;
    }

    // Initial positioning and resize on window change
    resizeReels();
    window.addEventListener("resize", resizeReels);

    return reels;
}


function createReel(x, container, symbolKeys, textures) {
    const rc = new PIXI.Container();
    rc.x = x * REEL_WIDTH;
    container.addChild(rc);

    // Create a mask for the reel
    const mask = new PIXI.Graphics();
    mask.beginFill(0x000000);
    mask.drawRect(0, 0, REEL_WIDTH, SYMBOL_SIZE * 3);
    mask.endFill();
    mask.x = rc.x; // Align with the reel container
    container.addChild(mask);
    rc.mask = mask;

    const reel = {
        container: rc,
        symbols: [],
        position: 0,
        previousPosition: 0,
        blur: new PIXI.BlurFilter(),
    };

    reel.blur.blurX = 0;
    reel.blur.blurY = 0;
    rc.filters = [reel.blur];

    for (let j = 0; j < 4; j++) {  // Extra symbol for smooth looping
        const symbol = symbolKeys[Math.floor(Math.random() * symbolKeys.length)];
        const texture = textures[symbol];
        const sprite = new PIXI.Sprite(texture);
        sprite.y = j * SYMBOL_SIZE;
        sprite.scale.set(Math.min(SYMBOL_SIZE / sprite.width, SYMBOL_SIZE / sprite.height));
        sprite.x = Math.round((SYMBOL_SIZE - sprite.width) / 2);
        reel.symbols.push(sprite);
        rc.addChild(sprite);
    }

    return reel;
}

function reelsComplete() {
    console.log("All reels stopped!");
}

function backout(amount) {
    return t => --t * t * ((amount + 1) * t + amount) + 1;
}

export function spinReels(reels, app, textures) {
    reels.forEach((reel, i) => {
        const extra = Math.floor(Math.random() * 3);
        const target = reel.position + 10 + i * 5 + extra;
        const time = 2500 + i * 600 + extra * 600;

        tweenTo(reel, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
    });

    app.ticker.add(() => {
        reels.forEach(reel => {
            reel.blur.blurY = (reel.position - reel.previousPosition) * 8;
            reel.previousPosition = reel.position;

            reel.symbols.forEach((symbol, j) => {
                let newY = ((reel.position + j) % reel.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
                if (symbol.y < 0 && newY > SYMBOL_SIZE) {
                    let symbolKey = Object.keys(textures)[Math.floor(Math.random() * Object.keys(textures).length)];
                    symbol.texture = textures[symbolKey];
                    symbol.scale.set(Math.min(SYMBOL_SIZE / symbol.texture.width, SYMBOL_SIZE / symbol.texture.height));
                    symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
                }
                symbol.y = newY;
            });
        });

        updateTweens(app);
    });
}
