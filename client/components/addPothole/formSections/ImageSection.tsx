/* eslint-disable react/no-unescaped-entities */
import React, {useState, useContext} from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import PotholePic from '../formQuestions/PotholePic';
import PotholeCaption from '../formQuestions/PotholeCaption';
import Button from 'react-bootstrap/Button'
import { ImageContext } from '../AddPothole';

//image section view
const ImageSection = (prop) => {
  const { handleClick } = prop;
  const { imageContents } = useContext(ImageContext);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const { photoURL, caption } = imageContents;

  //handle validation 
  const handleValidation = () => {
    if (photoURL.length === 0) {
      setShowError(true);
      setErrorText('Enter a valid pothole photo')
    } else if (caption.length === 0) {
      setShowError(true);
      setErrorText('Enter a description of the pothole')
    } else if (caption.length > 250) {
      setShowError(true);
      setErrorText('Description exceeds the number of allowed characters');
    } else {
      handleClick();
    }
  }
  
  //handle error shown
  const handleShowError = () => {
    if (showError === true) {
      return <Alert variant='danger'>Oops! {errorText}</Alert>;
    }
  }

  return (
    <Form.Group>
      <Form.Group className='questionGroup'>
        <Form.Label className='formQuestion'>Add a picture of the pothole</Form.Label>
        <PotholePic />
      </Form.Group>

      <Form.Group className='questionGroup'>
        <Form.Label className='formQuestion line1'>Describe the pothole</Form.Label>
        <p className='formText'>
          <span className='newline'> What are the pothole's most distinguishing characteristics?</span>
          <span className='italic xsmall line2'>Description cannot exceed 250 characters. Current length: {caption.length}</span>
        </p>
        <PotholeCaption />
      </Form.Group>

      {handleShowError()}

      <Button id='nextFormButton' className='basicButton' type='button' onClick={handleValidation}>
        <div className='center'>
          Next
          <div className='arrow-button arrow-right'></div>
        </div>
      </Button>
    </Form.Group>
  );};

export default ImageSection;
