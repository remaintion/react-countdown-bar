import React, { PropTypes } from 'react';
import moment from 'moment';
const styles = {
  Topbar: {
    width: '100%',
    height: 42,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 30px',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 5,
  },
  unitContainer: {
    display: 'flex',
    flexDirection: 'row',
    color: '#fff',
  },
  separator: {
    alignItems: 'center',
    width: 40,
    fontSize: 14,
  },
};
const unitStyle = {
  container: {
    width: 60,
  },
  text: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 1,
  },
  unit: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 300,
  },
};
const Unit = props => (
  <div style={unitStyle.container}>
    <div style={unitStyle.text}>
      {props.text}
    </div>
    <div style={unitStyle.unit}>
      {props.unit}
    </div>
  </div>
);
Unit.propTypes = {
  text: PropTypes.number,
  unit: PropTypes.string,
};
const Separator = () => (
  <div style={styles.separator}>:</div>
);
class Topbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 99,
      hours: 99,
      minutes: 99,
      seconds: 99,
      isShow: true,
    };
    this.isMount = true;
  }
  componentDidMount() {
    if (!this.props.preview) {
      this.loadInterval = setInterval(this.setTime.bind(this), 1000);
    } else {
      document.body.style.paddingTop = '50px';
    }
  }
  componentWillUnmount() {
    this.isMount = false;
    this.loadInterval = false;
  }
  setTime() {
    if (this.isMount) {
      const isShow = moment().isBefore(moment(this.props.liveAt));
      const days = moment(this.props.liveAt).diff(moment(), 'days');
      const hours = moment(moment(this.props.liveAt).diff(moment())).format('HH');
      const minutes = moment(moment(this.props.liveAt).diff(moment())).format('mm');
      const seconds = moment(moment(this.props.liveAt).diff(moment())).format('ss');
      this.setState({ days, hours, minutes, seconds, isShow });
    }
  }
  render() {
    const style = {
      ...styles.Topbar,
      background: this.props.color,
    };
    if (this.props.liveAt) {
      style.top = 0;
      style.left = 0;
      style.right = 0;
      style.position = 'fixed';
      style.fontWeight = 600;
      if (!moment().isBefore(moment(this.props.liveAt))) {
        return <div></div>;
      }
    }
    return (
      <div style={style}>
        <div style={styles.text}>{this.props.text}</div>
        <div style={styles.unitContainer}>
          <Unit text={this.state.days} unit="DAYS" />
          <Separator />
          <Unit text={this.state.hours} unit="HOURS" />
          <Separator />
          <Unit text={this.state.minutes} unit="MINUTES" />
          <Separator />
          <Unit text={this.state.seconds} unit="SECONDS" />
        </div>
      </div>
    );
  }
}
Topbar.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  liveAt: PropTypes.string,
  preview: PropTypes.bool,
};

export default Topbar;
