import * as React from 'react';

interface SendDanmakuProp {
  socket: WebSocket;
}
interface SendDanmakuState {
  value: string;
}
export default class SendDanmaku extends React.PureComponent<
  SendDanmakuProp,
  SendDanmakuState
> {
  private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: e.target.value });
  }
  private handleKeypress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13) {
      this.props.socket.send(this.state.value);
    }
  }
  render() {
    return (
      <input
        className="senddanmaku"
        type="text"
        onChange={this.handleChange}
        onKeyPress={this.handleKeypress}
      />
    );
  }
  public constructor(props) {
    super(props);
    this.state = { value: '' };
  }
}
