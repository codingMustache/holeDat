import express, { Request, Response } from 'express';
import { getAllRatingsById } from '../models/rating.model';
const rating = express.Router();

import { getPotholesAtIds, addRating} from '../models/rating.model';

rating.post('/potholeAtIds', (req: Request, res: Response) => {
  getPotholesAtIds(req.body.idArr, (data) => res.status(201).send(data));
});

rating.post('/fromPh', (req: Request, res: Response) => {
   const { id, fixed } = req.body;
   const { type, value } = req.body.ratingStatusObj;
  const { userId_user } = req.body.user;
  console.log(req)
  res.send(200)
   if (type === 'rating') {
     addRating(id, userId_user, fixed, value);
     res.sendStatus(202);
   }else if(type === 'status') {
    addRating(id, userId_user, value, 0);
     res.sendStatus(202);
   }

});


rating.post('/pothole', (req: Request, res: Response)=>{
  const { id, status, rating, user} = req.body;
  addRating(id, user.userId_user, status, rating);
    res.sendStatus(202);
})

rating.get('/rating:id', (req: Request, res: Response) => {
  const { id } = req.params;
  getAllRatingsById(id, (data) => {
    const ratingArr = data.map((rating) => {
      return rating.dataValues.overall;
    });
    res.status(200).send(ratingArr);
  });
});

export default rating;
