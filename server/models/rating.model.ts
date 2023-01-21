import Pothole from '../db/schema/pothole.schema';
import Rating from '../db/schema/ratings.schema';

export const postRating = async (obj, pothole_id) => {
  const pothole = await Pothole.findOne({
    where: { pothole_id },
  });

  await pothole?.createRating(obj).catch((err) => console.error(err));
};

export const getPotholesAtIds = (idArray, cb) => {
  const sortRating = (ratingArray) => {
    const resultArr = ratingArray.sort((a, b) => b.overall - a.overall);
    cb(resultArr);
  };

  Rating.findAll({ where: { pothole_id: idArray } })
    .then((data) => sortRating(data))
    .catch((err) => console.log(err));
};

export const addRating = (pothole_id: number, user_id: number, fixed: boolean, rating: number) => {
  Rating.findOne({ where: { pothole_id, user_id } }).then((data) => {
    if (!data) {
      Rating.create({ pothole_id, fixed, overall: rating, user_id })
        // .then(data => console.log(data))
        .catch((err) =>
        console.log(err)
      );
    } else {
      Rating.update({ fixed, overall: rating }, { where: { pothole_id, user_id } })
        // .then((data) => console.log(data, pothole_id, rating, user_id))
        .catch((err) => console.log(err));
    }
  });
};

export const getAllRatingsById = async (id, cb) => {
  Rating.findAll({ where: { pothole_id: id } })
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};
