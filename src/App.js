import React,{ useEffect,useState } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [ projects,setProject ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setProject(response.data);
    });
  },[]);

  async function handleAddRepository() {
     const response = await api.post('repositories',{
      title: "project react native",
      url: "http://meusite.com",
      techs: [
        "nodejs",
        "es6",
        "typescript"
      ]
    });

    setProject([...projects,response.data]);
  }

  async function handleRemoveRepository(id) {
   

    const newArray = projects.filter(project => project.id !== id);
    console.log(newArray);
    await api.delete(`repositories/${id}`);
    setProject(newArray);
    console.log(projects);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      { projects.map(item => (
          <li key={ item.id }>
            <p>{ item.title }</p>

          <button onClick={() => handleRemoveRepository(item.id)}>
            Remover
          </button>
        </li>
      )) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
