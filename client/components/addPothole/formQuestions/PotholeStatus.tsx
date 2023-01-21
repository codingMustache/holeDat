import React from 'react';
import Form from 'react-bootstrap/Form';

//fixed or busted status
const PotholeStatus = (prop) => {
  const { handleChange } = prop;

  return (
    <Form.Group id='addPotStatus'>
      {['Busted', 'Fixed'].map((label, id) => (
        <div key={`inline-${id}`} id='statusPick'>
          <Form.Check
            inline
            required
            label={label}
            name='group1'
            type='radio'
            className='statusVal'
            onChange={() => {
              const status = label === 'Busted' ? false : true;
              handleChange(status)
            }}
          />
        </div>
      ))}
    </Form.Group>
  );
};

export default PotholeStatus;
