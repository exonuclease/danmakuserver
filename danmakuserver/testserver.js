"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws = require("ws");
const WebSocketServer = ws.Server;
const wss = new WebSocketServer({ port: 12000 });
console.log('Server is working');
wss.on('connection', ws => {
    const danmakus = [
        '测试弹幕111111111111',
        '测试弹幕22222222222222222222222222222',
        '测试弹幕333',
        '测试弹幕444444444444444444',
        '测试弹幕55555555',
        '测试弹幕666666666666666666666',
        '测试弹幕7777777777777',
        '测试弹幕88888888888888888888888888888888888',
        '测试弹幕6666666666666666666666',
        '测试弹幕7777777777777',
        '测试弹幕22222222222222222222222222222',
        '测试弹幕333',
        '测试弹幕444444444444444444',
        '测试弹幕55555555',
        '测试弹幕6666666666666666666666'
    ];
    let counter = 0;
    const timer = setInterval(() => {
        counter++;
        if (counter > 30) {
            clearInterval(timer);
        }
        const msg = new Array(Math.round(Math.random() * 30)).join('弹幕');
        ws.send(msg + counter);
    }, 200);
    console.log('connected');
});
//# sourceMappingURL=testserver.js.map