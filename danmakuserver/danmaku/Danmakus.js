"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const immutable = require("immutable");
const Danmaku_1 = require("./Danmaku");
const SendDanmaku_1 = require("./SendDanmaku");
class Danmakus extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { msgQueue: immutable.List(), locks: immutable.List() };
        this.counter = 0;
        this.renderedIndex = -1;
        for (let i = 0; i < 5; i++) {
            this.state.locks = this.state.locks.set(i, false);
        }
        this.lock = this.lock.bind(this);
        this.releaseLock = this.releaseLock.bind(this);
        this.removeMsg = this.removeMsg.bind(this);
    }
    componentDidMount() {
        const socket = new WebSocket('ws://127.0.0.1:12000');
        socket.onmessage = e => {
            this.setState({ msgQueue: this.state.msgQueue.push(e.data) });
        };
    }
    releaseLock(index) {
        this.setState({ locks: this.state.locks.set(index, false) });
    }
    lock(index) {
        this.setState({ locks: this.state.locks.set(index, true) });
    }
    removeMsg(index) {
        this.setState({ msgQueue: this.state.msgQueue.set(index, '') });
    }
    render() {
        const itemList = [];
        let locks = this.state.locks.slice(0);
        this.state.msgQueue.map((msg, i) => {
            if (msg) {
                if (i > this.renderedIndex) {
                    for (let j = 0; j < locks.size; j++) {
                        if (!locks.get(j)) {
                            locks = locks.set(j, true);
                            this.renderedIndex = i;
                            itemList.push(React.createElement(Danmaku_1.default, { msg: msg, removeMsg: this.removeMsg, lock: this.lock, releaseLock: this.releaseLock, lockIndex: j, key: i, index: i }));
                            break;
                        }
                    }
                }
                else {
                    itemList.push(React.createElement(Danmaku_1.default, { msg: msg, removeMsg: this.removeMsg, releaseLock: this.releaseLock, key: i, index: i }));
                }
            }
        });
        return (React.createElement("div", { id: "example" },
            itemList,
            React.createElement(SendDanmaku_1.default, { socket: this.socket })));
    }
}
exports.default = Danmakus;
//# sourceMappingURL=Danmakus.js.map