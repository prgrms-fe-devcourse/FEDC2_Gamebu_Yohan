import PropTypes from 'prop-types';
import { Button, CircularProgress, Stack } from '@mui/material';
import { authFetch } from '@utils/fetch';
import { useState } from 'react';
import useForm from '@hooks/useForm';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import MultiLineTextInput from './MultiLineTextInput';

const channelId = '629f0c7c7e01ad1cb7250151';

const Tags = [
  '파티',
  '경쟁',
  '레이드',
  'FPS',
  '듀오',
  'AOS',
  'RPG',
  '딜러',
  '힐러',
  '탱커',
  '서폿',
];

export default function PostForm({ initialValues }) {
  const { values, isLoading, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit: async () => {
      const { title, tags, content } = values;
      const response = await authFetch('posts/create', {
        method: 'POST',
        data: {
          title: JSON.stringify({
            dt: title,
            tg: tags,
            dd: content,
          }),
          image: null,
          channelId,
        },
      });

      const isError = Boolean(response?.response);

      if (isError) {
        throw new Error('Fetch 오류');
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
      <Stack spacing={2}>
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
          rows={5}
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
      </Stack>
    </form>
  );
}

PostForm.propTypes = {
  initialValues: PropTypes.object,
};

PostForm.defaultProps = {
  initialValues: {
    title: '',
    tags: [],
    content: '',
  },
};
