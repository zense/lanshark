import React from 'react';
//import { Loader } from './loader';
import { Link, Redirect } from 'react-router-dom';
export class Button extends React.Component {
    /*constructor(props) {
        super(props);
        this.state={
            location:"loader"
        }
        this.handleLoad=this.handleLoad.bind(this);
    }
    handleLoad()
    {

    }*/
    handleClick=(e)=>{
        e.preventDefault();
        if(e.keyCode === 13){
           console.log("test");
        }
    }
    render(){
       /* function redirect() {
            return <Redirect to="searchresults" />
        }
        
        function updateSecs() {
            var seconds = 5;
            seconds--;
            if (seconds == -1) {
                //clearInterval(foo);
                var a = redirect();
            }
            else 
                var a = (<Link to="loader">
                            <button className="searchbutton" ></button>
                            {updateSecs()}
                        </Link>);
            return a;
        }
        function countdownTimer() {
            var foo = setInterval(function () {
                updateSecs()
            }, 1000);
            return foo;
        }*/
        return (
                <Link to="loader">
                    <button className="searchbutton" ></button>
                </Link>
        );
    }
}
