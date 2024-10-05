import React from "react";
import YouTubePlaylist from "./youtubeTest";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import CourseDetail from "./CourseDetail";

function Youtube() {
  return (
    <DashboardLayout>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to My Website</h1>
        </header>
        <main>
          <CourseDetail />
        </main>
      </div>
    </DashboardLayout>
  );
}

export default Youtube;
