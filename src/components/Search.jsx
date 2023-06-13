import validator from 'validator';

export const Search = prop => {
  function searchFn(e) {
    const searchInput = e.target.value;

    function checkType(contact) {
      if (validator.isNumeric(searchInput)) {
        return contact.number;
      }
      return contact.name;
    }

    prop.setSearchResults(prev => {
      if (searchInput.length !== 0) {
        return {
          results: [
            ...prop.state.contacts.filter(contact => {
              return checkType(contact).includes(searchInput);
            }),
          ],
          isSearching: true,
        };
      } else {
        return {
          ...prev,
          isSearching: false,
        };
      }
    });
  }
  return (
    <div>
      <input type="text" name="search" onChange={searchFn} />
    </div>
  );
};
