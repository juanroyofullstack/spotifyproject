import React from "react";
interface Images {
  height: number,
  url: string,
  width: number,
}
export interface CardInterface {
  external_urls:  {
    spotify: string
  },
  followers: {
    href: string | null,
    total: number
  }
  genres: string[],
  href: string,
  id: string,
  images: Images[],
  name: string,
  popularity: number,
  type: string,
  uri: string
}

function Artist (artist: CardInterface): JSX.Element {
  const {images}: Images = artist;
   return <div className="card">
    <h2>{artist.name}</h2>
    <h3>{artist.genres.map(item => item)}</h3>
    { images[0]?.url ? <img src={images[0]?.url} /> : ''}
    </div>
    ;
  }
  export default Artist;
