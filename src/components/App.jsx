import PropTypes from 'prop-types';
import { useState } from 'react';
import Contacts from './Contacts/Contacts';
import ContactForm from './ContactForm/ContactForm';
import Section from './Section/Section';
import FilterInput from './FilterInput/FilterInput';
import { nanoid } from 'nanoid';
import css from './App.module.css';

const initialContacts =  
[{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }]

export const App = () => {
  // state = {
    // contacts: [
    //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  const [contacts , setContacts] = useState(initialContacts)
  const [filter, setFilter] = useState('')



  const deleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId))
    // this.setState(prevState => ({
    //   contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    // }));
  };

  const handleFilter = event => {
    setFilter(event.target.value)
    // this.setState({ filter: event.target.value });
  };

  const handleAddContact = ({ name, number }) => {
    // const { contacts } = this.state;
    const newContact = { name, number };
    const isExistingContact = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isExistingContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    return this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { name: newContact.name, number: newContact.number, id: nanoid() },
      ],
    }));
///////////////////////////////////////////////////////////////////////////////////////
    // setContacts(state => state)



  };
  filteredList = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  localStorageKey = 'contacts';

  componentDidMount() {
    const savedContacts = localStorage.getItem(this.localStorageKey);
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(contacts));
    }
  }

  render() {
    const filteredContacts = this.filteredList();
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
          <FilterInput
            value={this.state.filter}
            handleFilter={handleFilter}
          />
          <Contacts
            contacts={filteredContacts}
            onDeleteContact={deleteContact}
          />
        </Section>
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};