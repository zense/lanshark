import React from 'react';
import { Loader } from './loader/loader';
import { Redirect } from 'react-router-dom';
export class Page extends React.Component {
    constructor(props){
        super(props);
        this.state={value:true};
    }
    componentDidMount(){
        this.timeoutHandle = setTimeout(()=>{
            console.log("test");
            //window.location.href="localhost:3000/searchresults";
            this.setState({value:false})
        }, 3000);
   }
    apply = ()=>{
       if(this.state.value==false)
            return(<Redirect to="searchresults"/>);
   }
   componentWillUnmount(){
        clearTimeout(this.timeoutHandle);
   }
    render() {
        return (
            <div className="load">
                <Loader />
                {this.apply()}
            </div>
        );
    }
}