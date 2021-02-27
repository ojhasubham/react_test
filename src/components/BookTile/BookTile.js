import React, { useState, useEffect } from "react";

import { missingPostersSrc } from "../../constants";

function GifTile({ data }) {
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage("/slices/" + data["poster-image"]);
  }, [data["poster-image"]]);

  const onError = () => {
    setImage(missingPostersSrc);
  };

  if (data)
    return (
      <div>
        <img className="w-100 mb-1" src={image} onError={onError} />
        <p className="book-name text-white">{data.name}</p>
      </div>
    );

  return null;
}

export default GifTile;