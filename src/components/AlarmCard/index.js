import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import Like from './Like';
import Message from './Message';

function AlarmCard({ notification }) {
  const isComment = Object.prototype.hasOwnProperty.call(
    notification,
    'comment'
  );
  const isLike = Object.prototype.hasOwnProperty.call(notification, 'like');
  const isMessage = Object.prototype.hasOwnProperty.call(
    notification,
    'message'
  );
  if (isComment) {
    return (
      <Comment
        key={notification._id}
        date={notification.createdAt}
        authorId={notification.author._id}
        authorName={notification.author.fullName}
        postId={notification.post}
        comment={notification.comment ? notification.comment.comment : ''}
      />
    );
  }
  if (isLike) {
    return (
      <Like
        key={notification._id}
        date={notification.createdAt}
        authorId={notification.author._id}
        authorName={notification.author.fullName}
        postId={notification.post}
        postTitle={notification.like ? notification.like.post.title : ''}
      />
    );
  }
  if (isMessage) {
    return (
      <Message
        key={notification._id}
        date={notification.createdAt}
        authorId={notification.author._id}
        authorName={notification.author.fullName}
      />
    );
  }
}

AlarmCard.propTypes = {
  notification: PropTypes.object.isRequired,
};

AlarmCard.Comment = Comment;
AlarmCard.Like = Like;
AlarmCard.Message = Message;

export default AlarmCard;
