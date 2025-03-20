const MONGO_DB_URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT || 5000;
const JSON_WEB_TOKEN_SECRET = process.env.JSON_WEB_TOKEN_SECRET;
module.exports = {
    MONGO_DB_URL,
    PORT,
    JSON_WEB_TOKEN_SECRET
}