'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { search, getImages } from './api/actions';


interface IAlbum {
	deletehash: string;
	title: string;
}

interface IImage {
	id: string;
	link: string;
	title?: string;
	width: number;
	height: number;
}

export default function Home() {
	const [query, setQuery] = useState<string>("Guitar");
	const [albums, setAlbums] = useState([]);
	const [images, setImages] = useState<IImage[]>([]);
	const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);

	const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data = await search(query);

			//could not find property "deletehash" on the object so this is a workaround...
			setAlbums(data.data.filter((item:any) => item.is_album).map((album:any) => ({ 
				...album, 
				deletehash: album.id 
			})));

		} catch (error) {	
			console.error('Error fetching albums:', error);
		}
	};

	const handleAlbumSelect = async (albumHash: string) => {
		console.log(albumHash); 
		try {
			const response = await getImages(albumHash);
			console.log(response);
			setImages(response);
			setSelectedAlbum(albumHash);
		} catch (error) {
			console.error('Error fetching images:', error);
		}
	};

	return (

			<div className="flex flex-col">
				<div className="sticky top-0 z-10 bg-slate-800">
					<div className="flex flex-row items-center pl-4 h-48">
						<form onSubmit={handleSearch}>
							<div className="flex flex-row gap-2 bg-slate-800">
								<input
									type="text"
									className="p-2 rounded-full focus:outline-none"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder="Enter search query"
								/>
								<button
									type="submit"
									className="py-2 px-4 rounded-full bg-blue-500 text-white"
								>
									Search
								</button>
							</div>
						</form>
					</div>
				</div>

				<div className="flex flex-row">
					<div className="flex flex-wrap max-w-[260px] gap-4 p-4 border-slate-200 border-r h-screen overflow-y-auto">
						{albums.map((album: IAlbum, idx: number) => (
							<button
								key={"album-" + idx}
								onClick={() => handleAlbumSelect(album.deletehash)}
								className="w-1/5 min-w-[200px] max-w-[250px] flex-grow-0 flex-shrink-0 
											flex flex-col items-center justify-center p-4 
											bg-slate-100 rounded-lg shadow-md 
											hover:bg-slate-200 transition-colors
											last:mb-20"
							>
								<span className="text-3xl mb-2">&#128449;</span>
								<span className="text-center text-sm font-medium truncate max-w-full">
									{album.title || 'Untitled'}
								</span>
							</button>
						))}
					</div>

					<div>
						{selectedAlbum && (
							<div className="flex flex-row flex-wrap p-4 gap-4 overflow-y-auto">
								{images.map((image: IImage) => (
									<Link 
										key={image.id}
										href={`/image/?albumHash=${selectedAlbum}&imageHash=${image.id}`}>
										<Image
											
											src={image.link}
											alt={image.title || 'Image'}
											width={200}
											height={200}
											className="rounded-lg"
										/>
									</Link>
								))}
								
							</div>
						)}
					</div>


				</div>


			</div>
			);
}