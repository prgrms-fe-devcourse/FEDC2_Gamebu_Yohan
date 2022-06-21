import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  padding: 1rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InfoContainer = styled.div`
  width: calc(100% - 34px);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ContentWrapper = styled.div`
  margin: 0.2rem 0;
  word-break: break-all;
  width: 100%;
`;

const DateWrapper = styled.div`
  font-size: 0.6rem;
`;
const NameWrapper = styled.div`
  max-width: 65%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;
  font-weight: bold;
`;

function Comment({
  commentId,
  comment,
  updatedAt,
  author,
  deletable,
  onDelete,
}) {
  const handleDelete = (e) => {
    onDelete && onDelete(e);
  };
  return (
    <Container>
      <HeaderContainer>
        <InfoContainer>
          <NameWrapper>{author.fullName}</NameWrapper>
          <DateWrapper>{updatedAt}</DateWrapper>
        </InfoContainer>
        {deletable && (
          <IconButton size="small" onClick={() => handleDelete(commentId)}>
            <DeleteForeverIcon />
          </IconButton>
        )}
      </HeaderContainer>
      <ContentWrapper>{comment}</ContentWrapper>
    </Container>
  );
}
Comment.propTypes = {
  author: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
  }).isRequired,
  updatedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  commentId: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  deletable: PropTypes.bool,
};
Comment.defaultProps = {
  deletable: false,
  onDelete: undefined,
};
export default Comment;
