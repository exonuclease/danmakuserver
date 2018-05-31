import * as React from 'react';
import * as immutable from 'immutable';
import Danmaku from './Danmaku';
import SendDanmaku from './SendDanmaku';

interface DanmakusState {
  msgQueue: immutable.List<string>;
  locks: immutable.List<boolean>;
}
export default class Danmakus extends React.PureComponent<{}, DanmakusState> {
  private counter: number;
  private renderedIndex: number;
  private socket: WebSocket;
  constructor(props) {
    super(props);
    let locks: immutable.List<boolean> = immutable.List();
    for (let i = 0; i < 5; i++) {
      locks = locks.set(i, false);
    }
    this.state = { msgQueue: immutable.List(), locks };
    this.counter = 0;
    this.renderedIndex = -1;
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
  releaseLock(index: number) {
    this.setState({ locks: this.state.locks.set(index, false) });
  }
  lock(index: number) {
    this.setState({ locks: this.state.locks.set(index, true) });
  }
  removeMsg(index: number) {
    this.setState({ msgQueue: this.state.msgQueue.set(index, '') });
  }
  render() {
    const itemList = [];
    let locks = this.state.locks;
    this.state.msgQueue.map((msg, i) => {
      if (msg) {
        if (i > this.renderedIndex) {
          for (let j = 0; j < locks.size; j++) {
            if (!locks.get(j)) {
              locks = locks.set(j, true);
              this.renderedIndex = i;
              itemList.push(
                <Danmaku
                  msg={msg}
                  removeMsg={this.removeMsg}
                  lock={this.lock}
                  releaseLock={this.releaseLock}
                  lockIndex={j}
                  key={i}
                  index={i}
                />
              );
              break;
            }
          }
        } else {
          itemList.push(
            <Danmaku
              msg={msg}
              removeMsg={this.removeMsg}
              releaseLock={this.releaseLock}
              key={i}
              index={i}
            />
          );
        }
      }
    });
    return (
      <div id="example">
        {itemList}
        <SendDanmaku socket={this.socket} />
      </div>
    );
  }
}
