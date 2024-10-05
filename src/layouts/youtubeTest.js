import React, { useState, useEffect } from "react";
import YouTubePlayerModal from "./YouTubePlayerModal"; 

export default function YouTubePlaylist() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null); 
  const playlistId = "PLRe_S2DyB5TwWPnay_1spb2DlfKBia7DU";
  const apiKey = "AIzaSyB4U-9BzIH-z674VrXHz_wN7Phjhg88si0";
  const maxResults = 15;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`
        );
        const data = await response.json();
        if (response.ok) {
          setVideos(data.items);
        } else {
          setError(data.error.message);
        }
      } catch (error) {
        setError("Failed to fetch data from YouTube API");
      }
    };
    fetchVideos();
  }, [playlistId, apiKey]);

  const handleVideoClick = (videoId) => {
    setSelectedVideoId(videoId);
  };

  const handleCloseModal = () => {
    setSelectedVideoId(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My YouTube Playlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.snippet.resourceId.videoId}
            className="video-card cursor-pointer"
            onClick={() => handleVideoClick(video.snippet.resourceId.videoId)}
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full h-40 object-cover mb-2 rounded-md"
            />
            <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
            <p className="text-sm text-gray-600">
              {video.snippet.description.substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>
      {selectedVideoId && (
        <YouTubePlayerModal videoId={selectedVideoId} onClose={handleCloseModal} />
      )}
    </div>
  );
}
