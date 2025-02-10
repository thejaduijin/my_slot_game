let payTableOverlay = null; // Store globally

export function showPayTable(app) {
    if (!app) {
        console.error("Error: PIXI app instance is undefined.");
        return;
    }

    if (!payTableOverlay) {
        payTableOverlay = new PIXI.Container();
        app.stage.addChild(payTableOverlay);

        const bg = new PIXI.Graphics();
        bg.beginFill(0x000000, 0.8);
        bg.drawRect(0, 0, app.screen.width, app.screen.height);
        bg.endFill();
        payTableOverlay.addChild(bg);

        const text = new PIXI.Text(
            "Paytable\n\n3 Symbols: 5x\n4 Symbols: 10x\n5 Symbols: 20x",
            {
                fill: 0xffffff,
                fontSize: 24,
                align: "center"
            }
        );
        text.anchor.set(0.5);
        text.x = app.screen.width / 2;
        text.y = app.screen.height / 2;
        payTableOverlay.addChild(text);

        // Click to close
        bg.interactive = true;
        bg.buttonMode = true;
        bg.on("pointerdown", () => {
            payTableOverlay.visible = false;
        });
    }

    payTableOverlay.visible = !payTableOverlay.visible;
}
