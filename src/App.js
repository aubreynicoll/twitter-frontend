import React, { useState, useEffect } from 'react'
import tweetsService from './services/tweetsService'
import Tweet from './components/Tweet'
import Header from './components/Header'

const App = () => {
  const [tweets, setTweets] = useState([])
  const [tweetsLoaded, setTweetsLoaded] = useState(false)
  const [hasMoreTweets, setHasMoreTweets] = useState(false)

  useEffect(() => {
    const fetchTweets = async () => {
      let tweetData
      let hasNextToken

      try {
        [tweetData, hasNextToken] = await tweetsService.getTweets()
      } catch (error) {
        console.log(error)
      }

      setTweets(tweetData)
      setTweetsLoaded(true)
      setHasMoreTweets(hasNextToken)
    }
    fetchTweets()
  }, [])

  const handleGetMoreTweets = () => {
    const getMoreTweets = async () => {
      let tweetData
      let hasNextToken

      try {
        [tweetData, hasNextToken] = await tweetsService.getTweets()
      } catch (error) {
        console.error(error)
      }

      setTweets([...tweets, ...tweetData])
      setHasMoreTweets(hasNextToken)
    }
    getMoreTweets()
  }

  if (!tweetsLoaded) return <div>Loading...</div>

  return (
    <div>
      <Header />
      <div className="App-container">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
        {hasMoreTweets && <button className="App-button" type="button" onClick={handleGetMoreTweets}>Get More Tweets!</button>}
      </div>
    </div>
  )
}

export default App
