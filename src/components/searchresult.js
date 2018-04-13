import React from 'react';
import { Logo } from './logo/logo';
import { Navbar } from './navbar/navbar';
import { Home } from './Home';
import {Dir_list} from './table/dir_list';
export class Results extends React.Component {
    render(){
        var file_des = {
            filename:"Rabin Karp algorithm",
            filesize:"15MB",
            filetype:"mp4"
        };
        var file_des1 = {
            filename:"Narcos Season 2",
            filesize:"15MB",
            filetype:"folder"
        };
        var file_des2 = {
            filename:"Narcos Season 2",
            filesize:"15MB",
            filetype:"mp3"
        };
        var file_des3 = {
            filename:"Narcos Season 2",
            filesize:"15MB",
            filetype:"folder"
        };
        var file_des4 = {
            filename:"Narcos Season 2",
            filesize:"15MB",
            filetype:"c"
        };
        var file_des5 = {
            filename:"Narcos Season 2",
            filesize:"15MB",
            filetype:"folder"
        };
        var file_des6 = {
            filename:"Narcos Season 2",
            filesize:"15MB",
            filetype:"folder"
        };
        var file_des7 = {
            filename:"Narcos Season 2",
            filesize:"15MB",
            filetype:"folder"
        };
        var bb = [file_des,file_des1,file_des2,file_des3,file_des4,file_des5,file_des6,file_des7]
        return (
            <div className='aaa'>
            <Navbar />
            <br /><br /><br />
            <Dir_list list={bb}/>
            </div>
        );
    }
}