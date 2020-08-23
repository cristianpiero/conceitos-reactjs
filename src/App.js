import React, { useEffect, useState } from "react";
import api from  './services/api';
import "./styles.css";

function App() {

  const [repos, setRepos] =  useState([]);
    
  useEffect(()=>{
      api.get('/repositories').then(response => {
          setRepos(response.data);
      })
  }, [repos])

  async function handleAddRepository() {
    // TODO
    // Criando repositorio
    const response  = await api.post('/repositories', {      
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })
  
    setRepos([...repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    // Removendo repositorio
    const response  = await api.delete(`/repositories/${id}`);
    
    if (response.status === 204) {
      const repoIndex = repos.findIndex(repo => repo.id===id)
      
      const newRepos = repos

      newRepos.splice(repoIndex, 1);

      setRepos(newRepos);
    }
    

    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo=> (
        <li key={repo.id}>
          {repo.title}<button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
