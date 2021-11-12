import React, { useRef, useEffect, useState } from "react";

const Photo = ({ alt_description, likes, urls, user }) => {
  const imageRef = useRef();
  const [span, setSpan] = useState(null);

  //   const loadHandler = () => {
  //     let imgHeight = imageRef.current.height;
  //     let spans = Math.ceil(imgHeight / 20);
  //     setSpan(spans);
  //   };
  //   useEffect(() => {
  //     if (urls) {
  //       imageRef.current.addEventListener("load", loadHandler);
  //     }
  //   }, [urls]);

  return (
    <article
      className="card"
      style={{
        // gridRowEnd: `span ${span}`,
        position: "relative",
        transition: " all 1s",
        overflow: " hidden",
        borderRadius: "10px",
      }}
    >
      <img ref={imageRef} src={urls.regular} alt={alt_description} />
      <div className="card-info">
        <h4>{alt_description}</h4>
        <p>Likes : {likes}</p>
      </div>
    </article>
  );
};

export default Photo;
