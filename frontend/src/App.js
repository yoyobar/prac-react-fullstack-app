import React from 'react';
import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
    const [lists, setLists] = useState([]);
    const [values, setValues] = useState('');

    useEffect(() => {
        const getLists = async () => {
            try {
                const { data } = await axios.get('/api/values');
                setLists(data.map((item) => item.value)); // Assuming each item has a 'value' property
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getLists();
    }, []);

    const inputHandler = (e) => {
        setValues(e.target.value);
    };

    const formHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/value', { value: values });
            if (data.success) {
                setLists([...lists, data.value]);
                setValues('');
            } else {
                alert('DB POST FAILED');
                setValues('');
            }
        } catch (error) {
            console.error('Error posting data:', error);
            alert('DB POST FAILED');
            setValues('');
        }
    };

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <div className='container'>
                    <ul>
                        {lists.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <form onSubmit={formHandler} className='example'>
                        <input value={values} onChange={inputHandler} type='text' placeholder='입력해주세요..' />
                        <button type='submit'>확인</button>
                    </form>
                </div>
            </header>
        </div>
    );
}

export default App;
