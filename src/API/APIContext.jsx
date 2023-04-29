import {createContext, useState, useEffect} from 'react'
import axios from "axios";

const APIContext = createContext();

export const APIProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        axios.get("https://dog-api.kinduff.com/api/facts?number=5")
          .then((response) => {
            setData(response.data);
            setIsLoading(false);
          });
      }, 1000);
    
      // Cleanup function to clear the timeout if the component unmounts before the delay is over
      return () => clearTimeout(timeoutId);
    }, []);
  
    return <APIContext.Provider value={{data, isLoading, setData}}>{children}</APIContext.Provider>;
  };

export default APIContext;