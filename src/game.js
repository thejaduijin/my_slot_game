import { createReels, spinReels } from "./reels.js";

export async function initGame() {
    const app = new PIXI.Application();
    await app.init({ background: '#1099bb', resizeTo: window  });

    document.body.appendChild(app.view);
    app.view.style.position = "absolute"

    // Initialize assets
    await PIXI.Assets.init({ manifest: "../public/manifest.json" });
    let textures = await PIXI.Assets.loadBundle("symbols");

    // Create reels using the loaded textures
    const reels = createReels(app, textures);

    return { app, reels };
}

export function startPlay(reels,app ,textures) {
    spinReels(reels,app,textures);
    
}
