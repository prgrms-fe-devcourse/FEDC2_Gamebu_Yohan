const comment = {
  _id: String,
  comment: String,
  author: User,
  post: String, // 포스트 id"createdAt": String,
  updatedAt: String,
};
const DUMMY_DATA = {
  authorId: '629f07fa7e01ad1cb7250131',
  channelId: '62aa146171f64a5582899ae9',
  comments: [
    {
      _id: '코멘트 id',
      comment:
        '이샛기 개몬함 ㄹㅇ 이샛기 개몬함 ㄹㅇ 이샛기 개몬함 ㄹㅇ 이샛기 개몬함 ㄹㅇ',
      updatedAt: '2022-06-17',
      author: { _id: '댓글작성자id', fullName: '하단동네이마르' },
    },
    {
      _id: '코멘트 id2',
      comment: 'ㅈㄹ ㄴㄴ',
      updatedAt: '2022-06-17',
      author: { _id: '629f07fa7e01ad1cb7250131', fullName: 'EonDongKim' },
    },
  ],
  content: '',
  fullName: 'EonDongKim',
  isLiked: false,
  postId: '62aa1d0f71f64a558289a3aa',
  tag: ['칼바람', '파티모집'],
  title: '칼바람 할사람',
};
let needData = {},
needData = {
	authorId: res.author._id,
	channelId: res.channel._id,
	comments: res.comments,
	content: state.content,
	fullName: state.fullName,
	isLiked: false,
	postId: res._id,||state.postId,
	tag: state.tag,
	title: state.title
}

<Modal isVisible={modalVisible} onClose={() => setModalVisble(false)} />
      <CommentsContainer onClick={() => setModalVisble(true)}>
        {detailData &&
          detailData.comments.map((item, i) => {
            if (isNew && i === 0) {
              return (
                <Comment
                  key={item._id}
                  commentId={item._id}
                  author={item.author}
                  comment={item.comment}
                  updatedAt={<NewIcon color="inherit" />}
                  userId={userId}
                  handleDeleteClick={handleDeleteClick}
                />
              );
            }
            return (
              <Comment
                key={item._id}
                commentId={item._id}
                author={item.author}
                comment={item.comment}
                updatedAt={item.updatedAt.slice(0, 10)}
                userId={userId}
                handleDeleteClick={handleDeleteClick}
              />
            );
          })}
      </CommentsContainer>