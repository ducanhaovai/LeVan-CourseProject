import React from "react";

const ContentComponent = ({ content }) => {
  if (!content) {
    return null;
  }

  return (
    <div>
      <h4>{content.title}</h4>
      <p>{content.description}</p>
      <p>Type: {content.content_type}</p>
      {content.content_type === "video" && (
        <video width="320" height="240" controls>
          <source src={content.content_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {content.content_type === "document" && (
        <a href={content.content_url} target="_blank" rel="noopener noreferrer">
          Open Document
        </a>
      )}
    </div>
  );
};

export default ContentComponent;
