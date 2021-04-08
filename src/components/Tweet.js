/* eslint-disable react/prop-types */
import React from 'react'

const Tweet = ({ tweet }) => {
  return (
    <div className="Tweet-root" key={tweet.id}>
      <div className="Tweet-portrait">
        {' '}
      </div>
      <div className="Tweet-content">
        <div className="Tweet-header">
          <span className="Tweet-name">{tweet.name}</span>
          <span className="Tweet-username">{tweet.username}</span>
          <span className="Tweet-date">{tweet.date}</span>
        </div>
        <div className="Tweet-body">
          {tweet.text}
        </div>
        <div className="Tweet-footer">
          <span className="Tweet-replies">
            Replies:
            {' '}
            {tweet.replies}
          </span>
          <span className="Tweet-retweets">
            Retweets:
            {' '}
            {tweet.retweets}
          </span>
          <span className="Tweet-likes">
            Likes:
            {' '}
            {tweet.likes}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Tweet
