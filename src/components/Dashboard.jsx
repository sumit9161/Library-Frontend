import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f9f9f9',
        }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>📚 Dashboard</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        padding: '12px 20px',
                        fontSize: '16px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Home
                </button>
                <button
                    onClick={() => navigate('/books')}
                    style={{
                        padding: '12px 20px',
                        fontSize: '16px',
                        backgroundColor: '#2ecc71',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Books
                </button>
                <button
                    onClick={() => navigate('/authors')}
                    style={{
                        padding: '12px 20px',
                        fontSize: '16px',
                        backgroundColor: '#e67e22',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Authors
                </button>
            </div>
        </div>
    );
}
