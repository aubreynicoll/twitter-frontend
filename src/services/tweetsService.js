import axios from 'axios'

const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/2' // temp CORS proxy
let nextToken

const formatTweets = (response) => {
  const tweets = response.data.data.map((d) => ({
    id: d.id,
    date: d.created_at,
    text: d.text,
    name: response.data.includes.users[0].name,
    username: response.data.includes.users[0].username,
    likes: d.public_metrics.like_count,
    retweets: d.public_metrics.retweet_count,
    replies: d.public_metrics.reply_count,
  }))

  return tweets
}

const getTweets = async () => {
  if (nextToken === null) return null

  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
  }

  let params = {
    'tweet.fields': 'created_at,public_metrics,attachments',
    expansions: 'author_id',
  }

  if (nextToken) {
    params = {
      ...params,
      pagination_token: nextToken,
    }
  }

  let response
  try {
    response = await axios.get(`${baseUrl}/users/59952732/tweets`, { params, headers })
  } catch (error) {
    console.error(error)
  }

  nextToken = response.data.meta?.next_token || null

  return formatTweets(response)
}

const tweetsService = {
  getTweets,
}

export default tweetsService
