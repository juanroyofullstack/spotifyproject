import React, { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import View from './Views/View.tsx'
import {getTokenSpoty, getDataSpoty} from './Services/service.js'
import Loader from './components/Loader.tsx';
import AlbumView from './Views/AlbumView';
import SongView from './Views/SongView';
import ArtistView from './Views/ArtistView';
import { Search } from './components/Search.js';
import './App.css';
import './Views/view.css'
function App() {

    const [data, setData] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [song, setSong] = useState(true)
    const [album, setAlbum] = useState(false)
    const [artist, setArtist] = useState(false)

        const search=(term)=> {
          setLoading(true)
          setTimeout(function(){ getTokenSpoty().then(trackresponse => {  
            setToken(trackresponse)
            return getDataSpoty(term, trackresponse)
          }).then(res=>{
            setData(res.data)
            setLoading(false)
          }).catch(error=> setData("Sorry We didn't your search"),setLoading(false))}, 2000);
        }
        const handleSelectedSong =(e)=> {
            setSong(true)
            setAlbum(false)
            setArtist(false)
        }
        const handleSelectedAlbum=(e)=> {
            setSong(false)
            setAlbum(true)
            setArtist(false)
        }
        const handleSelectedArtist =(e)=> {
            setSong(false)
            setAlbum(false)
            setArtist(true)
        }
        const selectedSong = song ? 'selected' : 'unselected'
        const selectedAlbum = album ? 'selected' : 'unselected'
        const selectedArtist = artist ? 'selected' : 'unselected'
        const searchs = useLocation().search;

        const onInit=()=> {
          const q = new URLSearchParams(searchs).get('q');
          if(q){
            return search(q)
          }
        }
        
        useEffect(()=> {
          onInit()
        },[])
  return (
    <div className="column">
          <Search search={search}/>
      <div className="display">
        <div className="select">
              <div className={`${selectedSong} songs`}  name="songs" onClick={handleSelectedSong}> Songs</div>
              <div className={`${selectedAlbum} albums`} name="albums" onClick={handleSelectedAlbum}>Albums</div>
              <div className={`${selectedArtist} artists`} name="artists" onClick={handleSelectedArtist}>Artists</div>
        </div>
          <div className="content">
            {loading && <Loader />}
            {!loading &&
              <View>
                 {album&&<AlbumView albums={data.albums && data.albums} token={token}/>}
                  {song&&<SongView songs={data.tracks && data.tracks} token={token}/>}
                  {artist&&<ArtistView artists={data.artists && data.artists} token={token}/> }
              </View>
              }
          </div>
       </div>
    </div>
  );
}

export default App;
