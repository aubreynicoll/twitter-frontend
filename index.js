require('dotenv').config()
const express = require('express')
const cors = require('cors')
const createProxyMiddleware = require('http-proxy-middleware')

const app = express()
const API_URL = 'https://api.twitter.com'

app.use(cors())

app.use(express.static('build'))

app.use('/api', createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
}))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
