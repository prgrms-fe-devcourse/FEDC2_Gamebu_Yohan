import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '@components/Header';
import Divider from '@components/Divider';
import { COLOR_MAIN, COLOR_SIGNATURE } from '@utils/color';
import { fetch } from '@utils/fetch';
import {
  CHANNELS,
  NOT_FOUND_IMAGE,
  CATEGORIES,
  IMAGES,
} from '@utils/constants';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import BannerImage from '@components/Image/BannerImage';
import Button from '@mui/material/Button';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RecentPostsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SliderWrapper = styled.div`
  margin-bottom: 2rem;
`;

const SliderItemWrapper = styled.div`
  height: 10rem;
`;

const RecentPostsWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  padding: 8px 0;
`;

const PostCategory = styled.div`
  font-size: 0.5rem;
  color: ${COLOR_MAIN};
  margin-right: 0.5rem;
  width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PostTitle = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 2rem;
  color: ${COLOR_SIGNATURE};
  max-width: 10rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 0.2rem;
`;

const PostComments = styled.div`
  font-size: 0.8rem;
  line-height: 2rem;
  color: red;
`;

const sliderOptions = {
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '0px',
  arrows: false,
};

function HomePage() {
  const [posts, setPosts] = useState(null);
  const [channels, setChannels] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [images] = useState(IMAGES);
  useEffect(() => {
    setChannels(CHANNELS);
  }, []);

  const getExtraPostsList = useCallback(async () => {
    const params = { offset: offset + limit, limit };
    const fetchPosts = await fetch('posts', {
      method: 'GET',
      params,
    });

    setOffset(offset + 10);
    setPosts(posts.concat(fetchPosts));
  }, [offset, limit, posts]);

  useEffect(() => {
    const getPostsList = async () => {
      const fetchPosts = await fetch('posts', {
        method: 'GET',
        params: {
          offset: 0,
          limit: 10,
        },
      });

      setPosts(fetchPosts);
    };

    getPostsList();
  }, []);

  return (
    <HomePageContainer>
      <SliderWrapper>
        <Header strong>게임 카테고리</Header>
        <Divider />
        <Slider {...sliderOptions}>
          {channels &&
            channels.map((item) => {
              return (
                <Link to={`/channel/${item.id}`} key={item.id}>
                  <SliderItemWrapper>
                    <BannerImage src={images[item.id] || NOT_FOUND_IMAGE} />
                  </SliderItemWrapper>
                </Link>
              );
            })}
        </Slider>
      </SliderWrapper>
      <RecentPostsContainer>
        <Header strong>최신 글</Header>
        <Divider />
        {posts &&
          posts.map((item) => {
            let { title } = item;
            if (title.startsWith('{')) {
              title = JSON.parse(title).tt || JSON.parse(title).dt;
              // TODO : 추후 게시글 정리 후 dt로 통일
            }
            const categoriesId = item.channel?._id;
            const comments = item.comments.length;

            return (
              <RecentPostsWrapper key={item._id}>
                <Link to={`channel/${categoriesId}`}>
                  <PostCategory>{CATEGORIES[categoriesId]}</PostCategory>
                </Link>
                <Link to={`posts/details/${item._id}`}>
                  <PostTitle>{title}</PostTitle>
                </Link>
                <PostComments>[{comments}]</PostComments>
              </RecentPostsWrapper>
            );
          })}
        <Button
          onClick={() => {
            getExtraPostsList();
          }}
          variant="outlined"
        >
          더보기
        </Button>
      </RecentPostsContainer>
    </HomePageContainer>
  );
}

export default HomePage;
