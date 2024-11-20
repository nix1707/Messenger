import React from "react";
import Video from "./Video";
import Photo from "./Photo";
import { MediaType } from "../../../models/media";

interface MediaRendererProps {
  type: MediaType;
  url: string;
}

const MediaRenderer: React.FC<MediaRendererProps> = ({ type, url }) => {

  const mediaComponents: Record<MediaType, JSX.Element> = {
      [MediaType.Image]: <Photo src={url} />,
      [MediaType.Video]: <Video src={url} />,
      [MediaType.Audio]: <p>Will be introduced soon</p>
  };

  return mediaComponents[type] || null;
};

export default MediaRenderer;
