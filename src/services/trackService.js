const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

const index = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error('Could not retrieve tracks');
        const tracks = await response.json();

        return tracks;
    } catch (error) {
        console.error('Error retrieving tracks', error);
        throw new Error('Could not retrieve tracks');
    }
};

const create = async trackFormData => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trackFormData),
        });
        if (!response.ok) throw new Error('Could not create track');

        return response.json();
    } catch (error) {
        console.error('Error creating track', error);
        throw new Error('Could not create track');
    }
};

const show = async trackId => {
    try {
        const response = await fetch(`${BASE_URL}/${trackId}`);
        if (!response.ok) throw new Error('Could not retrieve track');

        return await response.json();
    } catch (error) {
        console.error('Error retrieving track', error);
        throw new Error('Could not retrieve track');
    }
};

const update = async (trackId, trackFormData) => {
    try {
        const response = await fetch(`${BASE_URL}/${trackId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trackFormData),
        });
        if (!response.ok) throw new Error('Could not update track');

        return await response.json();
    } catch (error) {
        console.error('Error updating track', error);
        throw new Error('Could not update track');
    }
};

const remove = async trackId => {
    try {
        const response = await fetch(`${BASE_URL}/${trackId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Could not remove track');

        return await response.json();
    } catch (error) {
        console.error('Error deleting track', error);
        throw new Error('Could not delete track');
    }
};

export { index, create, show, update, remove };