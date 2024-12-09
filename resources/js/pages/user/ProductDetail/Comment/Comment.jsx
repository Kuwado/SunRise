import React from 'react';
import styles from './Comment.module.scss';

const Comment = ({ username, comment, rating }) => {
  return (
    <div className={styles.comment}>
      <p className={styles.username}>{username}</p>
      <p className={styles.userComment}>{comment}</p>
      <div className={styles.rating}>
        {'⭐'.repeat(rating)} {Array(5 - rating).fill('☆').join('')}
      </div>
    </div>
  );
};

export default Comment;
