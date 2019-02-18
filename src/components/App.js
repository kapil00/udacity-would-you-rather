import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import HomePage from './HomePage';
import DisplayQuestion from './DisplayQuestion';
import AddQuestion from './AddQuestion';
import Leaderboard from './Leaderboard';
import Nav from './Nav';
import NotFound from './NotFound';
import LoadingBar from 'react-redux-loading';
import {handleInitialData} from "../actions/shared";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }
    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    <Nav />
                    <div>
                       <Switch>
                         <Route exact path='/' component={withRouter(HomePage)} />
                         <Route path='/add' component={withRouter(AddQuestion)} />
                         <Route path='/questions/:id' exact component={withRouter(DisplayQuestion)} />
                         <Route path='/leaderboard' exact component={withRouter(Leaderboard)} />
                         <Route path='/invalid'component={NotFound} />
                         <Route component={NotFound} />
                       </Switch>
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({ authedUser }) {
    return {
        loading: authedUser.loggedInUser === null
    }
}

export default connect(mapStateToProps)(App);