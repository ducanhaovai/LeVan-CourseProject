import React, { useState } from "react";
import YouTube from "react-youtube";

function YouTubePlayer({ videoId }) {
  // Hàm xử lý khi video sẵn sàng để phát
  const onReady = (event) => {
    // Tự động phát video khi sẵn sàng
    event.target.playVideo();
  };

  // Hàm xử lý khi trạng thái của video thay đổi
  const onStateChange = (event) => {
    // Kiểm tra trạng thái của video
    if (event.data === window.YT.PlayerState.ENDED) {
      alert("The video has ended.");
    }
  };

  // Các tùy chọn cho player
  const playerOptions = {
    height: "500", 
    width: "100%", 
    playerVars: {
      autoplay: 0, 
      controls: 1,
      rel: 0, 
      showinfo: 0, 
      modestbranding: 1, 

      disablekb: 1, 
      iv_load_policy: 3,
    },
  };

  return (
    <div>
      <YouTube
        videoId={videoId} 
        opts={playerOptions} 
        onReady={onReady} 
        onStateChange={onStateChange} 
      />
    </div>
  );
}

export default YouTubePlayer;
