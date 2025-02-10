import { createReels, spinReels } from "./reels.js";

export async function initGame() {
    const app = new PIXI.Application();
    await app.init({
        background: '#1099bb',
        resizeTo: window,
        resolution: window.devicePixelRatio || 1,
        antialias: true,
    });

    document.body.appendChild(app.view);

    app.view.style.position = "absolute";
    app.view.style.top = "0";
    app.view.style.left = "0";
    app.view.style.width = "100vw";
    app.view.style.height = "100vh";

    // Resize handling (extra safeguard)
    window.addEventListener("resize", () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });


    // Initialize assets
    await PIXI.Assets.init({ manifest: "../public/manifest.json" });
    let textures = await PIXI.Assets.loadBundle("symbols");

    // Create reels using the loaded textures
    const reels = createReels(app, textures);

    return { app, reels };
}

export function startPlay(reels, app, textures) {
    spinReels(reels, app, textures);

}
