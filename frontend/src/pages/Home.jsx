import { useEffect, useState } from 'react';
import api from '../api';
import { ACCESS_TOKEN } from '../constants';

function Home() {
  const headers = {
    'Content-Type': 'application/json',
    Autorization: `Bearer ${ACCESS_TOKEN}`,
  };
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get('/api/notes/')
      .then(res => res.data)
      .then(data => {
        setNotes(data);
        console.log(data);
      })
      .catch(err => alert(err));
  };

  const deleteNote = id => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then(res => {
        if (res.status === 204) alert('Note deleted!');
        else alert('Failed to delete note.');
        getNotes();
      })
      .catch(error => alert(error));
  };

  const createNote = async e => {
    e.preventDefault();
    console.log(content, title);
    try {
      const response = await api.post('/api/notes/', title, content, {
        Headers,
      });

      if (response.status === 201) {
        alert('Note created!');
      } else {
        alert('Failed to make note.');
      }
      getNotes();
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made but no response was received
        alert('Error: No response from server. Please try again.');
      } else {
        // Something happened in setting up the request
        alert(`Error: ${error.message}`);
      }
      console.error('Error creating note:', error);
    }
  };

  return (
    <div>
      <div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="title">Content:</label>
          <br />
          <textarea
            name="content"
            id="content"
            required
            value={content}
            onChange={e => setContent(e.target.value)}
          ></textarea>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Home;
