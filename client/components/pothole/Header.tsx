import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import { useLocation } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
<<<<<<< HEAD
import Switch from 'react-bootstrap/Switch';
//import PotholeRating from '../addPothole/formQuestions/PotholeRating';

const Header = (prop) => {
  const id = Number(useLocation().pathname.split(':')[1]);
  const { addy, avg, voteCount, user, fixed } = prop;
  const [status, setStatus] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(1)
=======
// import Switch from 'react-bootstrap/Switch';
import PotholeRating from '../addPothole/formQuestions/PotholeRating';
import PotholeStatus from '../addPothole/formQuestions/PotholeStatus';

const Header = (prop) => {
  const id = Number(useLocation().pathname.split(':')[1]);
  const [avg, setAvg] = useState<number>(0);
  const [voteCount, setVotecount] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [newVote, setNewVote] = useState<number>(0);
  const { addy, fixed, user } = prop;
  const [status, setStatus] = useState<boolean>(fixed);
>>>>>>> d56c67269db1fd2fb6bcd5aa5c1c0a51a424ac74

    const getAllRatingByPhId = () => {
      axios.get('/api/rating/rating' + id).then((data) => {
        const Avg =
          data.data.reduce((acc, curr) => {
            acc += curr;
            return acc;
          }, 0) / data.data.length;
        setAvg(Math.round(Avg));
        setVotecount(data.data.length);
        setNewVote(newVote + 1);
      });
    };
  
  useEffect(getAllRatingByPhId, [newVote])
  
  //handle rating/status
<<<<<<< HEAD
  const handleAction = () => {
    axios
      .post('/api/rating/pothole', { id, rating, status, user }) //whatever the current status is
=======
  const handleAction = (value) => {
    const val = value;
    const type = typeof value === 'number' ? 'rating' : 'status';
    const ratingStatusObj = { type, value }
    console.log({type, val})
    if (type === 'rating') {
      setRating(val);
    } else if (type === 'status') {
      setStatus(val);
    }

    axios
      .post('/api/rating/fromPh', { id, ratingStatusObj, status, rating, user }) //pass whatever the current fixed val is/rating in order to create/update
>>>>>>> d56c67269db1fd2fb6bcd5aa5c1c0a51a424ac74
      .catch((data) => console.log(data));
  };

  return (
    <Container id='header'>
      <Row id='addyRating' className='alignItems'>
        <Col id='addy'>{addy}</Col>
        <Col id='totalRating' className='newline'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='6%'
            fill='currentColor'
            className={`bi bi-cone-striped`}
            viewBox='0 0 16 16'
          >
            <path d='m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z' />
          </svg>
          {avg}&nbsp;<span id='totalVoteCount'>({voteCount})</span>
        </Col>
        <Col id='status'>
          <h4>{fixed === false ? 'Busted' : 'Fixed'}</h4>
        </Col>
      </Row>

      {user?.name && (
        <Row id='ratings'>
<<<<<<< HEAD
          <Col className='group newline' sm>
            <p>Rate This Pothole:</p>
            <div id='cones' >
              {[1, 2, 3, 4, 5].map((num, i) => (
                <svg
                  key={`cone-${i}`}
                  onClick={() => {
                    setRating(num);
                  }}
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  id={`cone-num-${i}`}
                  className={`bi-cone-striped${i < rating ? 'clickCone' : ''}`}
                  viewBox='0 0 16 16'
                >
                  <path d='m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z' />
                </svg>
              ))}
            </div>
            {/* <PotholeRating handleClick={handleAction} /> */}
          </Col>

          <Col id='fixed' className='group' sm>
            <p>Pothole Status:</p>
            <div className='fixed'>
              <p>Busted</p>
              <Switch
                checked={status}
                onChange={() => {
                  const newStatus = !status;
                  setStatus(newStatus);
                }}
              />
=======
          <Col className='group' sm>
            <div className='insideGroup'>
              <p className='profText'>Rate Pothole Severity:</p>
              <div className='profComponent'>
                <PotholeRating handleClick={handleAction} />
              </div>
            </div>
          </Col>

          <Col id='fixed' className='group' sm>
            <div className='insideGroup'>
              <p className='profText'>Confirm Pothole Status:</p>
              <div className='profComponent'>
                <PotholeStatus handleChange={handleAction} />
              </div>
>>>>>>> d56c67269db1fd2fb6bcd5aa5c1c0a51a424ac74
            </div>
            <p>Fixed</p>
            <button
              onClick={handleAction}
            >
              Submit
            </button>
          </Col>
        </Row>
<<<<<<< HEAD
      }
    </Container >
=======
      )}
    </Container>
>>>>>>> d56c67269db1fd2fb6bcd5aa5c1c0a51a424ac74
  );
};

export default Header;
