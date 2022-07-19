const Song=(props)=> {
  const {images: url} = props.song.album
  return <div className="card">
  <h2>{props.song.name}</h2>
  <h3>By {props.song.artists.map(item => item.name)}</h3>
  { url[0]?.url ? <img src={url[0]?.url} /> : ''}
  </div>
  ;
  }
  export default Song;