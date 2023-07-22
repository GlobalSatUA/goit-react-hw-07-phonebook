import React from 'react';
import { nanoid } from 'nanoid';

const ContactItem = ({ contact, onDeleteContact }) => {
  const handleDelete = () => {
    onDeleteContact(contact.id);
  };

  return (
    <li style={{ marginBottom: '10px' }}>
      {contact.name} - {contact.number}
      <button
        onClick={handleDelete}
        style={{
          backgroundColor: 'red',
          color: 'white',
          marginLeft: '10px',
          padding: '5px 10px',
          border: 'none'
        }}
      >
        Delete
      </button>
    </li>
  );
};

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {contacts.map((contact) => (
        <ContactItem
        key={nanoid()} 
          contact={contact}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
};




export default ContactList;
