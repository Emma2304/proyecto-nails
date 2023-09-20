const PAGE_URL = process.env.NODE_ENV === 'production'
    ? 'https://gloss-nails.onrender.com'
    : 'http://localhost:3004'

    const MONGO_URI = process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_TEST

module.exports = { PAGE_URL, MONGO_URI };