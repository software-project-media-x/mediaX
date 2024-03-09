'use client';
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const searchVideos = async (searchTerm: string) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        part: 'snippet',
        maxResults: 10, // Limit to 10 results for demonstration
        q: searchTerm,
        key: 'AIzaSyCG9NC1zxe77ExNbO_SgLz1lCtQp5SW7bI',
      },
    });
    return response.data.items; // Return the video items array
  } catch (error) {
    console.error('Error fetching YouTube search results:', error);
    return []; // Return an empty array in case of errors
  }
};


export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
    if (searchTerm) {
      const results = await searchVideos(searchTerm);
      setSearchResults(results);
    } else {
      setSearchResults([]); // Clear results when search term is empty
    }
  };
  return (
    <main className="">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold">Search YouTube</h1> 
        <div>
          <div className="flex flex-col space-y-4">
          <Input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search YouTube..." />
          </div>
        </div>
        {searchResults.length > 0 && (
          <ul className="list-none space-y-4">
            {searchResults.map((result: any) => (
              <li>
                <a href={`https://www.youtube.com/watch?v=${result.id.videoId}`}>
                  {/* Consider adding video thumbnail and a short excerpt */}
                  <img src={result.snippet?.thumbnails?.default?.url} alt={`Thumbnail for ${result.snippet?.title}`} />
                  {result.snippet?.title}
                </a>
              </li>
            ))}
          </ul>
        )}

      </div>
    </main>
    
  )
}