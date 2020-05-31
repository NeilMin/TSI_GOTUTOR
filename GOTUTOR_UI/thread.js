var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import React from 'react';
document.addEventListener("DOMContentLoaded", function () {
    var Thread = function (_React$Component) {
        _inherits(Thread, _React$Component);

        function Thread(props) {
            _classCallCheck(this, Thread);

            props.key = props.content.id;
            return _possibleConstructorReturn(this, (Thread.__proto__ || Object.getPrototypeOf(Thread)).call(this, props));
        }

        _createClass(Thread, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "h4",
                        null,
                        this.props.content.title
                    ),
                    React.createElement(
                        "p",
                        null,
                        this.props.content.body
                    ),
                    React.createElement(
                        "p",
                        null,
                        "posted by ",
                        this.props.content.userId
                    )
                );
            }
        }]);

        return Thread;
    }(React.Component);

    var ThreadContainer = function (_React$Component2) {
        _inherits(ThreadContainer, _React$Component2);

        function ThreadContainer(props) {
            _classCallCheck(this, ThreadContainer);

            var _this2 = _possibleConstructorReturn(this, (ThreadContainer.__proto__ || Object.getPrototypeOf(ThreadContainer)).call(this, props));

            _this2.state = { threads: props.threads };
            return _this2;
        }

        _createClass(ThreadContainer, [{
            key: "addThread",
            value: function addThread(threadContent) {
                ;
                this.state.threads.unshift(threadContent);
                this.setState({
                    threads: this.state.threads
                });
            }
        }, {
            key: "render",
            value: function render() {
                return React.createElement(
                    "div",
                    null,
                    this.state.threads.map(function (x) {
                        return React.createElement(Thread, { key: x.id, content: x });
                    })
                );
            }
        }]);

        return ThreadContainer;
    }(React.Component);

    var socket = io.connect("http://gotutor.com:8080/forumThread");
    var threadList = document.getElementById('threads');
    socket.on("oldThread", function (data) {
        console.log(data);
        var container = ReactDOM.render(React.createElement(ThreadContainer, { threads: data }), threadList);
        var form = document.getElementById("new-thread");
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            socket.emit('newThread', { title: form.title.value, body: form.body.value });
        });
        socket.on("otherThread", function (data) {
            return container.addThread(data);
        });
    });
});