'use client';

import Image from 'next/image';
import { getImage } from '../api/actions';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface ImgurImage {
    id: string;
    title: string | null;
    description: string | null;
    datetime: number;
    type: string;
    animated: boolean;
    width: number;
    height: number;
    size: number;
    views: number;
    link: string;
    mp4?: string;
    gifv?: string;
}

export default function ImagePage() {
    const [image, setImage] = useState<ImgurImage | null>(null);
    const searchParams = useSearchParams();
    
    const albumHash = searchParams.get('albumHash');
    const imageHash = searchParams.get('imageHash');

    useEffect(() => {
        async function fetchImage() {
            if (albumHash && imageHash) {
                try {
                    const fetchedImage = await getImage(albumHash, imageHash);
                    setImage(fetchedImage);
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }
        }

        fetchImage();
    }, [albumHash, imageHash]);

    if (!image) return <div>Loading...</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <div className="max-w-full max-h-screen">
                <Image 
                    src={image.link}
                    alt={image.title || 'Image'}
                    width={image.width}
                    height={image.height}
                    className="object-contain"
                />
                {image.title && (
                    <div className="text-white text-center mt-4">
                        {image.title}
                    </div>
                )}
            </div>
        </div>
    );
}