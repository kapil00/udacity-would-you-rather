import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

const Leaderboard = (props) => {
    const { users, loggedInUser } = props;
    if(!loggedInUser) {
      return <Redirect to={{
               pathname: "/",
               state: { referrer: props.location.pathname }
               }}/>
    }

    const usersInfo = Object.values(users).map((aUser) => {
        return {
            'user': aUser,
            'score': Object.keys(aUser.answers).length + Object.keys(aUser.questions).length
        }
    }).sort((a, b) => b.score - a.score);

    return (
        <div className='container'>
              {usersInfo.map((userInfo) => {
                return (
                        <div className='card' key={userInfo.user.id}>
                            <div className='card-header'><strong>{userInfo.user.name}</strong></div>
                            <div className='card-body'>
                                    <div className='row justify-content-center'>
                                        <div className='col-sm-4 border-right center'>
                                            <img src={userInfo.user.avatarURL} alt={`Avatar of ${userInfo.user.name}`} className='height-100'/>
                                        </div>
                                        <div className='col-sm-5 border-right'>
                                            <p className='m-30-top'><strong><span className='p-5-right'>Answered Questions:</span></strong>
                                                <span className='badge badge-secondary'>{Object.keys(userInfo.user.answers).length}</span>
                                            </p>
                                            <p><span className='p-5-right'><strong>Created Questions:</strong></span>
                                                <span className='badge badge-secondary'>{Object.keys(	userInfo.user.questions).length}</span>
                                            </p>
                                        </div>
                                        <div className='col-sm-3 m-35-top'>
                                            <div className='container'>
                                                <div className='row justify-content-center'>
                                                    <h2><span className='badge badge-info'>{userInfo.score}</span></h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                )
            })}
        </div>
    )
};

function mapStateToProps({authedUser, users}) {
    return {
        loggedInUser : authedUser.loggedInUser,
        users,
    }
}

export default connect(mapStateToProps)(Leaderboard);