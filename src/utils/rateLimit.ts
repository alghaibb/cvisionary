import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/upstash";

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "120s"),
})

export default rateLimit;
