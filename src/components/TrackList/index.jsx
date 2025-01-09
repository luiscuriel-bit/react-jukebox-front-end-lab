import { Link } from "react-router-dom";

const TrackList = ({ tracks, setNowPlaying, handleRemoveTrack }) => {
    return (
        <div>
            <h1>Tracks</h1>
            {
                tracks.length ? (
                    <ul>
                        {
                            tracks.map(track => (
                                <li key={track._id}>
                                    <h2>Title: {track.title}</h2>
                                    <h4>Artist: {track.artist}</h4>
                                    {track.coverArtUrl && (
                                        <img width="100" src={track.coverArtUrl} alt={`${track.title} cover art`} />
                                    )}
                                    
                                    <Link to={`/edit-track/${track._id}`}>Edit track</Link>
                                    <button onClick={() => setNowPlaying(track)}>Play</button>
                                    <button onClick={() => handleRemoveTrack(track._id)}>Delete</button>
                                </li>
                            ))
                        }
                    </ul>
                ) : (
                    <p>No tracks available.</p>
                )
            }
        </div>
    );
};

export default TrackList;