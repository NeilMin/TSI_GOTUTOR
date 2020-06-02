//import React from 'react';
document.addEventListener("DOMContentLoaded", function () {
    var replySocket = io.connect("http://gotutor.com/forumReply");

    class Reply extends React.Component {
        render() {
            return (<div className="reply">
                <p>{this.props.reply}</p>
                <p>By {this.props.userId}</p>
            </div>)
        }
    }

    class ThreadRepliesContainer extends React.Component {

        constructor(props) {
            super(props);
            this.repliesInit = this.repliesInit.bind(this);
            this.state = {replies: [], newReplyVal: ""};
            this.handleReplyInputChange = this.handleReplyInputChange.bind(this);
            this.handleReplyInput = this.handleReplyInput.bind(this);
            this.handleOtherReply = this.handleOtherReply.bind(this);
            replySocket.emit('fetch', props.threadId, this.repliesInit);
            replySocket.on("otherReply", this.handleOtherReply)
        }

        repliesInit(res) {
            this.setState({replies: res})
        }

        handleOtherReply(res) {
            this.state.replies.unshift(res);
            this.setState({replies: this.state.replies})
        }

        handleReplyInputChange(event) {
            this.setState({newReplyVal: event.target.value})
        }

        handleReplyInput(event) {
            event.preventDefault();
            replySocket.emit('newReply', {threadId: this.props.threadId, reply: this.state.newReplyVal});
        }

        render() {
            return (<div class={"replyMain"}>
                {this.state.replies.map(x => (<Reply key={x.id} reply={x.reply} userId={x.userId}></Reply>))}
                <form className="newReply" onSubmit={this.handleReplyInput}>
                    <label>New Reply</label>
                    Reply:
                    <input type="text" value={this.state.newReplyVal} onChange={this.handleReplyInputChange}/>
                    <input type="submit" value="Post reply." class="buttons"/>
                </form>
            </div>)
        }
    }

    class Thread extends React.Component {
        constructor(props) {
            super(props);
            this.state = {expanded: false};
            this.toggleExpand = this.toggleExpand.bind(this);
        }

        toggleExpand() {
            this.setState({expanded: !this.state.expanded});
        }

        render() {
            return (<div class={"wholeThread"}>
                <div className="threadMain" onClick={this.toggleExpand}>
                    <h4>Title: {this.props.content.title}</h4>
                    <p>Body: {this.props.content.body}</p>
                    <p>posted by {this.props.content.userId}</p>
                </div>
                {this.state.expanded ?
                    <ThreadRepliesContainer threadId={this.props.content.id}></ThreadRepliesContainer> : <div class={"replyContainer"}></div>}
            </div>)
        }
    }

    class ThreadContainer extends React.Component {
        constructor(props) {
            super(props);
            this.state = {threads: props.threads};
        }

        addThread(threadContent) {

            this.state.threads.unshift(threadContent);
            this.setState({
                threads: this.state.threads
            });
        }

        render() {
            return (<div>
                {this.state.threads.map(x => (<Thread key={x.id} content={x}/>))}
            </div>)
        }
    }


    var socket = io.connect("http://gotutor.com/forumThread");
    var threadList = document.getElementById('threads')
    socket.on("oldThread", function (data) {
        console.log(data);
        var container = ReactDOM.render(<ThreadContainer threads={data}/>, threadList);
        var form = document.getElementById("new-thread");
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            socket.emit('newThread', {title: form.title.value, body: form.body.value})
        });
        socket.on("otherThread", data => container.addThread(data))
    })
});
