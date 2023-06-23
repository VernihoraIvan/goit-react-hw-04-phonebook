import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Contacts from './Contacts/Contacts';
import ContactForm from './ContactForm/ContactForm';
import Section from './Section/Section';
import FilterInput from './FilterInput/FilterInput';
import { nanoid } from 'nanoid';
import css from './App.module.css';

const localStorageKey = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem(localStorageKey)) ?? [];
  });
  const [filter, setFilter] = useState('');

  const deleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  const handleFilter = event => {
    setFilter(event.target.value);
  };

  const handleAddContact = ({ name, number }) => {
    const isExistingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExistingContact) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(state => [
      ...state,
      { name: name, number: number, id: nanoid() },
    ]);
    return;
  };
  const filteredList = () => {
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  useEffect(() => {
    const savedContacts = localStorage.getItem(localStorageKey);
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = filteredList();
  return (
    <div
      className={css.container}
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section title="Phonebook">
        <ContactForm onSubmit={handleAddContact} />
      </Section>
      <Section title="Contacts">
        <FilterInput value={filter} handleFilter={handleFilter} />
        <Contacts contacts={filteredContacts} onDeleteContact={deleteContact} />
      </Section>
    </div>
  );
};

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
