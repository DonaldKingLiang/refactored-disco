// 使用一个立即执行函数包裹所有代码，避免污染全局环境
(function() {
    // ---------------------------------------------------------------
    // 第一部分：创建并设置 Canvas 背景 (交互模式)
    // ---------------------------------------------------------------
    const canvas = document.createElement('canvas');
    canvas.id = 'fluid-background'; // 给 canvas 一个 id

    // 设置 canvas 的样式，使其成为一个固定的背景
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1; 
    `;

    // 将 canvas 添加到页面的最前面，这样它就会在 DOM 结构的最底层
    document.body.insertBefore(canvas, document.body.firstChild);

    // ---------------------------------------------------------------
    // 第二部分：完整的“流体模拟”代码
    // 请将你之前获得的完整流体模拟代码粘贴到下方指定区域
    // ---------------------------------------------------------------

    // ▼▼▼ 从这里开始粘贴 ▼▼▼

    'use strict';
    // ... 
    // ... 在这里粘贴完整的流体模拟代码 ...
    // ... 
    
    // ▲▲▲ 粘贴到这里结束 ▲▲▲

    // ---------------------------------------------------------------
    // 第三部分：关键修改 - 将事件监听绑定到 window 对象
    // 确保流体模拟代码原来的 canvas.addEventListener 部分被下面的代码替换
    // ---------------------------------------------------------------
    
    window.addEventListener('mousedown', function (e) {
        let posX = scaleByPixelRatio(e.offsetX);
        let posY = scaleByPixelRatio(e.offsetY);
        let pointer = pointers.find(function (p) { return p.id == -1; });
        if (pointer == null) {
            pointer = new pointerPrototype();
        }
        updatePointerDownData(pointer, -1, posX, posY);
    });

    window.addEventListener('mousemove', function (e) {
        let pointer = pointers[0];
        if (!pointer.down) { return; }
        let posX = scaleByPixelRatio(e.offsetX);
        let posY = scaleByPixelRatio(e.offsetY);
        updatePointerMoveData(pointer, posX, posY);
    });

    window.addEventListener('mouseup', function () {
        updatePointerUpData(pointers[0]);
    });

    window.addEventListener('touchstart', function (e) {
        e.preventDefault();
        let touches = e.targetTouches;
        while (touches.length >= pointers.length) {
            pointers.push(new pointerPrototype());
        }
        for (let i = 0; i < touches.length; i++) {
            let posX = scaleByPixelRatio(touches[i].pageX);
            let posY = scaleByPixelRatio(touches[i].pageY);
            updatePointerDownData(pointers[i + 1], touches[i].identifier, posX, posY);
        }
    });

    window.addEventListener('touchmove', function (e) {
        e.preventDefault();
        let touches = e.targetTouches;
        for (let i = 0; i < touches.length; i++) {
            let pointer = pointers[i + 1];
            if (!pointer.down) { continue; }
            let posX = scaleByPixelRatio(touches[i].pageX);
            let posY = scaleByPixelRatio(touches[i].pageY);
            updatePointerMoveData(pointer, posX, posY);
        }
    }, false);

})(); // 立即执行函数结束
