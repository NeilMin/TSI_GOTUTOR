class UserImage extends React.Component {
    render(){
        return(
            <img src={sessionStorage.getItem('picture')} alt='user picture' />
        )
    }
}
let pictureContainer=document.getElementById('picture');
ReactDOM.render(<UserImage/>,pictureContainer);