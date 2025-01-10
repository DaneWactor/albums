import axios from "axios";

export async function search(query: string) {

    // in a real world environemnt, I would set up an error boundary to catch this error
    if (query === "") {
        return;
    }

    try {
        const response = await axios.get(`https://api.imgur.com/3/gallery/search?q_all=${query}&q_type=album`, {
            headers: {
                Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`
            }       
        });

        return response.data;
    } catch (error) {
        // in a real world environemnt, I would set up an error boundary to catch this error also
        console.log(error);
    }
};

export async function getImages(albumHash: string) {

    // and this one...
    if (albumHash === "") {
        return;
    }

    try {
        const response = await axios.get(`https://api.imgur.com/3/album/${albumHash}/images`, {
            headers: {
                Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`
            }       
        });

        return response.data.data;
    } catch (error) {
        // and this one...
        console.log(error);
    }
};

export async function getImage(albumHash: string, imageHash: string) {

    try {
        const response = await axios.get(`https://api.imgur.com/3/album/${albumHash}/image/${imageHash}`, {
            headers: {
                Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`
            }       
        });

        return response.data.data;
    } catch (error) {
        // and this one...
        console.log(error);
    }
    
};

