import { showPayTable } from "./paytable.js";

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: { fill: new PIXI.FillGradient(0, 0, 0, 36 * 1.7).addColorStop(0, 0xffffff).addColorStop(1, 0x00ff99) },
    stroke: { color: 0x4a1850, width: 5 },
    dropShadow: {
        color: 0x000000,
        angle: Math.PI / 6,
        blur: 4,
        distance: 6,
    },
    wordWrap: true,
    wordWrapWidth: 440,
});

export function setupUI(app, startPlay) {
    const playText = new PIXI.Text("Click For Spin",style);
    playText.y = 600;
    playText.x = 300;
    playText.eventMode = "static";
    playText.cursor = "pointer";
    playText.on("pointerdown", () => startPlay(app));
    app.stage.addChild(playText);

    const payTableButton = new PIXI.Text("PayTable", style);
    payTableButton.y = 600;
    payTableButton.eventMode = "static";
    payTableButton.cursor = "pointer";
    payTableButton.on("pointerdown", () => showPayTable(app));
    app.stage.addChild(payTableButton);
}
