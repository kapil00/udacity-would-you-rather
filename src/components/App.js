import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import HomePage from './HomePage';
import QuestionAdd from './QuestionAdd';
import QuestionPoll from './QuestionPoll';
import QuestionPollResults from './QuestionPollResults';
import LeaderBoard from './LeaderBoard';
import Nav from './Nav';
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
                        {this.props.loading === true
                            ? null
                            : <div>
								<Route path='/' exact component={HomePage} />
								<Route path='/question/:id' exact component={QuestionPoll}/>
								<Route path='/question/:id/results' exact component={QuestionPollResults}/>
								<Route path='/addquestion' exact component={QuestionAdd}/>
								<Route path='/leaderboard' exact component={LeaderBoard}/>
                            </div>
                        }
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({login}) {
    return {
        loading: false
    }
}

export default connect(mapStateToProps)(App);