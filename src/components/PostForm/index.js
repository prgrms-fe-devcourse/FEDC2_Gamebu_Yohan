import { Button, Stack } from '@mui/material';
import usePostForm from '@hooks/usePostForm';
import TextInput from './TextInput';
import SelectInput from './SelectInput';

const channelId = '채널명';

const initdata = {
  tt: '',
  tg: [],
  ct: '',
};

function submitForm(formValue) {
  const { tt, tg, ct } = formValue;
  if (tt.length < 3) {
    alert('제목은 3글자 이상으로 지어주세요!');
    return;
  }
  if (tg.length < 10) {
    alert('내용은 10글자 이상으로 작성해주세요!');
    return;
  }
  alert(`{
  title: {
    tt: ${tt},
    tg: ${tg},
    ct: ${ct},
  }
  image: null,
  channelId: ${channelId},
}`);
}

export default function PostForm() {
  const { formValue, handleInputChange } = usePostForm(initdata);

  return (
    <Stack spacing={2}>
      <TextInput
        name="tt"
        label="제목"
        value={formValue.tt}
        onChange={handleInputChange}
        error={formValue.tt.length < 3}
        placeholder="3글자 이상"
      />
      <SelectInput />
      <TextInput
        name="ct"
        label="내용"
        value={formValue.ct}
        onChange={handleInputChange}
        error={formValue.ct.length < 10}
        placeholder="10글자 이상"
      />
      <Button variant="contained" onClick={submitForm} disableElevation>
        제출
      </Button>
    </Stack>
  );
}
