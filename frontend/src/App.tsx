import axios from 'axios';
import './App.css';
import CreateIssue from './components/CreateIssue';
import Divider from './components/Divider';
import { ENDPOINTS } from './utils/constants';
import { Issue } from './utils/types';
import ReadIssue from './components/ReadIssue';

function App() {
    const handleReadAll = (): void => {
        axios.get(ENDPOINTS.READ_ALL)
            .then(response => {
                console.log('All issues:', response.data);
            })
            .catch(error => {
                console.error('Error reading all issues:', error);
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
        <div className="container">
            <CreateIssue />
            <Divider />
            <button onClick={handleReadAll}>Read All Issues</button>
            <ReadIssue />
            <button onClick={() => handleUpdate(1, { title: 'Updated Title', description: 'Updated Description' })}>Update Issue</button>
            <button onClick={() => handleDelete(1)}>Delete Issue</button>
        </div>
    );
}

export default App;
