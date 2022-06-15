import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// 컴포넌트가 생성될 때 재생성을 방지하기 위해서 전역적으로 생성
let observer = null;
const LOAD_IMG_EVENT_TYPE = 'loadImage';
const onIntersection = (entries, io) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
};

function Image({
  src,
  width,
  height,
  alt,
  mode,
  block,
  lazy,
  threshold,
  placeholder,
  style,
  ...props
}) {
  const imageStyle = {
    display: block ? 'block' : undefined,
    height,
    width,
    objectFit: mode,
  };
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  useEffect(() => {
    if (!lazy) {
      setLoaded(true);
      return;
    }
    const handleLoadImage = () => {
      setLoaded(true);
    };
    const imgElement = imgRef.current;
    imgElement &&
      imgElement.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
    return () => {
      imgElement &&
        imgElement.removeEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
    };
  }, [lazy]);

  useEffect(() => {
    if (!lazy) return;
    observer = new IntersectionObserver(onIntersection, { threshold });
    imgRef.current && observer.observe(imgRef.current);
  }, [lazy, threshold]);

  return (
    <img
      ref={imgRef}
      src={loaded ? src : placeholder}
      alt={alt}
      style={{ ...imageStyle, ...style }}
      {...props}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  mode: PropTypes.oneOf(['contain', 'cover', 'fill']),
  block: PropTypes.bool,
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  placeholder: PropTypes.string,
  style: PropTypes.object,
};

Image.defaultProps = {
  alt: '',
  width: 100,
  height: 80,
  mode: PropTypes.string,
  block: PropTypes.bool,
  lazy: PropTypes.bool,
  threshold: 0,
  placeholder: PropTypes.string,
  style: {},
};

export default Image;
