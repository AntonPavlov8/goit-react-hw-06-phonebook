import { useEffect } from 'react';
import { useState } from 'react';
import { PhoneBook } from './PhoneBook';

export const App = () => {
  const [state, setState] = useState({
    contacts: [],
    isInitialRender: true,
  });

  // Effect for initial data retrieval
  useEffect(() => {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setState(prevState => ({
        ...prevState,
        contacts: [...parsedData],
        isInitialRender: false,
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        isInitialRender: false,
      }));
    }
  }, []);

  // Effect for subsequent storage updates
  useEffect(() => {
    if (!state.isInitialRender) {
      localStorage.setItem('myData', JSON.stringify(state.contacts));
    }
  }, [state]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <PhoneBook state={state} setState={setState} />
    </div>
  );
};
