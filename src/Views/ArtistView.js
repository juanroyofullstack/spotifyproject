import NothingToSee from '../components/Nothingtosee.tsx';
import Artist from '../components/Artist.tsx';
import React, { useState, useEffect } from 'react';
import { loadMore } from '../Services/service.js';

function ArtistView({artists, token}) {
    let currentOffset = 0;
    const [data, setData] = useState(artists?.items?.length>0 ? artists.items : []);
    const [nextUrl, setNext] = useState(artists?.next);
    const loadArtists = () => {
      loadMore(nextUrl, token).then(({ data }) => {
            setNext(data.artists.next)
            const {items} = data.artists;
            setData((albums) => [...albums, ...items]);
          });
        currentOffset += 10;
      };
    const handleScroll = (e) => {

        const scrollHeight = e.target.documentElement.scrollHeight;
        const currentHeight = Math.ceil(
          e.target.documentElement.scrollTop + window.innerHeight
        );
        if (currentHeight + 1 >= scrollHeight) {
          loadArtists();
        }
      };
    
      useEffect(() => {
        let mounted = true;
        if(mounted) {
          setData(artists?.items?.length>0 ? artists.items : [])
          setNext(artists?.next)
        }
        return () =>(  
            mounted = false,
            setData([])
        )
        
      }, [artists]);
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
        <h1>Artists</h1>
        {!data.length >0 && <NothingToSee />}
            <div className="viewGrid">
                 {data && data.map((item, i) => <Artist key={i} artist={item}/>)}
            </div>
        </>;
  }
  export default ArtistView;