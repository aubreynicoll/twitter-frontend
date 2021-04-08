import React, { useState, useEffect } from 'react'
import tweetsService from './services/tweetsService'

const App = () => {
  const [tweets, setTweets] = useState([])
  const [tweetsLoaded, setTweetsLoaded] = useState(false)

  // load initial tweets
  useEffect(() => {
    const fetchTweets = async () => {
      let tweetData = JSON.parse(localStorage.getItem('tweets'))

      if (!tweetData) {
        try {
          tweetData = await tweetsService.getTweets()
        } catch (error) {
          console.log(error)
        }
        localStorage.setItem('tweets', JSON.stringify(tweetData))
      }

      setTweets(tweetData)
      setTweetsLoaded(true)
    }
    fetchTweets()
  }, [])

  // const handleGetMoreTweets = () => {
  //   const getMoreTweets = async () => {
  //     let tweetData
  //     try {
  //       tweetData = await tweetsService.getTweets()
  //     } catch (error) {
  //       console.error(error)
  //     }
  //     setTweets([...tweets, ...tweetData])
  //   }
  //   getMoreTweets()
  // }

  if (!tweetsLoaded) return <div>Loading...</div>

  return (
    <div>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>
            {tweet.text}
          </li>
        ))}
      </ul>
      {/* <button type="button" onClick={handleGetMoreTweets}>Get More Tweets!</button> */}
    </div>
  )
}

export default App
