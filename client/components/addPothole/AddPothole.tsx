/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect, createContext, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import LocationSection from './formSections/LocationSection';
import ImageSection from './formSections/ImageSection';
import StatusSection from './formSections/StatusSection';
import SubmittedSection from './formSections/SubmittedSection';
import WelcomeSection from './formSections/WelcomeSection';


/* -------------------------------- Contexts -------------------------------- */
interface LocationContextType {
  coordinates: { lat: number; lon: number };
  setCoordinates: Dispatch<SetStateAction<{ lat: number; lon: number }>>;
}
export const LocationContext = createContext<LocationContextType>({
  coordinates: { lat: 0, lon: 0 },
  setCoordinates: () => { },
});
interface ImageContextType {
  imageContents: { file: any; caption: string; photoURL: string };
  setImageContents: Dispatch<SetStateAction<{ file: any; caption: string; photoURL: string }>>;
}
export const ImageContext = createContext<ImageContextType>({
  imageContents: { file: {}, caption: '', photoURL: '' },
  setImageContents: () => { },
});
interface StatusContextType {
  statusContents: { fixed: any; rating: number };
  setStatusContents: Dispatch<SetStateAction<{ fixed: any; rating: number }>>;
}
export const StatusContext = createContext<StatusContextType>({
  statusContents: { fixed: false, rating: 0 },
  setStatusContents: () => { },
});

/* --------------------------- Main Form Component -------------------------- */
const AddPothole = () => {
  const sections: Array<string> = ['Welcome', 'Location', 'Image', 'Status'];
  const [view, setView] = useState<string>('Welcome');
  const [progress, setProgress] = useState<number>(0);
  const [user_id, setUser_id] = useState<number>(0);
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [imageContents, setImageContents] = useState({ file: null, caption: '', photoURL: '' });
  const [statusContents, setStatusContents] = useState({ fixed: null, rating: 0 });
  const [potholeId, setPotholeId] = useState<number>(0);
  // const [showError, setShowError] = useState<boolean>(false);

  //retrieve the user id
  useEffect(() => {
    axios('/api/user/me')
      .then(({ data }) => setUser_id(data.user_id))
      .catch((err) => console.error('FAILURE TO RETRIEVE USER', err));
  }, []);

  //handle click between sections to see new view and handle progress
  const handleClick = () => {


    const nextSection = sections.indexOf(view) + 1;
    setView(sections[nextSection]);
    setProgress(progress + 34);

  };


  //handle final submission
  const handleSubmit = () => {
    if (imageContents.file) {
      const formData = new FormData();
      formData.append('file', imageContents.file);
      axios
        .post('/api/imgs/addimg', formData)
        .then(({ data }) => {
          const updatedImageContents = { ...imageContents };
          updatedImageContents.photoURL = data;
          const masterObj = { coordinates, updatedImageContents, statusContents, user_id };

          axios
            .post('/api/pothole/addPothole', masterObj)
            .then(({ data }) => {
              const potid = data;
              setPotholeId(potid);
            })
            .catch((err) => console.error('Failure to Add Pothole to Database', err));
        })
        .catch((err) => console.error('Failure to Submit Image to Cloud', err));
    }
    setView('Submitted');
  };

  //handle which section of the form is rendered when in form view
  const handleSectionalView = () => {
    if (view === 'Location') {
      return (
        <LocationContext.Provider value={{ coordinates, setCoordinates }}>
          <LocationSection handleClick={handleClick} />
        </LocationContext.Provider>
      );
    } else if (view === 'Image') {
      return (
        <ImageContext.Provider value={{ imageContents, setImageContents }}>
          <ImageSection handleClick={handleClick} />
        </ImageContext.Provider>
      );
    } else if (view === 'Status') {
      return (
        <StatusContext.Provider value={{ statusContents, setStatusContents }}>
          <StatusSection handleSubmit={handleSubmit} />
        </StatusContext.Provider>
      );
    }
  };

  //handle form components/section view
  const handleFormComps = () => {
    if (view === 'Welcome') {
      return <WelcomeSection handleClick={handleClick} />
    } else if (view === 'Submitted') {
      return <SubmittedSection potholeId={potholeId} setView={setView}/>;
    } else {
      return (
        <Form id='potholeForm' className='formSectionView'>
          {/* {handleSetError()} */}
          {handleSectionalView()}
          <ProgressBar now={progress} />
        </Form>
      );
    }
  };

  return (
    <Container id='addPothole'>
      <Container className='formView' fluid>
        {handleFormComps()}
      </Container>
    </Container>
  );
};

export default AddPothole;
