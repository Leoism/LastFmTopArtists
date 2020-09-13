import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSubmission extends Component {
  constructor() {
    super();
    this.state = { hasUserData: false };
  }

  async getUserStats() {
    const userElem = document.getElementById("username");
    const username = userElem.value;
    const userData = await fetch('/user-stats', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ username })
    }).then((res) => res.json());
    this.setState({ hasUserData: true, userData });
    console.log(this.state)
  }


  render() {
    let info = <p></p>;
    console.log('yes');
    if (this.state.hasUserData) {
      info = <div>{JSON.stringify(this.state.userData)}</div>
    }
    return (
      <span>
        <input id="username" type="text" required />
        <button onClick={this.getUserStats.bind(this)}>Get Stats</button>
        {info}
      </span>
    );
  }
}

export default UserSubmission;
