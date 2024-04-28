import React, { useState } from 'react';

const ComponentA = () => {
    const [inputData, setInputData] = useState('');
    const [currentData, setCurrentData] = useState('');
    const [updatedData, setUpdatedData] = useState('');
    const [operationCounts, setOperationCounts] = useState({ adds: 0, updates: 0 });

    const handleAdd = async () => {
        try {
            const response = await fetch('http://localhost:4000/data/add/A', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: inputData })
            });
            const result = await response.json();
            console.log('Added Data:', result);
            setInputData('');
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch('http://localhost:4000/data/update/A', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentContent: currentData, updatedContent: updatedData })
            });
            const result = await response.json();
            console.log('Updated Data:', result);
            setCurrentData('');
            setUpdatedData('');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const fetchCounts = async () => {
        try {
            const response = await fetch('http://localhost:4000/data/count');
            const data = await response.json();
            const countData = data.find(item => item.type === 'A')?.operationCount || { adds: 0, updates: 0 };
            setOperationCounts(countData);
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };
    
    return (
        <div style={{ width: '100%', height: '100%', background: '#add8e6', padding: '20px' }}>
            <h2>Component A</h2>
            <input
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Enter new content"
                style={{ width: '49%', padding: '10px', marginBottom: '10px' }}
            />
            <button onClick={handleAdd}>Add</button>
            <div>
                <input
                    value={currentData}
                    onChange={(e) => setCurrentData(e.target.value)}
                    placeholder="Current Content"
                    style={{ width: '49%', padding: '10px', marginRight: '2%' }}
                />
                <input
                    value={updatedData}
                    onChange={(e) => setUpdatedData(e.target.value)}
                    placeholder="Updated content"
                    style={{ width: '49%', padding: '10px' }}
                />
                <button onClick={handleUpdate} style={{ marginTop: '10px' }}>Update</button>
            </div>
            <button onClick={fetchCounts} style={{ marginTop: '10px' }}>Get Count</button>
            <div>
                <p>Adds: {operationCounts.adds}</p>
                <p>Updates: {operationCounts.updates}</p>
            </div>
        </div>
    );
};

export default ComponentA;
