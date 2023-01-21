/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//submitted section view
const SubmittedSection = (prop) => {
  const { potholeId, setView, setCoordinates, setImageContents, setStatusContents } = prop;
  console.log(potholeId)
  return (
    <Container id='submit' className='formSectionView'>
      <h2 className='title'> Pothole Submitted! </h2>
      <Container className='formView' id='report'>
        <h4>Report Pothole to NOLA Services</h4>
        <p className='xsmall'>3 questions are required to be filled out on the service form:</p>

        <ListGroup>
          <ListGroup.Item >
            <span className='subText'>Request Type</span>: Select 1st option 'Roads/Drainage'
          </ListGroup.Item>
          <ListGroup.Item >
            <span className='subText'>Request Reason</span>: Select 4th option 'Pothole'
          </ListGroup.Item>
          <ListGroup.Item >
            <span className='subText'>Address/Location</span>: Input the address
          </ListGroup.Item>
        </ListGroup>

        <Button
          as='a'
          href='https://nola311.org/service-request/'
          target='_blank'
          className='basicButton'
        >
          Report to 311
        </Button>
      </Container>
      <Row className='inlineButtons'>
        <Col className='submitButton text-center'>
          <Link to={`/Pothole:${potholeId}`}>
            <Button className='basicButton'>Check Out the Pothole</Button>
          </Link>
        </Col>
        <Col className='submitButton text-center' onClick={() => {
          setView('Welcome');
          setCoordinates({ lat: 0, lon: 0 });
          setImageContents({ file: null, caption: '', photoURL: '' });
          setStatusContents({ fixed: null, rating: 0 });
        }}>
          <Button className='basicButton'>Submit a New Pothole</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SubmittedSection;
