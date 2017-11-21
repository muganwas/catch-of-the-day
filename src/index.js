import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import './css/style.css';
import StorePicker from './components/StorePicker';
import App from './components/App';
import NotFound from './components/NotFound';

var mPoint = document.getElementById('main');
var Root = () => {
        return ( 
        <BrowserRouter basename="/catch-of-the-day" >
            <div>
            <Match exactly pattern="/"component={ StorePicker }/>
            <Match pattern="/store/:storeId" component={ App }/>  
            <Miss component={ NotFound }/> 
            </div> 
        </BrowserRouter>        
        )
    }
    //ReactDom.render(<StorePicker />, mPoint);
render( <Root/> , mPoint);