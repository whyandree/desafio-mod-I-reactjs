import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepository(res.data);
    })
  }, []);

  async function handleAddRepository() {    
    const res = await api.post('/repositories', {
      title: `Andree`,
      url: "https://github.com/whyandree/repos",
      techs: [
        "Nodejs",
        "ReactNative"
      ]	
    });

    const repositoryData = res.data;

    setRepository([...repositories, repositoryData]);
  }

  async function handleRemoveRepository(id) {

    await api.delete(`/repositories/${id}`);

    setRepository(repositories.filter(
      r => r.id !== id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(r => (
          <li key={r.id}> 
            {r.title}

            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>

          </li>
          ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
