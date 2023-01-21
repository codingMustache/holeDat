/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from 'express';
const imgs = express.Router();
import {
  getAllImgs,
  getAllImgsWithAddress,
  getPotholeImgByPhId,
  getTopThree,
  getAllPotholeImgByPhId,
  getPotholeAtUserId,
  getTopPotholes,
} from '../models/imgs.model';
import multer from 'multer';
import dotenv from 'dotenv';
import fs from 'fs-extra';
dotenv.config();
import cloudinary from 'cloudinary';

const upload = multer({ dest: './tmp/' }).single('file');

// returns all images of pothole (a test endpoint)
imgs.get('/', (req: Request, res: Response) => {
  getAllImgs((data) => res.status(222).send(data.slice(0, 3)));
});

// Adds img to Cloud
imgs.post('/addimg', upload, (req: any, res: Response) => {
  const api_key = process.env.API_KEY;
  const cloud_name = process.env.CLOUD_NAME;
  const api_secret = process.env.CLOUD_SECRET;
  const file = req.file.path;

  cloudinary.v2.uploader
    .upload(file, {
      api_key,
      api_secret,
      cloud_name,
      allowed_formats: ['jpg', 'png', 'heic', 'heif'],
      width: 600,
      height: 600,
      crop: 'fit',
      quality: 'auto:good',
      format: 'jpg',
    })
    .then((data) => {
      res.status(201).json(data.url);
    })
    .catch((err) => console.log(err));

  fs.emptyDir('./tmp');
});

// get ALL imgs of pothole by id AND user data
imgs.get('/potholeimgs:id', (req: Request, res: Response) => {
  const { id } = req.params;
  getAllPotholeImgByPhId(id, (data) => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.sendStatus(400);
    }
  });
});

// gets one image for the pothole
imgs.get('/potholeimg:id', (req: Request, res: Response) => {
  const { id } = req.params;
  getPotholeImgByPhId(id, (data) => {
    if (data) {
      const { photoURL, caption } = data.dataValues;
      const resObj = { photoURL, caption };
      res.status(200).send(resObj);
    } else {
      res.sendStatus(400);
    }
  });
});

imgs.get('/feed', (req: Request, res: Response) => {
  const { offset, sortAge, fixedStatus } = req.query;
  // console.log(sortAge)
  if (sortAge === 'New') {
    getAllImgsWithAddress(offset, 'createdAt', 'DESC', fixedStatus, (data) =>
      res.status(200).send(data)
    );
  } else if (sortAge === 'Old') {
    getAllImgsWithAddress(offset, 'createdAt', 'ASC', fixedStatus, (data) =>
      res.status(200).send(data)
    );
  }
});

imgs.get('/stats', (req: Request, res: Response) => {
  getTopThree((data) => res.status(231).send(data.splice(0, 3)));
});

imgs.get('/phstats', (req: Request, res: Response) => {
  getTopPotholes((data) => {
    let arrB: any = [];
    arrB = data.sort((a, b) => b.count - a.count).splice(0, 3);
    arrB.forEach((ph, i) => {
      getPotholeImgByPhId(ph.pothole_id, (v: any) => (arrB[i].photoURL = v.dataValues.photoURL));
    });
    setTimeout(() => res.status(200).send(arrB), 500);
  });
});

imgs.get('/atUser:id', (req: Request, res: Response) => {
  // calls a function to get all pothole images at with a userId of id
  const { id } = req.params;
  getPotholeAtUserId(id, (data) => res.status(200).send(data));
});

export default imgs;
