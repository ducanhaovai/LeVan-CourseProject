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
    height: "500", // Chiều cao của video
    width: "100%", // Chiều rộng của video
    playerVars: {
      autoplay: 0, // Không tự động phát
      controls: 1, // Hiển thị các nút điều khiển
      rel: 0, // Không hiển thị các video liên quan
      showinfo: 0, // Không hiển thị thông tin video
      modestbranding: 1, // Ẩn logo YouTube
      fs: 0, // Ẩn nút fullscreen
      disablekb: 1, // Vô hiệu hóa các phím tắt
      iv_load_policy: 3, // Tắt chú thích (annotations)
    },
  };

  return (
    <div>
      <YouTube
        videoId={videoId} // Truyền videoId từ props
        opts={playerOptions} // Tùy chọn cho player
        onReady={onReady} // Sự kiện khi player sẵn sàng
        onStateChange={onStateChange} // Sự kiện khi trạng thái thay đổi
      />
    </div>
  );
}

export default YouTubePlayer;
