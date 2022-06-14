import { PropTypes } from 'prop-types';

function Header({ children, level = 1, strong, underline, color, ...props }) {
  let Tag = `h${level}`;

  if (level < 1 || level > 6) {
    console.warn(
      'Header only accept `1 | 2 | 3 | 4 | 5 | 6 ` as `level` value'
    );
    Tag = 'h1';
  }

  const fontStyle = {
    fontWeight: strong ? 'bold' : 'normal',
    textDecoration: underline ? 'underline' : undefined,
    color,
  };

  return <Tag style={{ ...props, ...fontStyle }}>{children}</Tag>;
}

Header.defaultProps = {
  level: 1,
  strong: false,
  underline: false,
  color: '#000',
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.number,
  strong: PropTypes.bool,
  underline: PropTypes.bool,
  color: PropTypes.string,
};

export default Header;
