import { Button, Stack } from '@mui/material';
import usePostForm from '@hooks/usePostForm';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import MultiLineTextInput from './MultiLineTextInput';

const channelId = '채널명';

const initdata = {
  title: '',
  tags: [],
  content: '',
};

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

export default function PostForm() {
  const { formValue, handleInputChange } = usePostForm(initdata);
  const { title, tags, content } = formValue;

  return (
    <Stack spacing={2}>
      <TextInput
        name="title"
        label="제목"
        value={title}
        onChange={handleInputChange}
        error={title.length < 3}
        placeholder="3글자 이상"
      />
      <SelectInput
        name="tags"
        label="태그"
        options={Tags}
        value={tags}
        onChange={handleInputChange}
        error={tags.length < 1}
      />
      <MultiLineTextInput
        name="content"
        label="내용"
        value={content}
        onChange={handleInputChange}
        error={content.length < 10}
        placeholder="10글자 이상"
        rows={5}
      />
      <Button variant="contained" disableElevation>
        제출
      </Button>
    </Stack>
  );
}
