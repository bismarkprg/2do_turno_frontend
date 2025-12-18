import { useEffect, useState } from 'react';
import axios from 'axios';

const CharacterTable = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => setCharacters(response.data.results))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Personajes (Rick & Morty)</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>RU</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Fecha de nacimiento</th>
            <th>Universidad</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(char => (
            <tr key={char.id}>
              <td>{char.name}</td>
              <td>{char.species}</td>
              <td>{char.gender}</td>
              <td>{char.origin.name}</td>
              <td>{char.location.name}</td>
              <td>{char.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable;