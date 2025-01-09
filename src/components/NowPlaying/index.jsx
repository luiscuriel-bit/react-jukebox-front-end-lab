const NowPlaying = ({ track }) => {
    if (!track) return null;
    return (
        <div>
            <h2>Now Playing</h2>

            <h3>{track.title} - {track.artist}</h3>
            {track.coverArtUrl && (
                <img width="100" src={track.coverArtUrl} alt={`${track.title} cover art`} />
            )}
            {track.soundClipUrl && (
                <audio controls src={track.soundClipUrl}>
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default NowPlaying;