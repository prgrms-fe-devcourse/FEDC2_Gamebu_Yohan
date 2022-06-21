import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@mui/material';
import { authFetch } from '@utils/fetch';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '@hooks/useForm';
import useOurSnackbar from '@hooks/useOurSnackbar';
import styled from '@emotion/styled';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import MultiLineTextInput from './MultiLineTextInput';

const Tags = [
  '파티',
  '경쟁',
  '레이드',
  'FPS',
  '듀오',
  'RPG',
  '딜러',
  '힐러',
  '탱커',
  '서폿',
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default function PostForm({ channelId, postId, post }) {
  const [isComplete, setComplete] = useState(false);
  const navigate = useNavigate();
  const navigateTo = postId
    ? `/posts/details/${postId}`
    : `/channel/${channelId}`;
  const renderSnackbar = useOurSnackbar();
  useEffect(() => {
    if (isComplete) {
      navigate(navigateTo, { replace: true });
    }
  }, [isComplete, navigate, navigateTo]);
  const initialValues = post || { title: '', tags: [], content: '' };
  const { values, isLoading, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit: async () => {
      const { title, tags, content } = values;
      const response = await authFetch(
        `posts/${postId ? 'update' : 'create'}`,
        {
          method: `${postId ? 'PUT' : 'POST'}`,
          data: {
            postId,
            channelId,
            title: JSON.stringify({
              dt: title,
              tg: tags,
              dd: content,
            }),
            image: null,
          },
        }
      );

      const isError = Boolean(response?.response);

      if (isError) {
        renderSnackbar(`${postId ? '글 수정' : '글 작성'}`, false);
        throw new Error('Fetch 오류');
      } else {
        renderSnackbar(`${postId ? '글 수정' : '글 작성'}`, true);
        setComplete(true);
      }
    },
    validate: (formValues) => {
      const { title, tags, content } = formValues;
      const newErrors = {};
      if (title.length < 3)
        newErrors.title = '3글자 이상의 제목을 입력해주세요!';
      if (tags.length < 1) newErrors.tags = '1개 이상의 태그를 설정해주세요!';
      if (content.length < 10)
        newErrors.content = '10글자 이상의 내용을 입력해주세요!';
      return newErrors;
    },
  });
  const { title, tags, content } = values;

  const [focused, setFocused] = useState({
    title: false,
    tags: false,
    content: false,
  });

  const handleOnBlur = (name) => () => {
    setFocused({ ...focused, [name]: true });
  };

  const handleOnClick = () => {
    const allFocused = { ...focused };
    Object.keys(allFocused).forEach((key) => {
      allFocused[key] = true;
    });
    setFocused(allFocused);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <TextInput
          name="title"
          label="제목"
          value={title}
          onBlur={handleOnBlur('title')}
          onChange={handleChange}
          error={focused.title && title.length < 3}
          placeholder="3글자 이상"
          helperText="3글자 이상을 입력해주세요!"
        />
        <SelectInput
          name="tags"
          label="태그"
          options={Tags}
          value={tags}
          onBlur={handleOnBlur('tags')}
          onChange={handleChange}
          error={focused.tags && tags.length < 1}
          helperText="하나 이상의 태그를 지정해주세요!"
        />
        <MultiLineTextInput
          name="content"
          label="내용"
          value={content}
          onBlur={handleOnBlur('content')}
          onChange={handleChange}
          error={focused.content && content.length < 10}
          placeholder="10글자 이상"
          helperText="10글자 이상을 입력해주세요!"
          rows={15}
        />
        <Button
          type="submit"
          onClick={handleOnClick}
          variant="contained"
          disabled={isLoading}
          disableElevation
        >
          {isLoading ? <CircularProgress color="inherit" /> : '제출'}
        </Button>
      </Container>
    </form>
  );
}

PostForm.propTypes = {
  channelId: PropTypes.string.isRequired,
  postId: PropTypes.string,
  post: PropTypes.shape({
    title: PropTypes.string,
    tag: PropTypes.arrayOf(PropTypes.string),
    content: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  postId: '',
  post: {
    title: '',
    tag: [],
    content: '',
  },
};
