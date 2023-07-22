import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, updateFilter, fetchContacts } from '../redux/contactsSlice';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [isContactsLoaded, setIsContactsLoaded] = useState(false);
  const contacts = useSelector((state) => state.contacts.contacts);
  const filter = useSelector((state) => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isContactsLoaded) {
      dispatch(fetchContacts())
        .then(() => {
          setIsContactsLoaded(true);
        })
        .catch((error) => {
          console.error('Error fetching contacts:', error);
        });
    }
  }, [dispatch, isContactsLoaded]);
  

  const handleAddContact = (name, number) => {
    const newContact = {
      name: name,
      number: number,
    };

    fetch('https://64bb9b397b33a35a444682bc.mockapi.io/contacts/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
      .then((data) => {
        newContact.id = data.id;
        dispatch(addContact(newContact));
      })
      .catch((error) => {
        console.error('Error saving contact to the server:', error);
      });
  };
  
const handleDeleteContact = (id) => {

  fetch(`https://64bb9b397b33a35a444682bc.mockapi.io/contacts/contacts/${id}`, {
    method: 'DELETE',
  })
  .then((response) => {
    if (response.ok) {
      dispatch(deleteContact(id));
    } else {
      console.error('Failed to delete contact from server');
    }
  })
  .catch((error) => {
    console.error('Error deleting contact from server:', error);
  });
};


const handleFilterChange = (event) => {
  dispatch(updateFilter(event.target.value));
};

const filteredContacts = filter
  ? contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()))
  : contacts;

return (
  <div style={{ maxWidth: '250px', padding: '20px' }}>
    <h1 style={{ marginBottom: '20px' }}>Phonebook</h1>
    <ContactForm contacts={contacts} onAddContact={handleAddContact} />

    <h2 style={{ marginTop: '40px' }}>Contacts</h2>
    <Filter value={filter} onChange={handleFilterChange} />
    <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
  </div>
);
};

export default App;
