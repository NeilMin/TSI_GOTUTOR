//import React from 'react';
document.addEventListener("DOMContentLoaded",function(){
class Thread extends React.Component{
    constructor(props){
        props.key=props.content.id;
        super(props);
    }
    render(){
        return(<div>
            <h4>{this.props.content.title}</h4>
            <p>{this.props.content.body}</p>
            <p>posted by {this.props.content.userId}</p>
        </div>)
    }
}
class ThreadContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={threads:props.threads};
    }
    addThread(threadContent){
        this.state.threads.unshift(threadContent);
    }
    
    render(){
        return (<div>
            {this.state.threads.map(x=>(<Thread key={x.id} content={x} />))}
        </div>)
    }
}


    var socket=io.connect("http://gotutor.com:8080/forumThread");
    var threadList=document.getElementById('threads')
    socket.on("oldThread",function(data){
        console.log(data)
        ReactDOM.render(<ThreadContainer threads={data}/>,threadList);
    })
    
    document.addEventListener("DOMContentLoaded",function(){
        var form=document.getElementById("new-thread")
        form.addEventListener('submit',function (event) {
            event.preventDefault();
            socket.emit('newThread',{title:form.title.value,body:form.body.value})
        })
    })
})