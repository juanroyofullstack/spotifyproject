import NothingToSee from '../components/Nothingtosee.tsx';
import Album from '../components/Album.js';
import React, { useState, useEffect } from 'react';
import { loadMore } from '../Services/service.js';

function AlbumView({albums, token}) {
  const [currentOffset, setCurrentOffset] = useState(0)
  const [data, setData] = useState(albums?.items?.length>0 ? albums.items : []);
  const [nextUrl, setNext] = useState(albums?.next);
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
        setData(albums?.items?.length>0 ? albums.items : [])
        setNext(albums?.next)
      }
      return () =>(
          
          mounted = false,
          setData([])
      )
      
    }, [albums]);
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
        <h1>Albums</h1>
         {!data.length >0 && <NothingToSee />}
            <div className="viewGrid"> 
                {data && data.map((item, i) => <Album key={i} album={item}/>)}
            </div>
        </>;
  }
  export default AlbumView;