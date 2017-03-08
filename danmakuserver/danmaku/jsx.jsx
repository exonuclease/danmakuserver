var React = require('react');
var ReactDOM = require('react-dom');
var CSSTransitionGroup = require('react-addons-css-transition-group');
class Danmaku extends React.Component {
    constructor(props) {
        super(props);
        this.duration = 0;
    }
    getBytesLength(str) {
        return str.replace(/[^\x00-\xff]/g, 'xx').length;
    }
    componentWillMount() {
        this.duration = (8 * this.getBytesLength((this.props.msg)) + window.innerWidth) / 150;
    }
    componentDidMount() {
        var time = Math.floor((8 * this.getBytesLength(this.props.msg)) / 0.15 + 200);
        if (this.props.lock) {
            this.props.lock(this.props.lockIndex);
            setTimeout(() => {
                this.props.releaseLock(this.props.lockIndex);
            }, time)
            setTimeout(() => {
                this.props.removeMsg(this.props.index);
            }, this.duration * 1000 + 200)
        }
    }
    render() {
        return <span className='danmaku' key={0} style={{ 'top': this.props.lockIndex * 20 + '%', 'animation': `move ${this.duration}s linear`, } }><pre>{this.props.msg}</pre></span>
    }
}
class SendDanmaku extends React.Component {
    render() {
        return <input type="text" onChange={this.handlechange} onKeyPress={this.handlekeypress} />
    }
    constructor(props) {
        super(props);
        this.state = { value: '' }
    }
    handleChange(e) {
        this.setState({ value: e.target.value });
    }
    handleKeypress(e) {
        if (e.keyCode === 13) {
            this.props.socket.send(this.state.value);
        }
    }
}
class Danmakus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { locks: [], }
        this.counter = 0;
        this.locks = [];
        this.msgQueue = [];
        this.renderedFlags = [];
        this.lockIndexs = [];
        this.renderFlag = true;
        for (var i = 0; i < 5; i++) {
            this.state.locks[i] = false;
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (!this.renderFlag) {
            return false;
        }
        if (this.renderedFlags[this.renderedFlags.length - 1] !== false) {
            return false;
        }
        else
            return true;
    }
    componentDidMount() {
        var socket = new WebSocket('ws://127.0.0.1:12000');
        socket.onmessage = (e) => {
            this.msgQueue.push(e.data);
            this.renderedFlags.push(false);
            for (var lock of this.state.locks) {
                if (!lock) {
                    this.forceUpdate();
                    break;
                }
            }

        }
    }
    componentWillMount() {
        this.removeMsg = this.removeMsg.bind(this);
        this.releaseLock = this.releaseLock.bind(this);
        this.lock = this.lock.bind(this);
    }
    releaseLock(index) {
        this.renderFlag = true;
        var tempLocks = this.state.locks.concat();
        tempLocks[index] = false;
        this.setState({ locks: tempLocks });
    }
    lock(index) {
        this.renderFlag = false;
        var tempLocks = this.state.locks.concat();
        tempLocks[index] = true;
        this.setState({ locks: tempLocks });
    }
    removeMsg(index) {
        delete this.msgQueue[index];
        delete this.renderedFlags[index];
        this.forceUpdate();
    }
    render() {
        var itemList = [];
        var locks = [];
        this.msgQueue.map((msg, i) => {
            if (this.renderedFlags[i] === true) {
                itemList.push(<Danmaku msg={msg} removeMsg={this.removeMsg} releaseLock={this.releaseLock} lockIndex={this.lockIndexs[i]} key={i} index={i } />);
            }
            else if (this.renderedFlags[i] === false) {
                for (var j in this.state.locks) {
                    if (!this.state.locks[j] && locks.indexOf(j) === -1) {
                        locks.push(j);
                        this.renderedFlags[i] = true;
                        this.lockIndexs.push(j);
                        itemList.push(<Danmaku msg={msg} removeMsg={this.removeMsg} lock={this.lock} releaseLock={this.releaseLock} lockIndex={j} key={i} index={i } />);
                        break;
                    }
                }
            }
        }, this);
        return (
                <div id='example'>
                    { itemList}
                </div>);
    }
}
ReactDOM.render(
    <div className='example'>
    <Danmakus />
    <SendDanmaku />
    </div>, document.getElementById('example1'))