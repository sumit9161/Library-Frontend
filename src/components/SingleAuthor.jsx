import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { variables } from '../Variables';

export default function SingleAuthor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAuthor = async () => {
        try {
            const response = await fetch(variables.API_URL + 'authors/' + id);
            if (!response.ok) {
                console.error('Author not found');
                setAuthor(null);
                return;
            }
            const data = await response.json();
            setAuthor(data);
        } catch (error) {
            console.error('Error fetching author:', error);
            setAuthor(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthor();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this author?")) {
            try {
                await fetch(variables.API_URL + 'authors/' + id, {
                    method: 'DELETE'
                });
                alert('Author deleted successfully!');
                navigate('/authors');
            } catch (error) {
                console.error('Error deleting author:', error);
                alert('Failed to delete author. Check server.');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600 text-lg">Loading author details...</p>
            </div>
        );
    }

    if (!author) {
        return (
            <div className="flex flex-col items-center mt-10">
                <p className="text-red-500 mb-4">Author not found.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Back
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 max-w-2xl mx-auto">
            <div className="flex justify-between mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Back
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Delete Author
                </button>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-2">{author.name}</h2>
            <p className="text-gray-700">{author.email}</p>
        </div>
    );
}
