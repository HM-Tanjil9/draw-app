import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export const middleware = function(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"] ?? '';
    const decoded = jwt.verify(token as string, JWT_SECRET);
    if(decoded) {
        // @ts-ignore 
        req.userId = decoded.userId;
        next();
    }
}