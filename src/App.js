import React, { useState, useEffect } from 'react'
import tweetsService from './services/tweetsService'
import Tweet from './components/Tweet'
import Header from './components/Header'

const App = () => {
  const [tweets, setTweets] = useState([])
  const [tweetsLoaded, setTweetsLoaded] = useState(false)

  useEffect(() => {
    const fetchTweets = async () => {
      let tweetData

      try {
        tweetData = await tweetsService.getTweets()
      } catch (error) {
        console.log(error)
      }

      setTweets(tweetData)
      setTweetsLoaded(true)
    }
    fetchTweets()
  }, [])

  const handleGetMoreTweets = () => {
    const getMoreTweets = async () => {
      let tweetData
      try {
        tweetData = await tweetsService.getTweets()
      } catch (error) {
        console.error(error)
      }
      setTweets([...tweets, ...tweetData])
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
        <button className="App-button" type="button" onClick={handleGetMoreTweets}>Get More Tweets!</button>
      </div>
    </div>
  )
}

export default App
