import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import Like from './Like';

function AlarmCard({ notification }) {
  const isComment = Object.prototype.hasOwnProperty.call(
    notification,
    'comment'
  );
  const isLike = Object.prototype.hasOwnProperty.call(notification, 'like');
  if (isComment) {
    return (
      <AlarmCard.Comment
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
      <AlarmCard.Like
        key={notification._id}
        date={notification.createdAt}
        authorId={notification.author._id}
        authorName={notification.author.fullName}
        postId={notification.post}
        postTitle={notification.like ? notification.like.post.title : ''}
      />
    );
  }
}

AlarmCard.propTypes = {
  notification: PropTypes.object.isRequired,
};

AlarmCard.Comment = Comment;
AlarmCard.Like = Like;

export default AlarmCard;
