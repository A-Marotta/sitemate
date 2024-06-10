import axios from 'axios';
import React, { useMemo, useState } from 'react';
import { ENDPOINTS } from '../utils/constants';

interface CreateIssueProps { }

const CreateIssue: React.FC<CreateIssueProps> = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleCreate = (): void => {
        if (title.length === 0) return;
        if (description.length === 0) return;

        axios.post(ENDPOINTS.CREATE, {
            title: title,
            description: description
        })
            .then(() => {
                setTitle('');
                setDescription('');
            })
            .catch(error => {
                console.error('Error creating issue: ', error);
            });
    };

    const isButtonDisabled = useMemo(() => {
        if (title.length === 0) return true;
        if (description.length === 0) return true;

        return false
    }, [title, description])

    return (
        <React.Fragment>
            <span>Create Issue: </span>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10
            }}>
                <input
                    type={'text'}
                    placeholder={'Enter Title'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder={'Enter Description'}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div style={{ display: 'grid', justifyContent: 'end' }}>
                <button disabled={isButtonDisabled} onClick={handleCreate}>Create Issue</button>
            </div></React.Fragment>
    );
};

export default CreateIssue;
