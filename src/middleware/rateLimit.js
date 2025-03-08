import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // limite de 5 tentativas
    message: "Too many attempts. Try again later."
});