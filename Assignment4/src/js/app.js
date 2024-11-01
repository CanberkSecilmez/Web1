/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Canberk secilmez
 *      Student ID: 116348228
 *      Date:       2024-03-08
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;
//import { innerHTML, appendChild } from "./artists.js";

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

document.addEventListener("DOMContentLoaded", function () {
  const nav = window.document.getElementById("menu");
  const tbody = window.document.getElementById("songs");
  const selectedArtistTitle = document.getElementById("selected-artist");
  const space = document.createElement("br");

  artists.forEach((artist) => {
    const artistButton = document.createElement("button");
    artistButton.textContent = artist.name;
    artistButton.addEventListener("click", () => showArtist(artist));
    nav.appendChild(artistButton);
    nav.appendChild(space);
  });

  function showArtist(artist) {
    selectedArtistTitle.textContent = artist.name;

    let linkSocialMedia = null,
      linkWebsite = null,
      addComma = null;
    if (document.getElementById("social-media") && document.getElementById("website")) {
      linkSocialMedia = document.getElementById("social-media");
      linkWebsite = document.getElementById("website");
      addComma = document.getElementById("comma");
    } else {
      linkSocialMedia = document.createElement("a");
      addComma = document.createElement("span");
      linkWebsite = document.createElement("a");
      addComma.id = "comma";
      linkSocialMedia.id = "social-media";
      linkWebsite.id = "website";
    }

    artist.urls.forEach((urlObj) => {
      if (urlObj.name === "Website") {
        linkWebsite.href = urlObj.url;
        linkWebsite.textContent = urlObj.name;
        linkWebsite.target = "_blank";
        addComma.textContent = ", ";
        nav.appendChild(linkWebsite);
        nav.appendChild(addComma);
      } else {
        linkSocialMedia.href = urlObj.url;
        linkSocialMedia.textContent = urlObj.name;
        linkSocialMedia.target = "_blank";
        nav.appendChild(linkSocialMedia);
      }
    });
    tbody.innerHTML = "";

    const artistSongs = songs.filter((song) => song.artistId === artist.artistId && !song.explicit);

    artistSongs.forEach((song) => {
      console.log(song);
      const row = document.createElement("tr");
      row.addEventListener("click", () => console.log(song));
      const titleCell = document.createElement("td");
      titleCell.innerHTML = `<a href="${song.url}" target="_blank">${song.title}</a>`;
      const yearCell = document.createElement("td");
      yearCell.textContent = song.year;
      const durationCell = document.createElement("td");
      durationCell.textContent = convertToMinutesSeconds(song.duration);

      row.appendChild(titleCell);
      row.appendChild(yearCell);
      row.appendChild(durationCell);
      tbody.appendChild(row);
    });
  }

  function convertToMinutesSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }
});
