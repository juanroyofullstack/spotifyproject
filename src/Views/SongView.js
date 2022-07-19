import NothingToSee from '../components/Nothingtosee.tsx';
import Song from '../components/Song.js';
import React, { useState, useEffect } from 'react';
import { loadMore } from '../Services/service.js';
function SongView({songs, token}) {
    const [currentOffset, setCurrentOffset] = useState(0)
    const [data, setData] = useState(songs?.items?.length>0 ? songs.items : []);
    const [nextUrl, setNext] = useState(songs?.next);
    const loadSongs = () => {
        loadMore(nextUrl, token).then(({ data }) => {
            setNext(data.tracks.next)
            const {items} = data.tracks;
            setData((tracks) => [...tracks, ...items]);
          }).catch(error => {console.log(error)});
          setCurrentOffset((offSet) => offSet+10)
      };
    const handleScroll = (e) => {

        const scrollHeight = e.target.documentElement.scrollHeight;
        const currentHeight = Math.ceil(
          e.target.documentElement.scrollTop + window.innerHeight
        );
        if (currentHeight + 1 >= scrollHeight) {
          loadSongs();
        }
      };
    
      useEffect(() => {
        let mounted = true;
        if(mounted) {
          setData(songs?.items?.length>0 ? songs.items : [])
          setNext(songs?.next)
        }
        return () =>(
            
            mounted = false,
            setData([])
        )
        
      }, [songs]);
      useEffect(() => {
        let mounted = true;
        if(mounted) {
          window.addEventListener("scroll", handleScroll);
        }
        return () =>(
            window.removeEventListener("scroll", handleScroll),
            mounted = false
        )
        
      }, [data]);
    return <>
        <h1>Songs</h1>
        {!data.length > 0 && <NothingToSee />}
        <div className="viewGrid">
            {data && data.map((item, i) => <Song key={i} song={item}/>)}
            </div>
        </>;
  }
  export default SongView;