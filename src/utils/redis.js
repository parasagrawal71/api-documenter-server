import { createClient } from "redis";

let redisClient;

/**
 * CLI Commands:
 * (redis-cli)
 * ---
 * keys *
 * get key_name
 * del key_name
 * flushall
 */

async function initRedis() {
  if (!redisClient) {
    redisClient = createClient();

    redisClient.on("error", (err) => {
      console.error("❌ Redis error:", err);
    });

    await redisClient.connect();
    console.log("✅ Redis connected");
  }
}

/**
 * Sets a value in Redis.
 * @param key Redis key
 * @param value Value to set
 */
export async function setValue(key, value) {
  await initRedis();
  await redisClient.set(key, value);
}

/**
 * Gets a value from Redis.
 * @param key Redis key
 * @returns Value from Redis or null
 */
export async function getValue(key) {
  await initRedis();
  const val = await redisClient.get(key);
  return val;
}
