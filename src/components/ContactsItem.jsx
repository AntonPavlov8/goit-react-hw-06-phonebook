export const ContactsItem = ({ contact, setState, setSearchResults }) => {
  function deleteContact(contactId) {
    setState(prev => {
      return {
        ...prev,
        contacts: [
          ...prev.contacts.filter(person => {
            return person.id !== contactId;
          }),
        ],
      };
    });
    setSearchResults(prev => {
      return {
        ...prev,
        results: [
          ...prev.results.filter(person => {
            return person.id !== contactId;
          }),
        ],
      };
    });
  }
  return (
    <li>
      {contact.name}
      {': '}
      {formatNumber(contact.number)}

      <button type="button" onClick={() => deleteContact(contact.id)}>
        Delete
      </button>
    </li>
  );
};

function formatNumber(number) {
  let newNumber;
  switch (number.length) {
    case 10: {
      const string1 = number.substring(0, 3);
      const string2 = number.substring(3, 6);
      const string3 = number.substring(6, 10);
      newNumber = `${string1}-${string2}-${string3}`;
      break;
    }
    case 12: {
      if (number[0] === '+') {
        const string1 = number.substring(0, 2);
        const string2 = number.substring(2, 5);
        const string3 = number.substring(5, 8);
        const string4 = number.substring(8, 12);
        newNumber = `${string1}-${string2}-${string3}-${string4}`;
      }
      break;
    }
    default:
      newNumber = number;
      break;
  }
  return newNumber;
}
