import express, { Request, Response } from 'express';
const pothole = express.Router();

import getAllPothole, { findAndAddPothole, getMatchingPotholes } from '../models/pothole.model';
import { addRating } from '../models/rating.model';
import { postImg } from '../models/imgs.model';

pothole.get('/', (req: Request, res: Response) => {
  getAllPothole((data) => res.status(200).send(data));
});

pothole.post('/findPothole', (req: Request, res: Response) => {
  getMatchingPotholes(data => res.status(200).send(data), req.body);
});

pothole.post('/addPothole', (req: Request, res: Response) => {
  const { coordinates, user_id } = req.body;
  const { fixed, rating } = req.body.statusContents;
  const { caption, photoURL } = req.body.updatedImageContents;

  coordinates.fixed = fixed;

  findAndAddPothole((data) => {
    const pothole_id = data;
    addRating(pothole_id,  user_id, fixed, rating);
    postImg(pothole_id, caption, photoURL, user_id);
    res.status(202).json(pothole_id);
  }, coordinates);

  // res.sendStatus(201);
});

export default pothole;
