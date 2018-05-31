"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class SendDanmaku extends React.PureComponent {
    handleChange(e) {
        this.setState({ value: e.target.value });
    }
    handleKeypress(e) {
        if (e.keyCode === 13) {
            this.props.socket.send(this.state.value);
        }
    }
    render() {
        return (React.createElement("input", { className: "senddanmaku", type: "text", onChange: this.handleChange, onKeyPress: this.handleKeypress }));
    }
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }
}
exports.default = SendDanmaku;
//# sourceMappingURL=SendDanmaku.js.map