const Song = require('../models/song');
const utilities = require('./utilities');

const songs = [
  // Hip-Hop
  new Song('dc77e210-87a7-40b6-a936-dd2082b1c9f6', 'Snoop Dogg', 'Still Here', '3:50', 'Neva Left', 'hiphop', 4),
  new Song('5f7a992b-ca0c-4d19-a39b-fbbb39e2da7f', 'Eminem', 'Lose Yourself', '5:21', '8 Mile OST', 'hiphop', 5),
  new Song('97d2b472-0e4c-44be-aa64-d6feabd3cccb', 'Big Sean', 'Deep Reverence', '3:59', 'Detroit 2', 'hiphop', 5),
  new Song('303f1e75-59b8-4cc9-a6a6-ca9577a444e3', 'A Tribe Called Quest', 'Scenario', '4:11', 'The Low End Theory', 'hiphop', 5),
  new Song('2cc79715-c156-476c-9391-7d5a60fb02d2', 'Snoop Dogg', 'Focused', '2:54', 'I Wanna Thank Me', 'hiphop', 5),
  // Dance/Electronic
  new Song('a4eeaf5b-fbcf-4252-a96f-0cb6774d61ad', 'Melodiesinfonie', 'Morning Glory', '3:11', 'Chillhop Essentials - Winter 2018', 'dance', 4),
  new Song('7c2b4bb4-6d1b-4929-ae2e-cd92171422d5', 'Avicii', 'Wake Me Up', '4:32', 'True', 'dance', 5),
  new Song('ae41bcd0-94dd-4ccd-819d-9499ec9013ce', 'Major Lazer', 'Lean On', '2:58', 'Peace Is The Mission', 'dance', 5),
  new Song('4cbf9038-64cd-4f7f-b267-18517ddd32e5', 'Porter Robinson', 'Language', '6:08', 'Serious Beats 71', 'dance', 3),
  new Song('ab28c2a2-8874-4522-91a3-030b2093af3f', 'Kygo', 'Stole the Show', '5:25', 'Cloud Nine', 'dance', 4),
  new Song('0fe9442f-c12b-4d01-be23-5fd223c35484', 'Avicii', 'Levels', '3:18', 'Levels', 'dance', 5),
  new Song('27edb969-b901-49f2-a0e5-bf4aeeb99716', 'Martin Solveig', 'Hello', '4:12', 'Hello', 'dance', 5),
  // Rock
  new Song('5ba26160-4220-4335-b3ed-9b260952d352', 'The Rolling Stones', 'Start Me Up', '3:27', 'Tattoo You', 'rock', 4),
  new Song('79f96a04-4fed-4843-933e-41d4a905daf8', 'Creedence Clearwater Revival', 'Proud Mary', '3:09', 'Bayou Country', 'rock', 4),
  new Song('12b18ec7-09a1-4653-afe9-766befe57564', 'Aerosmith', 'Walk This Way', '4:21', 'Toys in the Attic', 'rock', 5),
  new Song('608a0d2b-bdbc-4627-87d2-e6312b95e233', 'Nickelback', 'How You Remind Me', '3:47', 'Toys in the Attic', 'rock', 5),
  new Song('f054ac43-32bd-45dd-ab24-b36f49e7ec30', '3 Doors Down', 'Kryptonite', '3:54', 'The Better Life', 'rock', 5),
];

function getMusicData() {
  console.log('Returning the whole list of songs');

  return songs;
}

function fitlerMusic(artist, songTitle, album, genre) {
  console.log(`Filterings songs by artist: ${artist}, title: ${songTitle}, album: ${album}, genre: ${genre}`);

  let foundSongs = songs;
  if (artist) {
    foundSongs = foundSongs.filter(s => utilities.areStringsEqual(s.artist, artist));
  }

  if (songTitle) {
    foundSongs = foundSongs.filter(s => utilities.areStringsEqual(s.songTitle, songTitle));
  }

  if (album) {
    foundSongs = foundSongs.filter(s => utilities.areStringsEqual(s.album, album));
  }

  if (genre) {
    foundSongs = foundSongs.filter(s => utilities.areStringsEqual(s.genre, genre));
  }

  return foundSongs;
}

function addFavorite(id) {
  const song = songs.find(s => s.id === id);

  if (song) {
    console.log(`Adding song with ID ${id} as favorite...`);
    return song;
  } else {
    console.log(`Could not add song with ${id} as favorite since it was not found.`);
  }
}

function downloadSong(id) {
  const song = songs.find(s => s.id === id);

  if (song) {
    console.log(`Downloading song with ID ${id}...`);
    return song;
  } else {
    console.log(`Could not download song with ${id} since it was not found.`);
  }
}

module.exports = {
  getMusicData,
  fitlerMusic,
  addFavorite,
  downloadSong
};