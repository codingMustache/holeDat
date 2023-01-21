import Pothole from '../db/schema/pothole.schema';
import { Op } from 'sequelize';

export const getAllPotholes = (cb) => {
  Pothole.findAll({})
    .then((data) => cb(data))
    .catch((err) => console.error('FAILURE TO GET ALL POTHOLES', err));
};

/* ------------ Creates Pothole if Pothole Does Not Already Exist ----------- */
export const findAndAddPothole = (cb, obj) => {
  Pothole.findAll({
    //determine if there is a pothole that exists between these coordinates
    where: {
      //based on these coordinate ranges
      lat: { [Op.between]: [obj.lat - 0.0001, obj.lat + 0.0001] },
      lon: { [Op.between]: [obj.lon - 0.0001, obj.lon + 0.0001] },
    },
  })
    .then((data) => {
      if (data.length === 0) {
        // if no potholes are returned/match
        //obj.fixed = false;
        //console.log(obj);
        Pothole.create(obj) //create pothole if pothole does not already exist
          .then((data) => {
            cb(data.pothole_id);
          })
          .catch((err) => console.error('FAILURE TO CREATE POTHOLE', err));
      } else {
        cb(data[0].pothole_id);
      }
    })
    .catch((err) => console.error('FAILURE TO FIND POTHOLE', err));
};

export const getMatchingPotholes = (cb, obj) => {
  Pothole.findAll({
    //determine if there is a pothole that exists between these coordinates
    where: {
      lat: { [Op.between]: [obj.lat - 0.0001, obj.lat + 0.0001] },
      lon: { [Op.between]: [obj.lon - 0.0001, obj.lon + 0.0001] },
    },
  })
    .then((data) => cb(data))
    .catch((err) => console.log('FAILURE TO MATCH POTHOLE', err));
};

export default getAllPotholes;
