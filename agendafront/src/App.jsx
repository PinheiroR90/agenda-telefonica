
import { createContext, useState } from 'react'
import './App.css'
import List from './components/list'
import axios from 'axios';

export const AuthContext = createContext();

function App() {
  const [data,setData] = useState([]);

  const handleShowList = async () => {
    await axios
      .get(`http://localhost:8080/users`)
      .then((res) => {
        const { content } = res.data;
        setData(content);
      })
      .catch((erro) => console.log(erro));
  };

  return (
    <AuthContext.Provider value={{data,setData, handleShowList}}>
    <div className='container App'>
     <List />
    </div>
    </AuthContext.Provider>
  )
}

export default App
