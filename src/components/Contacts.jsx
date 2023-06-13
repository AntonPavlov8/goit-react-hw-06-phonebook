import { useState } from 'react';
import { ContactsItem } from './ContactsItem';
import { Search } from './Search';

export const Contacts = prop => {
  const [searchResults, setSearchResults] = useState({
    results: [],
    isSearching: false,
  });

  const showContacts = data => {
    return data.length === 0 ? (
      <li>
        No contacts{' '}
        {searchResults.isSearching && 'found with this name or number'}
      </li>
    ) : (
      data.map(contact => (
        <ContactsItem
          key={contact.id}
          contact={contact}
          setState={prop.setState}
          setSearchResults={setSearchResults}
        />
      ))
    );
  };

  return (
    <div>
      <h4>Contacts</h4>
      <Search
        state={prop.state}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
      <ul
        style={{
          width: '300px',
          fontSize: '22px',
          padding: '0',
          listStyle: 'none',
        }}
      >
        {showContacts(
          searchResults.isSearching === true
            ? searchResults.results
            : prop.state.contacts
        )}
      </ul>
    </div>
  );
};
