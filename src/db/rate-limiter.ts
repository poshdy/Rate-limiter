const BUCKET: Record<string, { counter: number; expiresAt: number }> = {};

export const rateLimiter = async (
  ip: string,
  limit: number,
  interval: number
) => {
  if (!ip) {
    throw Error("Ip address not provided");
  }

  const bucket = BUCKET[ip] || { counter: 0, expiresAt: 0 };

  if (!BUCKET[ip]) {
    BUCKET[ip] = bucket;
  }

  if (bucket.expiresAt < Date.now()) {
    bucket.counter = 0;
    bucket.expiresAt = Date.now() + interval;
  }
  bucket.counter++;
  console.log("counter", bucket.counter);

  if (bucket.counter > limit) {
    throw Error("limit exceeded");
  }
};
