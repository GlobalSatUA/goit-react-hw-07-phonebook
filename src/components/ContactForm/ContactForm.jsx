import React, { useState } from 'react';

const ContactForm = ({ contacts, onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isContactExists = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExists) {
      alert('Contact with this name already exists!');
    } else {
      onAddContact(name, number);
      setName('');
      setNumber('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <p>Name</p>
      <input
        type="text"
        name="name"
        style={{ marginBottom: '10px', padding: '5px' }}
        pattern="^[A-Za-z\u0080-\uFFFF ']+$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleNameChange}
      />
      <p>Phone Number</p>
      <input
        type="tel"
        name="number"
        style={{ marginBottom: '10px', padding: '5px' }}
        pattern="^(\+?[0-9.\(\)\-\s]*)$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleNumberChange}
      />
      <button
        type="submit"
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '8px 20px',
          border: 'none',
          marginTop: 'auto',
        }}
      >
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
