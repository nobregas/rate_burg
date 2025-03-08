import rateLimit from "express-rate-limit";

export function rateLimiter(attemps) {
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: attemps, // limite de 5 tentativas
        message: "Too many attempts. Try again later."
    });
}

