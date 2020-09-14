import React, { Component } from 'react';
import './ArtistInformation.css';

class ArtistInformation extends Component {
  populateAllArtists(userStats) {
    let display = [];
    for (const artistInfo of userStats) {
      display.push(this.createArtistElement(artistInfo));
    }
    return display;
  }

  populateAllTracks(tracks) {
    let display = [];
    for (const track of tracks) {
      display.push(this.createTrackElement(track));
    }
    return display;
  }

  createArtistElement(artistInformation) {
    const artistName = artistInformation[0];
    const artistProperties = artistInformation[1];

    return (
      <li>
        <p>{artistName}: {Math.round(artistProperties.totalListenTime)} minutes</p>
        <button className="collapsible">Show Tracks</button>
        <ol className="tracks">
          {this.populateAllTracks(artistProperties.tracks)}
        </ol>
      </li>);
  }

  createTrackElement(trackInfo) {
    const trackName = Object.keys(trackInfo)[0];
    const listenTime = Math.round(trackInfo[trackName].listenTime);
    return (<li>{trackName}: {listenTime} minutes</li>);
  }

  render() {
    return (<ol>{this.populateAllArtists(this.props.userStats)}</ol>);
  };
}

export default ArtistInformation;
