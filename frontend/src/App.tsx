import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author: string;
}

interface Review {
  id: number;
  bookId: number;
  content: string;
  rating: number;
}

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [newReview, setNewReview] = useState({ content: '', rating: 5 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    const res = await axios.get<Book[]>('/books');
    setBooks(res.data);
    setLoading(false);
  };

  const fetchReviews = async (book: Book) => {
    setSelectedBook(book);
    setLoading(true);
    const res = await axios.get<Review[]>(`/books/${book.id}/reviews`);
    setReviews(res.data);
    setLoading(false);
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('/books', newBook);
    setNewBook({ title: '', author: '' });
    fetchBooks();
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook) return;
    await axios.post(`/books/${selectedBook.id}/reviews`, newReview);
    setNewReview({ content: '', rating: 5 });
    fetchReviews(selectedBook);
  };

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Book Review App</h1>
      <form onSubmit={handleAddBook} style={{ marginBottom: 24 }}>
        <input
          placeholder="Title"
          value={newBook.title}
          onChange={e => setNewBook({ ...newBook, title: e.target.value })}
          required
        />
        <input
          placeholder="Author"
          value={newBook.author}
          onChange={e => setNewBook({ ...newBook, author: e.target.value })}
          required
        />
        <button type="submit">Add Book</button>
      </form>
      <h2>Books</h2>
      {loading && <p>Loading...</p>}
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <b>{book.title}</b> by {book.author}
            <button style={{ marginLeft: 8 }} onClick={() => fetchReviews(book)}>
              View Reviews
            </button>
          </li>
        ))}
      </ul>
      {selectedBook && (
        <div style={{ marginTop: 32 }}>
          <h3>Reviews for {selectedBook.title}</h3>
          <form onSubmit={handleAddReview} style={{ marginBottom: 16 }}>
            <input
              placeholder="Review"
              value={newReview.content}
              onChange={e => setNewReview({ ...newReview, content: e.target.value })}
              required
            />
            <input
              type="number"
              min={1}
              max={5}
              value={newReview.rating}
              onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              required
              style={{ width: 50 }}
            />
            <button type="submit">Add Review</button>
          </form>
          <ul>
            {reviews.map(r => (
              <li key={r.id}>
                <b>{r.rating}/5</b>: {r.content}
              </li>
            ))}
          </ul>
          <button onClick={() => setSelectedBook(null)} style={{ marginTop: 16 }}>
            Back to Books
          </button>
        </div>
      )}
    </div>
  );
};

export default App; 