import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleAddQuestion} from '../actions/shared';
import {Redirect} from 'react-router-dom';

class AddQuestion extends Component {

    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false
    };

    handleOptionOneTextChange = (e) => {
        this.setState({
            optionOneText: e.target.value
        });
    };

    handleOptionTwoTextChange = (e) => {
        this.setState({
            optionTwoText: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {optionOneText, optionTwoText} = this.state;
        const {dispatch, loggedInUser} = this.props;

        dispatch(handleAddQuestion(optionOneText, optionTwoText, loggedInUser));
      
        this.setState({
            optionOneText: '',
            optionTwoText: '',
            toHome: true
        });
    };

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;
    const {loggedInUser, location} = this.props;

    if(!loggedInUser) {
      return <Redirect to={{
               pathname: "/",
               state: { referrer: location.pathname }
               }}/>
    }

    if(toHome === true) {
      return <Redirect to={{
               pathname: "/"
               }}/>
    }

    return (
        <div className='container'>
            <div className='row justify-content-center col-sm-8 card'>
                <div className='card-header'><strong>Create New Question</strong></div>
                <div className='card-body'>
                    <p>Complete the question:</p>
                    <p><strong>Would You Rather...</strong></p>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <input className='form-control' placeholder='Enter option one text here' value={optionOneText} onChange={this.handleOptionOneTextChange} />
                        </div>
                        <div><strong>OR</strong></div>
                        <div className='form-group'>
                            <input className='form-control' placeholder='Enter option two text here' value={optionTwoText} onChange={this.handleOptionTwoTextChange} />
                        </div>
                        <button className='btn btn-outline-primary reset-vertical-margin' type='submit' disabled={optionOneText === '' || optionTwoText === ''}> Submit </button>
                    </form>
                </div>
            </div>
        </div>
    )
    }
}

function mapStateToProps({authedUser}) {
   return {
     loggedInUser : authedUser.loggedInUser
  }
}

export default connect(mapStateToProps)(AddQuestion);