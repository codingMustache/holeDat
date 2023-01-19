import React, { useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import { useLocation } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Switch from 'react-bootstrap/Switch';
//import PotholeRating from '../addPothole/formQuestions/PotholeRating';

const Header = (prop) => {
  const id = Number(useLocation().pathname.split(':')[1]);
  const { addy, avg, voteCount, user, fixed } = prop;
  const [status, setStatus] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(1)

  //handle rating/status
  const handleAction = () => {
    axios
      .post('/api/rating/pothole', { id, rating, status, user }) //whatever the current status is
      .catch((data) => console.log(data));
  };

  return (
    <Container id='header'>
      <Row id='addyRating' className='alignItems'>
        <Col id='addy'>{addy}</Col>
        <Col id='totalRating' className='newline'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='8%'
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

      {user?.name &&
        <Row id='ratings'>
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
            </div>
            <p>Fixed</p>
            <button
              onClick={handleAction}
            >
              Submit
            </button>
          </Col>
        </Row>
      }
    </Container >
  );
};

export default Header;
