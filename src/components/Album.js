const Album=(props)=> {
  const {images: url} = props.album
    return <div className="card">
    <h2>Album: {props.album.name}</h2>
    <h3>Artist: {props.album.artists.map(item => item.name)}</h3>
    { url[0]?.url ? <img src={url[0]?.url} /> : ''}
    </div>
    ;
  }
  export default Album;