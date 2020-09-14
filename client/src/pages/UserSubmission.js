import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ArtistInformation from '../components/ArtistInformation';

class UserSubmission extends Component {
  constructor() {
    super();
    this.state = { hasUserStats: false };
  }

  async getUserStats() {
    const userElem = document.getElementById("username");
    const username = userElem.value;
    const userStats = await fetch('/user-stats', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ username })
    }).then((res) => res.json());
    this.setState({ hasUserStats: true, userStats });
  }

  render() {
    let info = <p></p>;
    if (this.state.hasUserStats) {
      info = <ArtistInformation userStats={this.state.userStats} />
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
