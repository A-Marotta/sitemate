import React, { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../utils/constants';
import { Issue } from '../utils/types';

const ReadByIdComponent: React.FC = () => {
    const [id, setId] = useState<string>('');
    const [issue, setIssue] = useState<Issue | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleReadById = () => {
        axios.get<Issue>(`${ENDPOINTS.READ}/${id}`)
            .then(response => {
                setIssue(response.data);
                setError(null);
            })
            .catch(error => {
                console.error(error)
                setError(`Unable to read issue with ID ${id}: ${error.response.data}`);
                setIssue(null);
            });
    };

    return (
        <div>
            <input type={'text'} placeholder={'Enter ID'} value={id} onChange={(e) => setId(e.target.value)} />
            <button onClick={handleReadById}>Read Issue by ID</button>
            {issue && (
                <div>
                    <h2>Issue:</h2>
                    <p>Title: {issue.title}</p>
                    <p>Description: {issue.description}</p>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default ReadByIdComponent;
