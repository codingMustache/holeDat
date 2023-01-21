/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { ImageContext } from '../AddPothole';
import heic2any from 'heic2any';
//photo upload box. Assigns photo file and url to image context
const PotholePic = () => {
  const { imageContents, setImageContents } = useContext(ImageContext);

  const handleChange = (e) => {
    const newImageContents = { ...imageContents };
    newImageContents.file = e.target.files[0];
    if (e.target.files[0].type === 'image/heic') {
      const jpeg: any = heic2any({
        blob: e.target.files[0],
        toType: 'image/jpeg',
      });
      newImageContents.photoURL = URL.createObjectURL(jpeg);
      setImageContents(newImageContents);
    } else {
      newImageContents.photoURL = URL.createObjectURL(e.target.files[0]);
      setImageContents(newImageContents);
    }
  };

  return (
    <Form.Group controlId='uploadPotPhoto'>
      <Form.Control type='file' onChange={handleChange} required />
      <div id='imgInput'>
        <img src={imageContents.photoURL} />
      </div>
    </Form.Group>
  );
};

export default PotholePic;
