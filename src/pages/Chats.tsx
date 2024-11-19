import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { Link, useLocation } from 'react-router-dom'
import { webSocket, onClick } from 'src/webSocket.tsx'
import ChattingDialogs from 'src/muiComponents/ChattingDialogs'
import { useBottomNavigationStore, useNewMessageStore } from 'src/store'

// const webSocket = io("http://localhost:5000");
function Chats({ userObj }: {
  userObj: {uid: string, displayName: string},
}) {
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    // const options = {
    //     uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
    //   };
      const options = {
        width: '60%',
        height: '200',
        uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
      };
      
      
    const callback = (EmbedController) => {
      document.querySelectorAll('.episode').forEach(
        episode => {
          episode.addEventListener('click', () => {
            // click event handler logic goes here
            episode.addEventListener('click', () => {
              EmbedController.loadUri(episode.dataset.spotifyId)
            });
                    
          });
        })
    };
    IFrameAPI.createController(element, options, callback);
  };
  
  // const callback = (EmbedController) => {
  //   document.querySelectorAll('.episode').forEach(
  //     episode => {
  //       episode.addEventListener('click', () => {
  //         // click event handler logic goes here
  //         episode.addEventListener('click', () => {
  //           EmbedController.loadUri(episode.dataset.spotifyId)
  //         });
                  
  //       });
  //     })
  // };
  
  
  
  return (
    <div>
      {/* <iframe 
src="https://open.spotify.com/embed/playlist/5C9ADjArybPy54GTZgXtZO?utm_source=generator"       width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}
      {/* <iframe src="https://open.spotify.com/embed/playlist/2rmQLv8OMvt9jKKLeoeake?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}
      {/* <iframe src="https://open.spotify.com/embed/playlist/29aaFC9WTboKs9q7V7Tvzz?utm_source=generator&theme=0" width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}
      <iframe
        src="https://open.spotify.com/embed/playlist/6phYndBIC4DIqefH1CcUsT?utm_source=generator&theme=0"
        width="60%"
        height="400px"
        frameborder="{0}"
        allowfullscreen
        allow="autoplay;
      clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
      {/* <iframe className="border-radius:12px" 
src="https://open.spotify.com/embed/track/6w8pFOKn42O418qwcQElZ3?utm_source=generator" width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}
    <div className='flex'>
      <div id="embed-iframe"></div>
      <div className="episodes flex flex-col">
        <button className="episode" data-spotify-id="spotify:episode:7makk4oTQel546B0PZlDM5">
          My Path to Spotify: Women in Engineering
        </button>
        <button className="episode" data-spotify-id="spotify:episode:43cbJh4ccRD7lzM2730YK3">
          What is Backstage?
        </button>
        <button className="episode" data-spotify-id="spotify:episode:6I3ZzCxRhRkNqnQNo8AZPV">
          Introducing Nerd Out@Spotify
        </button>
      </div>
    </div>
  </div>
  );
}

export default Chats;
