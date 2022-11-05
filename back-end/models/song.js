class Song {
  constructor(id, artist, songTitle, time, album, genre, rating) {
    this.id = id;
    this.artist = artist;
    this.songTitle = songTitle;
    this.time = time;
    this.album = album;
    this.genre = genre;
    this.rating = rating;
  }
};

module.exports = Song;