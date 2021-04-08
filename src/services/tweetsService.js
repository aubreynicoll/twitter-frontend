import axios from 'axios'

const baseUrl = '/api'
let nextToken

const formatTweets = (response) => {
  const { media, users } = response.data.includes

  const tweets = response.data.data.map((d) => ({
    id: d.id,
    date: d.created_at,
    text: d.text,
    name: users[0].name,
    username: users[0].username,
    likes: d.public_metrics.like_count,
    retweets: d.public_metrics.retweet_count,
    replies: d.public_metrics.reply_count,
    media: media.find((m) => (m.type === 'photo' && m.media_key === d.attachments?.media_keys[0])),
    profileImage: users[0].profile_image_url,
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
    expansions: 'author_id,attachments.media_keys',
    'media.fields': 'url',
    'user.fields': 'profile_image_url',
  }

  if (nextToken) {
    params = {
      ...params,
      pagination_token: nextToken,
    }
  }

  let response
  try {
    response = await axios.get(`${baseUrl}/2/users/59952732/tweets`, { params, headers })
  } catch (error) {
    console.error(error)
  }

  nextToken = response.data.meta?.next_token || null

  return [formatTweets(response), Boolean(nextToken)]
}

const tweetsService = {
  getTweets,
}

export default tweetsService
