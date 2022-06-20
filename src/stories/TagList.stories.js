import TagChip from '@components/TagChip';
import TagList from '@components/TagChip/TagList';
import ShortTagList from '@components/TagChip/ShortTagList';

const tags = [
  '파티',
  '경쟁',
  '레이드',
  'FPS',
  '듀오',
  '딜러',
  '힐러',
  '탱커',
  '서폿',
];

const shortTags = ['파티', '경쟁', '레이드'];

const defaultsx = {
  width: 400,
  border: '1px solid gray',
};

export default {
  title: 'Component/TagList',
  component: ShortTagList,
  TagList,
  argTypes: {},
};

export function Default(args) {
  return (
    <>
      <TagChip label="RPG" index="지렁이" />
      <ShortTagList tags={tags} simple={false} sx={defaultsx} {...args} />
      <br />
      <ShortTagList tags={tags} simple sx={defaultsx} {...args} />
      <br />
      <ShortTagList tags={shortTags} simple={false} sx={defaultsx} {...args} />
      <br />
      <ShortTagList tags={shortTags} simple sx={defaultsx} {...args} />
      <br />
      <TagList tags={tags} sx={defaultsx} {...args} />
      <br />
      <TagList tags={tags} simple sx={defaultsx} {...args} />
    </>
  );
}
