import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => setFile(e.target.files[0]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a file first.');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file); // וודאי שהקובץ נשלח תחת המפתח "file"
    
        try {
            const response = await axios.post('http://localhost:5000/file/analyze', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error analyzing file:', error.response?.data || error.message);
        }
    };
  

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".pdf" onChange={handleFileChange} />
                <button type="submit">Analyze File</button>
            </form>
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    );
};

export default FileUpload;
