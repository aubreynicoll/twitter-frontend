/* eslint-disable react/prop-types */
import React from 'react'
import { ReactComponent as LikeIcon } from '../assets/like-icon.svg'
import { ReactComponent as CommentIcon } from '../assets/comment-icon.svg'
import { ReactComponent as RetweetIcon } from '../assets/retweet-icon.svg'

const Tweet = ({ tweet }) => {
  return (
    <div className="Tweet-root">
      <div className="Tweet-portrait">
        <img src={tweet.profileImage} alt="" width="64" />
      </div>
      <div className="Tweet-content">
        <div className="Tweet-header">
          <span className="Tweet-name">{tweet.name}</span>
          <span className="Tweet-username">
            @
            {tweet.username}
          </span>
          <span className="Tweet-date">{tweet.date.substring(0, 10)}</span>
        </div>
        <div className="Tweet-body">
          {tweet.text}
        </div>
        <div className="Tweet-media">
          {tweet.media && <img src={tweet.media.url} alt="" />}
        </div>
        <div className="Tweet-footer">
          <div className="Tweet-replies">
            <CommentIcon />
            {tweet.replies}
          </div>
          <div className="Tweet-retweets">
            <RetweetIcon />
            {tweet.retweets}
          </div>
          <div className="Tweet-likes">
            <LikeIcon />
            {tweet.likes}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
