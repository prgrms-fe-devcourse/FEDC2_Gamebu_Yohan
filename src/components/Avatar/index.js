import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import ImageComponent from '@components/Image';
import AvatarGroup from './AvatarGroup';

const ShapeToCssValue = {
  circle: '50%',
  round: '10px',
  square: '0',
};

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid #dadada;
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  overflow: hidden;
  background-color: #eee;
  & > img {
    transition: opacity 0.2s ease-out;
  }
`;

function Avatar({
  lazy,
  threshold,
  src,
  size,
  shape,
  placeholder,
  alt,
  mode,
  __TYPE,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
  }, [src]);
  return (
    <AvatarWrapper {...props} shape={shape}>
      <ImageComponent
        block
        lazy={lazy}
        threshold={threshold}
        width={size}
        height={size}
        src={src}
        placeholder={placeholder}
        alt={alt}
        mode={mode}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </AvatarWrapper>
  );
}

Avatar.defaultProps = {
  lazy: false,
  threshold: 0.5,
  src: '',
  size: 70,
  shape: 'circle',
  placeholder: '',
  alt: '',
  mode: 'cover',
  __TYPE: 'Avatar',
};

Avatar.propTypes = {
  lazy: propTypes.bool,
  threshold: propTypes.number,
  src: propTypes.string,
  size: propTypes.oneOfType([propTypes.number, propTypes.string]),
  shape: propTypes.oneOf(['circle', 'round', 'square']),
  placeholder: propTypes.string,
  alt: propTypes.string,
  mode: propTypes.oneOf(['contain', 'cover', 'fill']),
  __TYPE: propTypes.oneOf(['Avatar']),
};

Avatar.Group = AvatarGroup;

export default Avatar;
