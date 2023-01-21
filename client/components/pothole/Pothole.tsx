import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import CommentForm from './CommentForm';
import Slider from './Slider';
import Header from './Header';
// import PotholeStatus from '../addPothole/formQuestions/PotholeStatus';

const Pothole = () => {
  const id = Number(useLocation().pathname.split(':')[1]);

  interface User {
    name: string;
    photo: string;
    userId_user: number | undefined;
    badge_id: number | undefined;
  }
  type phImg = {
    image_id: number;
    photoURL: string;
    caption: string;
    userId: number;
    userName: string;
    userPhoto: string;
    lat: number;
    lon: number;
    fixed: boolean;
    badge_id: number;
  };
  type badgeObj = {
    badge_id: number;
    imgUrl: string;
    description: string;
    name: string;
  };

  const [badge, setBadge] = useState<badgeObj[]>([]);
  const [PImages, setPImages] = useState<phImg[]>([]);
  const [addy, setAddy] = useState<string[]>([]);
  const [phId] = useState<number>(id);
  // const [avg, setAvg] = useState<number>(0);
  // const [voteCount, setVotecount] = useState<number>(0);
  const [fixed, setFixed] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    name: '',
    photo: '',
    userId_user: undefined,
    badge_id: undefined,
  });

  // const getAllRatingByPhId = () => {
  //   axios.get('/api/rating/rating' + id).then((data) => {
  //     const Avg =
  //       data.data.reduce((acc, curr) => {
  //         acc += curr;
  //         return acc;
  //       }, 0) / data.data.length;
  //     setAvg(Math.round(Avg));
  //     setVotecount(data.data.length);
  //   });
  // };

  // get pothole images by potholeID
  const getAllPotholeImgByPhId = () => {
    axios
      .get('/api/imgs/potholeimgs' + id)
      .then((data) => {
        const resObj: [] = data.data.map((each) => {
          const { image_id, caption, photoURL } = each;
          const { user_id, name, photo, badge_id } = each.User;
          const { lat, lon, fixed } = each.Pothole;
          return {
            image_id,
            caption,
            photoURL,
            userId: user_id,
            userName: name,
            userPhoto: photo,
            badge_id,
            lon,
            lat,
            fixed,
          };
        });
        setPImages(resObj);
        //getBadge(data);
        return data.data[0].Pothole;
      })
      .then((data) => {
        const { lat, lon } = data;
        axios('/api/location/getAddy', { params: { lat, lon } }).then((data) =>
          setAddy(data.data.split(',')[0])
        );
      })
      .catch((err) => console.log(err));
  };

  const getUser = () => {
    axios.get('/api/user/me').then((data) => {
      setUser({
        name: data.data.name,
        photo: data.data.photo,
        userId_user: data.data.user_id,
        badge_id: data.data.badge_id,
      });
    });
  };

  const getAllBadges = () => {
    axios
      .get('/api/badges/allBadges')
      .then(({ data }) => setBadge(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllBadges();
    getUser();
    getAllPotholeImgByPhId();
    // getAllRatingByPhId();
  }, []);

  return (
    <div id='potholeProfile'>
      <Container id='potholeSect' className='post'>
        <Header addy={addy} fixed={fixed} setFixed={setFixed} user={user} />
        <Slider badge={badge} PImages={PImages} user={user} />
      </Container>

      <CommentForm phId={phId} />
    </div>
  );
};

export default Pothole;
