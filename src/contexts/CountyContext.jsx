import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CountyContext = createContext();

export const CountyProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState('基隆市');
  const [location, setLocation] = useState(selectedLocation);
  const handleChange = (event) => {
    setLocation(event.target.value);
    setSelectedLocation(event.target.value);
  };

  const navigate = useNavigate();
  const detail = (event) => {
    const county = event.currentTarget.textContent.slice(0, 3);
    setSelectedLocation(county);
    setLocation(county);
    navigate('/county');
  };
  return (
    <CountyContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        location,
        handleChange,
        detail,
      }}
    >
      {children}
    </CountyContext.Provider>
  );
};

export const useCounty = () => useContext(CountyContext);
