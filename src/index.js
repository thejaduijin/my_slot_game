import { setupUI } from "./ui.js";
import { initGame,startPlay } from "./game.js";

async function start() {
    console.log("started")
    const { app, reels } = await initGame();
    setupUI(app, () => startPlay(reels ,app));
}

start();
