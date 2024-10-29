const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

// function fib(index) {
//   if (index < 2) return 1;
//   return fib(index - 1) + fib(index - 2);
// }
// Fibonacci function with memoization
const fibMemo = {};
function fib(index) {
  if (index in fibMemo) return fibMemo[index];
  if (index < 2) return 1;
  fibMemo[index] = fib(index - 1) + fib(index - 2);
  return fibMemo[index];
}
sub.on("message", (channel, message) => {
  redisClient.hset("values", message, fib(parseInt(message)));
});
sub.subscribe("insert");
