import TextInput from '@components/TextInput';
import SelectInput from '@components/SelectInput';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';

const channelId = '채널명';

export default function PostForm() {
  const [postTitle, setPostTitle] = useState('defaultTitle');
  const [postTag, setPostTag] = useState('defaultTag');
  const [postContent, setPostContent] = useState('defaultContent');

  const handleTitleChange = (e) => {
    setPostTitle(e.target.value);
  };
  const handleTagChange = (e) => {
    setPostTag(e.target.value);
  };
  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const submitForm = () => {
    if (postTitle.length < 3) {
      alert('제목은 3글자 이상으로 지어주세요!');
      return;
    }
    if (postContent.length < 10) {
      alert('내용은 10글자 이상으로 작성해주세요!');
      return;
    }
    alert(`{
    title: {
      tt: ${postTitle},
      tg: ${postTag},
      bd: ${postContent},
    }
    image: null,
    channelId: ${channelId},
  }`);
  };

  return (
    <Stack spacing={2}>
      <TextInput
        name="form-input-title"
        title="제목"
        fieldSize="small"
        onChange={handleTitleChange}
        error={postTitle.length < 3}
        placeholder="3글자 이상"
      />
      <SelectInput />
      <TextInput
        name="form-input-content"
        title="내용"
        fieldSize="small"
        onChange={handleContentChange}
        error={postContent.length < 10}
        placeholder="10글자 이상"
        rows={3}
      />
      <Button variant="contained" onClick={submitForm} disableElevation>
        제출
      </Button>
    </Stack>
  );
}
