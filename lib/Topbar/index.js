'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  Topbar: {
    width: '100%',
    height: 42,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 30px',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 5
  },
  unitContainer: {
    display: 'flex',
    flexDirection: 'row',
    color: '#fff'
  },
  separator: {
    alignItems: 'center',
    width: 40,
    fontSize: 14
  }
};
var unitStyle = {
  container: {
    width: 60
  },
  text: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 1
  },
  unit: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 300
  }
};
var Unit = function Unit(props) {
  return _react2.default.createElement(
    'div',
    { style: unitStyle.container },
    _react2.default.createElement(
      'div',
      { style: unitStyle.text },
      props.text
    ),
    _react2.default.createElement(
      'div',
      { style: unitStyle.unit },
      props.unit
    )
  );
};
Unit.propTypes = {
  text: _react.PropTypes.number,
  unit: _react.PropTypes.string
};
var Separator = function Separator() {
  return _react2.default.createElement(
    'div',
    { style: styles.separator },
    ':'
  );
};

var Topbar = function (_React$Component) {
  _inherits(Topbar, _React$Component);

  function Topbar(props) {
    _classCallCheck(this, Topbar);

    var _this = _possibleConstructorReturn(this, (Topbar.__proto__ || Object.getPrototypeOf(Topbar)).call(this, props));

    _this.state = {
      days: 99,
      hours: 99,
      minutes: 99,
      seconds: 99,
      isShow: true
    };
    _this.isMount = true;
    return _this;
  }

  _createClass(Topbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.preview) {
        this.loadInterval = setInterval(this.setTime.bind(this), 1000);
      }
      document.body.style.paddingTop = '50px';
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.isMount = false;
      this.loadInterval = false;
    }
  }, {
    key: 'setTime',
    value: function setTime() {
      if (this.isMount) {
        var isShow = (0, _moment2.default)().isBefore((0, _moment2.default)(this.props.liveAt));
        var days = (0, _moment2.default)(this.props.liveAt).diff((0, _moment2.default)(), 'days');
        var hours = (0, _moment2.default)((0, _moment2.default)(this.props.liveAt).diff((0, _moment2.default)())).format('HH');
        var minutes = (0, _moment2.default)((0, _moment2.default)(this.props.liveAt).diff((0, _moment2.default)())).format('mm');
        var seconds = (0, _moment2.default)((0, _moment2.default)(this.props.liveAt).diff((0, _moment2.default)())).format('ss');
        this.setState({ days: days, hours: hours, minutes: minutes, seconds: seconds, isShow: isShow });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var style = _extends({}, styles.Topbar, {
        background: this.props.color
      });
      if (this.props.liveAt) {
        style.top = 0;
        style.left = 0;
        style.right = 0;
        style.position = 'fixed';
        style.fontWeight = 600;
        if (!(0, _moment2.default)().isBefore((0, _moment2.default)(this.props.liveAt))) {
          return _react2.default.createElement('div', null);
        }
      }
      return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement(
          'div',
          { style: styles.text },
          this.props.text
        ),
        _react2.default.createElement(
          'div',
          { style: styles.unitContainer },
          _react2.default.createElement(Unit, { text: this.state.days, unit: 'DAYS' }),
          _react2.default.createElement(Separator, null),
          _react2.default.createElement(Unit, { text: this.state.hours, unit: 'HOURS' }),
          _react2.default.createElement(Separator, null),
          _react2.default.createElement(Unit, { text: this.state.minutes, unit: 'MINUTES' }),
          _react2.default.createElement(Separator, null),
          _react2.default.createElement(Unit, { text: this.state.seconds, unit: 'SECONDS' })
        )
      );
    }
  }]);

  return Topbar;
}(_react2.default.Component);

Topbar.propTypes = {
  text: _react.PropTypes.string,
  color: _react.PropTypes.string,
  liveAt: _react.PropTypes.string,
  preview: _react.PropTypes.bool
};

exports.default = Topbar;