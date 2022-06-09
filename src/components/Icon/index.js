import React from 'react';
import { Buffer } from 'buffer';
import styled from '@emotion/styled';
import propTypes from 'prop-types';

const IconWrapper = styled.i`
  display: inline-block;
`;

const featherIcons = require('feather-icons');

function Icon({ name, size, strokeWidth, color, rotate, ...props }) {
  const shapeStyle = {
    width: size,
    height: size,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
  };
  const iconStyle = {
    'stroke-width': strokeWidth,
    stroke: color,
    width: size,
    height: size,
  };
  const icon = featherIcons.icons[name];
  const svg = icon ? icon.toSvg(iconStyle) : '';
  const base64 = Buffer.from(svg, 'utf-8').toString('base64');
  return (
    <IconWrapper style={shapeStyle} {...props}>
      <img src={`data:image/svg+xml;base64,${base64}`} alt={name} />
    </IconWrapper>
  );
}

Icon.propTypes = {
  name: propTypes.string,
  size: propTypes.oneOfType([propTypes.number, propTypes.string]),
  strokeWidth: propTypes.oneOfType([propTypes.number, propTypes.string]),
  color: propTypes.string,
  rotate: propTypes.number,
};

Icon.defaultProps = {
  name: 'box',
  size: 16,
  strokeWidth: 2,
  color: '#000',
  rotate: 0,
};
export default Icon;
