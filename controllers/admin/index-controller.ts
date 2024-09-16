import { Request, Response } from 'express'

declare module 'express-session' {
  export interface SessionData {
    messages: [];
  }
}

export function index (req: Request, res: Response) {
    res.render("admin/index", {url: req.originalUrl});
}

export function login (req: Request, res: Response) {
    let messages = req.session.messages || [];
    res.render("admin/login",  {url: req.originalUrl, messages: messages});
}