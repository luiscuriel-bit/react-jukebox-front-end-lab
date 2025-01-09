import { Link } from "react-router-dom";
import TrackList from "../TrackList";
import NowPlaying from "../NowPlaying";
import { useState } from "react";

const Home = ({ tracks, handleRemoveTrack }) => {
    const [nowPlaying, setNowPlaying] = useState(null);
    return (
        <div>
            <Link to='/add-track'>Add New Track</Link>
            <TrackList tracks={tracks} setNowPlaying={setNowPlaying} handleRemoveTrack={handleRemoveTrack} />
            <NowPlaying track={nowPlaying}/>
        </div>
    );
};

export default Home;