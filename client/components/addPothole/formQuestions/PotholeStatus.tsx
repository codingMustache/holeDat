import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { StatusContext } from '../AddPothole';

//fixed or busted status
const PotholeStatus = () => {
  const { statusContents, setStatusContents } = useContext(StatusContext);

  return (
    <Form.Group id='addPotStatus'>
      {['Busted', 'Fixed'].map((label, id) => (
        <div key={`inline-${id}`}>
          <Form.Check
            inline
            required
            label={label}
            name='group1'
            type='radio'
            onChange={() => {
              const newStatusContents = { ...statusContents };
              newStatusContents.fixed = label === 'Busted' ? false : true;
              setStatusContents(newStatusContents);
            }}
          />
        </div>
      ))}
    </Form.Group>
  );
};

export default PotholeStatus;
