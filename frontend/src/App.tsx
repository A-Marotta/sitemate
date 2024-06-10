import axios from 'axios';
import './App.css';
import { ENDPOINTS } from './utils/constants';
import { Issue } from './utils/types';

function App() {
    const handleCreate = (): void => {
        axios.post(ENDPOINTS.CREATE, {
            title: 'New issue',
            description: 'Issue description'
        })
            .then(response => {
                console.log('Issue created successfully:', response.data);
            })
            .catch(error => {
                console.error('Error creating issue:', error);
            });
    };

    const handleReadAll = (): void => {
        axios.get(ENDPOINTS.READ_ALL)
            .then(response => {
                console.log('All issues:', response.data);
            })
            .catch(error => {
                console.error('Error reading all issues:', error);
            });
    };

    const handleReadById = (id: number): void => {
        axios.get(`${ENDPOINTS.READ}/${id}`)
            .then(response => {
                console.log('Issue:', response.data);
            })
            .catch(error => {
                console.error('Error reading issue by ID:', error);
            });
    };

    const handleUpdate = (id: number, issue: Issue): void => {
        axios.put(`${ENDPOINTS.UPDATE}/${id}`, issue)
            .then(response => {
                console.log('Issue updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating issue:', error);
            });
    };

    const handleDelete = (id: number): void => {
        axios.delete(`${ENDPOINTS.DELETE}/${id}`)
            .then(response => {
                console.log('Issue deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting issue:', error);
            });
    };

    return (
        <div style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            width: 200,
            margin: '0 auto'
        }}>
            <button onClick={handleCreate}>Create Issue</button>
            <button onClick={handleReadAll}>Read All Issues</button>
            <button onClick={() => handleReadById(1)}>Read Issue by ID</button>
            <button onClick={() => handleUpdate(1, { title: 'Updated Title', description: 'Updated Description' })}>Update Issue</button>
            <button onClick={() => handleDelete(1)}>Delete Issue</button>
        </div>
    );
}

export default App;
