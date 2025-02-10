const tweening = [];

export function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
    const tween = {
        object,
        property,
        propertyBeginValue: object[property],
        target,
        easing,
        time,
        change: onchange,
        complete: oncomplete,
        start: Date.now(),
    };
    tweening.push(tween);
    return tween;
}

export function updateTweens(app) {
    app.ticker.add(() => {
        const now = Date.now();
        const remove = [];
        tweening.forEach(t => {
            const phase = Math.min(1, (now - t.start) / t.time);
            t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
            if (t.change) t.change(t);
            if (phase === 1) {
                t.object[t.property] = t.target;
                if (t.complete) t.complete(t);
                remove.push(t);
            }
        });
        remove.forEach(t => tweening.splice(tweening.indexOf(t), 1));
    });
}

function lerp(a, b, t) {
    return a * (1 - t) + b * t;
}
