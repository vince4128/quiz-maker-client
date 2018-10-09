import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Style from './style/style.scss';
import Root from './Root';
import App from './components/App';

ReactDOM.render(
    <Root>
        <BrowserRouter>
            <Route path="/" render={({ match }) => <App match={match} />}/>
        </BrowserRouter>
    </Root>
    , document.getElementById('root')
);
