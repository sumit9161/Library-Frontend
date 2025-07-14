import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { variables } from '../Variables';

export default function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ title: "", yearPublished: "", authorId: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(variables.API_URL + `books/${id}`)
      .then(res => res.json())
      .then(data => {
        setBook(data);
        console.log("data is", data);
        setFormData({
          title: data.title,
          yearPublished: data.yearPublished,
          authorId: data.authorId
        });
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await fetch(variables.API_URL + `books/${id}`, {
        method: "DELETE"
      });
      alert("Book deleted!");
      navigate("/books");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(variables.API_URL + `books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: book.id,
        title: formData.title,
        yearPublished: parseInt(formData.yearPublished),
        authorId: parseInt(formData.authorId)
      })
    });
    alert("Book updated!");
    setEditMode(false);
    navigate(0);
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>Book Details</h3>
      {editMode ? (
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              value={formData.yearPublished}
              onChange={e => setFormData({ ...formData, yearPublished: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              value={formData.authorId}
              onChange={e => setFormData({ ...formData, authorId: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Year Published:</strong> {book.yearPublished}</p>
          <p><strong>Author ID:</strong> {book.author.authorId}</p>
          <p><strong>Author:</strong> {book.author.name}</p>
          <button onClick={() => setEditMode(true)} className="btn btn-warning me-2">Edit</button>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </>
      )}
    </div>
  );
}
