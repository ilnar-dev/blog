import { Request, Response } from 'express';

export function index (req: Request, res: Response) {
  const images: any[] = [];
  
  res.render("public/images", { images: images});
}