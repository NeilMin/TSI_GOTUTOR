var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import React from 'react';
document.addEventListener("DOMContentLoaded", function () {
    var Reply = function (_React$Component) {
        _inherits(Reply, _React$Component);

        function Reply() {
            _classCallCheck(this, Reply);

            return _possibleConstructorReturn(this, (Reply.__proto__ || Object.getPrototypeOf(Reply)).apply(this, arguments));
        }

        _createClass(Reply, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    "div",
                    { className: "reply" },
                    React.createElement(
                        "p",
                        null,
                        this.props.reply
                    ),
                    React.createElement(
                        "p",
                        null,
                        "By ",
                        this.props.userId
                    )
                );
            }
        }]);

        return Reply;
    }(React.Component);

    var ThreadRepliesContainer = function (_React$Component2) {
        _inherits(ThreadRepliesContainer, _React$Component2);

        function ThreadRepliesContainer(props) {
            _classCallCheck(this, ThreadRepliesContainer);

            var _this2 = _possibleConstructorReturn(this, (ThreadRepliesContainer.__proto__ || Object.getPrototypeOf(ThreadRepliesContainer)).call(this, props));

            _this2.repliesInit = _this2.repliesInit.bind(_this2);
            _this2.state = { replies: [], newReplyVal: "" };
            _this2.handleReplyInputChange = _this2.handleReplyInputChange.bind(_this2);
            _this2.handleReplyInput = _this2.handleReplyInput.bind(_this2);
            _this2.handleOtherReply = _this2.handleOtherReply.bind(_this2);
            props.replySocket.emit('fetch', props.threadId, _this2.repliesInit);
            props.replySocket.on("otherReply", _this2.handleOtherReply);
            return _this2;
        }

        _createClass(ThreadRepliesContainer, [{
            key: "repliesInit",
            value: function repliesInit(res) {
                this.setState({ replies: res });
            }
        }, {
            key: "handleOtherReply",
            value: function handleOtherReply(res) {
                this.state.replies.unshift(res);
                this.setState({ replies: this.state.replies });
            }
        }, {
            key: "handleReplyInputChange",
            value: function handleReplyInputChange(event) {
                this.setState({ newReplyVal: event.target.value });
            }
        }, {
            key: "handleReplyInput",
            value: function handleReplyInput(event) {
                event.preventDefault();
                if (this.state.newReplyVal.length != 0) {
                    this.props.replySocket.emit('newReply', { threadId: this.props.threadId, reply: this.state.newReplyVal });
                }
            }
        }, {
            key: "render",
            value: function render() {
                return React.createElement(
                    "div",
                    { className: "replyMain" },
                    this.state.replies.map(function (x) {
                        return React.createElement(Reply, { key: x.id, reply: x.reply, userId: x.userId });
                    }),
                    React.createElement(
                        "form",
                        { className: "newReply", onSubmit: this.handleReplyInput },
                        React.createElement(
                            "label",
                            null,
                            "New Reply"
                        ),
                        React.createElement("input", { type: "text", value: this.state.newReplyVal, onChange: this.handleReplyInputChange }),
                        React.createElement("input", { type: "submit", value: "Post reply", className: this.state.newReplyVal.length != 0 ? "buttons" : "buttonDisabled" })
                    )
                );
            }
        }]);

        return ThreadRepliesContainer;
    }(React.Component);

    var Thread = function (_React$Component3) {
        _inherits(Thread, _React$Component3);

        function Thread(props) {
            _classCallCheck(this, Thread);

            var _this3 = _possibleConstructorReturn(this, (Thread.__proto__ || Object.getPrototypeOf(Thread)).call(this, props));

            _this3.state = { expanded: false };
            _this3.toggleExpand = _this3.toggleExpand.bind(_this3);
            return _this3;
        }

        _createClass(Thread, [{
            key: "toggleExpand",
            value: function toggleExpand() {
                this.setState({ expanded: !this.state.expanded });
            }
        }, {
            key: "render",
            value: function render() {
                return React.createElement(
                    "div",
                    { className: "wholeThread" },
                    React.createElement(
                        "div",
                        { className: "threadMain", onClick: this.toggleExpand },
                        React.createElement(
                            "h4",
                            null,
                            "Title: ",
                            this.props.content.title
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Body: ",
                            this.props.content.body
                        ),
                        React.createElement(
                            "p",
                            null,
                            "posted by ",
                            this.props.content.userId
                        )
                    ),
                    this.state.expanded ? React.createElement(ThreadRepliesContainer, { threadId: this.props.content.id, replySocket: io.connect("http://gotutor.com/forumReply") }) : React.createElement("div", { className: "replyContainer" })
                );
            }
        }]);

        return Thread;
    }(React.Component);

    var ThreadContainer = function (_React$Component4) {
        _inherits(ThreadContainer, _React$Component4);

        function ThreadContainer(props) {
            _classCallCheck(this, ThreadContainer);

            var _this4 = _possibleConstructorReturn(this, (ThreadContainer.__proto__ || Object.getPrototypeOf(ThreadContainer)).call(this, props));

            _this4.state = { threads: props.threads };
            return _this4;
        }

        _createClass(ThreadContainer, [{
            key: "addThread",
            value: function addThread(threadContent) {

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

    var socket = io.connect("http://gotutor.com/forumThread");
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