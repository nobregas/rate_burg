import rateLimit from "express-rate-limit";

export default function rateLimiter(attemps) {
    return rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: attemps, // limite de 5 tentativas
        message: "Too many attempts. Try again later."
    });
}

