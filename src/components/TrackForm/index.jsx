import * as trackService from '../../services/trackService';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TrackForm = ({ handleAddTrack, handleUpdateTrack }) => {
    const { trackId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const fetchTrack = async () => {
                const trackData = await trackService.show(trackId);
                setFormData(trackData);
            }
            if (trackId) fetchTrack();
        } catch (error) {
            console.error(error.message);
            navigate('/');
        }
    }, [trackId]);

    const handleChange = event => setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));

    const handleSubmit = async event => {
        event.preventDefault();

        if (handleAddTrack)
            handleAddTrack(formData);
        else
            handleUpdateTrack(trackId, formData);
    }
    return <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />

            <label htmlFor="artist">Artist</label>
            <input type="text" name="artist" id="artist" value={formData.artist} onChange={handleChange} />

            <button type='submit'>Submit</button>
        </form>
    </>;
};

export default TrackForm;