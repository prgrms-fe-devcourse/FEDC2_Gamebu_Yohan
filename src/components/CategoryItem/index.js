import { GameIcon, GameImage, GameTitle } from '@components/Categories';
import { COLOR_MAIN, COLOR_SIGNATURE } from '@utils/color';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarIcon from '@mui/icons-material/Star';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

const GameItem = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  border: 1px solid ${COLOR_MAIN};
  border-radius: 0.5rem;
  overflow: hidden;
`;

function CategoriItem({ img, title, onIconClick, icon, likes }) {
  const handleIconClick = (e) => {
    onIconClick && onIconClick(e);
  };
  return (
    <>
      <GameItem>
        <GameImage src={img} />
        {icon && (
          <GameIcon onClick={handleIconClick}>
            {likes ? (
              <StarIcon fontSize="small" sx={{ color: 'red' }} />
            ) : (
              <StarOutlineRoundedIcon fontSize="small" sx={{ color: 'red' }} />
            )}
          </GameIcon>
        )}
      </GameItem>
      <GameTitle color={COLOR_SIGNATURE} weight={700}>
        {title}
      </GameTitle>
    </>
  );
}

CategoriItem.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  onIconClick: PropTypes.func,
  icon: PropTypes.bool,
  likes: PropTypes.bool,
};

CategoriItem.defaultProps = {
  img: '',
  title: '',
  onIconClick: undefined,
  icon: false,
  likes: false,
};
export default CategoriItem;
