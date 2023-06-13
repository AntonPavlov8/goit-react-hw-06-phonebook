import { nanoid } from 'nanoid';
import { useRef } from 'react';
import { Contacts } from './Contacts';
export const PhoneBook = prop => {
  const nameInput = useRef(null);
  const telInput = useRef(null);

  const { state, setState } = prop;

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    if (
      state.contacts.filter(contact => {
        return contact.name === name;
      }).length === 0
    ) {
      if (
        state.contacts.filter(contact => {
          return contact.number === number;
        }).length === 0
      ) {
        form.reset();
        setState(prev => {
          return {
            ...prev,
            contacts: [
              ...prev.contacts,
              {
                id: nanoid(),
                name: name,
                number: number,
              },
            ],
          };
        });
      } else {
        alert(`Person with number ${number} is already in contacts.`);
        telInput.current.focus();
      }
    } else {
      alert(`${name} is already in contacts.`);
      nameInput.current.focus();
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          border: '1px #000 solid',
          width: '200px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '280px',
          padding: '48px 24px',
        }}
      >
        <span>Name</span>
        <input
          ref={nameInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(['-][a-zA-Zа-яА-Я ]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          required
        />
        <span>Number</span>
        <input
          ref={telInput}
          type="tel"
          name="number"
          pattern="^(?:\+?\d{1,3})?\d+$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <button action="submit">Add contact</button>
      </form>
      <Contacts state={state} setState={setState} />
    </div>
  );
};
