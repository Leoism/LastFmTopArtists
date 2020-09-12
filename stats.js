const fetch = require('node-fetch');

/**
 * Retrieves all track pages of a LastFm user. Returns a sorted Array of Artists
 * based on total listen time.
 * @param {String} user - the users LastFm username 
 * @param {String} apiKey - a LastFm API Key
 */
async function getAllTracks(user, apiKey) {
  // Array of track objects
  const allTracks = [];
  let currPage = (await getPage(user, apiKey, 1)).toptracks;
  const totalPages = parseInt(currPage['@attr'].totalPages);
  allTracks.push(...currPage.track);

  for (let i = 2; i <= totalPages; i++) {
    currPage = (await getPage(user, apiKey, i)).toptracks;
    allTracks.push(...currPage.track);
  }
  return calculateTotalListenTime(allTracks);
}

/**
 * Returns a JSON of the Users LastFm tracks page.
 * @param {String} user - the users LastFm username 
 * @param {String} apiKey - a LastFm ApiKey
 * @param {Number} page - the page to retrieve. (defaults to 1)
 */
async function getPage(user, apiKey, page) {
  page = page || 1;
  return await fetch(`http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${user}&api_key=${apiKey}&limit=100&page=${page}&format=json`)
    .then((response) => response.json())
}

/**
 * Calculates an approximate total listen time for a track, and artists based
 * on times a song was played. Returns a sorted Array of Artists with sorted
 * tracks.
 * @param {Array} tracks - an array of LastFm Track Objects. 
 */
function calculateTotalListenTime(tracks) {
  const allArtists = {};

  for (let track of tracks) {
    const mins = convertToMinutes(track.duration);
    const timePlayed = parseInt(track.playcount);
    const trackListenTime = mins * timePlayed;
    const artist = track.artist.name;
    const trackName = track.name;

    // Initialize totalListenTime for artists with no entries yet.
    if (!allArtists[artist]) {
      allArtists[artist] = {
        'totalListenTime': 0,
      }
    }

    if (!allArtists[artist].tracks) {
      allArtists[artist].tracks = [];
    }

    allArtists[artist].tracks.push(
      {
        [trackName]: {
        'listenTime': trackListenTime,
      }
    });

    allArtists[artist].totalListenTime += trackListenTime;
  }
  
  return sortArtistByListenTime(allArtists);
}

/**
 * Returns a sorted array of artists by total listen time. Index 0 is artist
 * name and Index 1 is artist information. Artist information contains total
 * listen time and an array of all tracks.
 * @param {Object} artists - an Object of Artists 
 */
function sortArtistByListenTime(artists) {
  const artistArr = Object.entries(artists).map((artist) => [artist[0], artist[1]]);
  artistArr.sort((artist1, artist2) => artist2[1].totalListenTime - artist1[1].totalListenTime);
  for (let artist of artistArr) {
    sortTracksByListenTime(artist[1].tracks);
  }
  return artistArr;
}

/**
 * Given an array of tracks, sorts tracks by highest listen time to lowest
 * listen time.
 * @param {Array} artistTracks - array of tracks of an artist 
 */
function sortTracksByListenTime(artistTracks) {
  artistTracks.sort((track1, track2) => {
    let track1ListenTime = track1[Object.keys(track1)[0]].listenTime;
    let track2ListenTime = track2[Object.keys(track2)[0]].listenTime;
    return track2ListenTime - track1ListenTime;
  });
}

/** Converts seconds into minutes. */
function convertToMinutes(sec) {
  return parseInt(sec) / 60;
}
