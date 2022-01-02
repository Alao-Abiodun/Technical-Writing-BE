const redis = require("ioredis");
const dotenv = require("dotenv");
dotenv.config();

const { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD } = process.env;

const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
});

redisClient.on("connect", () => {
  console.log("connected to redis successfully!");
});

redisClient.on("error", (error) => {
  console.log("Redis connection error :", error);
});

module.exports = redisClient;
