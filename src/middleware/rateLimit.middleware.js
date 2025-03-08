import rateLimit from "express-rate-limit";
import { RateLimitExceededException } from "../exceptions/RateLimitExceededException.js";

export default function rateLimiter(attemps) {
    return rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: attemps, // limite de 5 tentativas
        handler: (req, res) => {
            throw new RateLimitExceededException()
        }
    });
}

