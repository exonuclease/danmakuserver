import * as React from 'react';

function getBytesLength(str: string): number {
  return str.replace(/[^\x00-\xff]/g, 'xx').length;
}
interface DanmakuProps {
  msg: string;
  lockIndex?: number;
  index: number;
  lock?: (index: number) => void;
  releaseLock: (index: number) => void;
  removeMsg: (index: number) => void;
}
export default class Danmaku extends React.Component<DanmakuProps> {
  private lockIndex: number;
  private duration: number;
  private removetimeout: number;
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
    return (
      <span
        className="danmaku"
        key={0}
        style={{
          top: this.props.lockIndex * 20 + '%',
          animation: `move ${this.duration}ms linear`
        }}
      >
        <pre>{this.props.msg}</pre>
      </span>
    );
  }
}
