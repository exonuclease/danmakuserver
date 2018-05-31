"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function getBytesLength(str) {
    return str.replace(/[^\x00-\xff]/g, 'xx').length;
}
class Danmaku extends React.Component {
    constructor(props) {
        super(props);
        this.lockIndex = 0;
        this.duration =
            (8 * getBytesLength(this.props.msg) * 1.1 + window.innerWidth) / 0.15;
        this.removetimeout =
            (8 * getBytesLength(this.props.msg) * 1.05 + window.innerWidth) / 0.15;
    }
    componentDidMount() {
        this.lockIndex = this.props.lockIndex;
        const time = Math.floor(8 * getBytesLength(this.props.msg) / 0.15 + 200);
        this.props.lock(this.props.lockIndex);
        setTimeout(() => {
            this.props.releaseLock(this.lockIndex);
        }, time);
        setTimeout(() => {
            this.props.removeMsg(this.props.index);
        }, this.duration);
    }
    shouldComponentUpdate(nextProps) {
        return !nextProps.lockIndex && nextProps.msg;
    }
    render() {
        return (React.createElement("span", { className: "danmaku", key: 0, style: {
                top: this.props.lockIndex * 20 + '%',
                animation: `move ${this.duration}ms linear`
            } },
            React.createElement("pre", null, this.props.msg)));
    }
}
exports.default = Danmaku;
//# sourceMappingURL=Danmaku.js.map