import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import * as trackService from './services/trackService';
import TrackForm from "./components/TrackForm";

const App = () => {
    const [tracks, setTracks] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const data = await trackService.index();
                setTracks(data);
                setError('');
            } catch (error) {
                setError(error.message);
            }
        };
        fetchTracks();
    }, []);

    const handleAddTrack = async formData => {
        try {
            const newTrack = await trackService.create(formData);
            setTracks(prev => ([...prev, newTrack]));
            setError('');
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };
    
    const handleUpdateTrack = async (trackId, formData) => {
        try {
            const updatedTrack = await trackService.update(trackId, formData);
            setTracks(prev => prev.map(track => track._id === trackId ? updatedTrack : track));
            setError('');
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };
    
    const handleRemoveTrack = async trackId => {
        try {
            await trackService.remove(trackId);
            setTracks(prev => prev.filter(track => track._id !== trackId));
            setError('');
            navigate('/');
        } catch (error) {
            setError(error.message)
        }
    };
    
    return tracks ? (
        <main>
            <Routes>
                <Route path="/" element={<Home tracks={tracks} handleRemoveTrack={handleRemoveTrack} />} />
                <Route path="/add-track" element={<TrackForm handleAddTrack={handleAddTrack} />} />
                <Route path="/edit-track/:trackId" element={<TrackForm handleUpdateTrack={handleUpdateTrack} />} />
            </Routes>
            {error && (
                <p>{error}</p>
            )}
        </main>
    ) : (
        <h1>Loading...</h1>
    );
};

export default App;