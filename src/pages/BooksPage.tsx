import React, { useEffect, useState } from 'react';
import { bookApi } from '../services/api';
import type { Book } from '../types';
import Layout from '../components/Layout';

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await bookApi.getBooks();
        setBooks(data);
        setError('');
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // No color helpers needed, fallback to plain style or MUI

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === '' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    ...new Set(books.map((book) => book.category).filter(Boolean)),
  ];

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px 0',
        }}
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              borderRadius: '50%',
              height: 64,
              width: 64,
              border: '4px solid #b3b3ff',
              borderTop: '4px solid #4b2995',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <div>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h3
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#222',
              marginBottom: 8,
            }}
          >
            Something went wrong
          </h3>
          <p style={{ color: '#888', marginBottom: 24 }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(90deg,#7b2ff2,#f357a8)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontWeight: 500,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: '#4b2995',
            marginBottom: 16,
          }}
        >
          📚 Discover Amazing Books
        </h1>
        <p
          style={{
            fontSize: 20,
            color: '#888',
            maxWidth: 600,
            margin: '0 auto',
          }}
        >
          Explore our curated collection of {books.length} incredible books
          waiting to be discovered
        </p>
      </div>

      {/* Search and Filter */}
      <div
        style={{
          marginBottom: 32,
          background: '#fff',
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: 12,
                  top: 16,
                  color: '#aaa',
                  pointerEvents: 'none',
                }}
              >
                🔍
              </span>
              <input
                type="text"
                placeholder="Search books or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 36px',
                  border: '1px solid #eee',
                  borderRadius: 12,
                  fontSize: 16,
                  outline: 'none',
                  marginBottom: 0,
                }}
              />
            </div>
          </div>
          <div style={{ minWidth: 200 }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #eee',
                borderRadius: 12,
                fontSize: 16,
              }}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 32,
        }}
      >
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              marginBottom: 0,
              position: 'relative',
              minHeight: 320,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Book Cover Simulation */}
            <div
              style={{
                height: 192,
                background: 'linear-gradient(90deg,#7b2ff2,#f357a8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ color: '#fff', textAlign: 'center', padding: 16 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📖</div>
                <h3 style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>
                  {book.title}
                </h3>
              </div>
              {/* Price Tag */}
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: '#fff',
                  borderRadius: 16,
                  padding: '4px 12px',
                  fontWeight: 700,
                  color: '#222',
                  fontSize: 14,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                ${book.price}
              </div>
              {/* Availability Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  background: '#7b2ff2',
                  color: '#fff',
                  borderRadius: 16,
                  padding: '4px 12px',
                  fontWeight: 500,
                  fontSize: 12,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                {book.available_copies}/{book.total_copies}
              </div>
            </div>

            {/* Book Details */}
            <div
              style={{
                padding: 24,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Author */}
              <p
                style={{
                  color: '#888',
                  fontSize: 14,
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                by {book.author}
              </p>
              {/* Category and Year */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    padding: '4px 12px',
                    fontSize: 12,
                    fontWeight: 500,
                    borderRadius: 16,
                    background: '#eee',
                    color: '#4b2995',
                  }}
                >
                  {book.category}
                </span>
                {book.publication_year && (
                  <span
                    style={{
                      padding: '4px 12px',
                      fontSize: 12,
                      fontWeight: 500,
                      borderRadius: 16,
                      background: '#f5f6fa',
                      color: '#888',
                    }}
                  >
                    {book.publication_year}
                  </span>
                )}
              </div>
              {/* Description */}
              {book.description && (
                <p
                  style={{
                    color: '#444',
                    fontSize: 14,
                    marginBottom: 16,
                    lineHeight: 1.5,
                  }}
                >
                  {book.description}
                </p>
              )}
              {/* ISBN */}
              <div
                style={{
                  fontSize: 12,
                  color: '#aaa',
                  marginBottom: 16,
                  fontFamily: 'monospace',
                }}
              >
                ISBN: {book.isbn}
              </div>
              {/* Rent Button */}
              <button
                disabled={book.available_copies === 0}
                style={{
                  width: '100%',
                  padding: '12px 0',
                  borderRadius: 12,
                  fontWeight: 500,
                  fontSize: 16,
                  background:
                    book.available_copies > 0
                      ? 'linear-gradient(90deg,#7b2ff2,#f357a8)'
                      : '#eee',
                  color: book.available_copies > 0 ? '#fff' : '#aaa',
                  border: 'none',
                  cursor: book.available_copies > 0 ? 'pointer' : 'not-allowed',
                  marginTop: 8,
                }}
              >
                {book.available_copies > 0 ? (
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ marginRight: 8 }}>📚</span>
                    Rent This Book
                  </span>
                ) : (
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ marginRight: 8 }}>❌</span>
                    Out of Stock
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: 80, marginBottom: 24 }}>📚</div>
          <h3
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: '#222',
              marginBottom: 16,
            }}
          >
            {searchTerm || selectedCategory
              ? 'No books match your search'
              : 'No books available'}
          </h3>
          <p
            style={{
              color: '#888',
              fontSize: 18,
              maxWidth: 400,
              margin: '0 auto',
            }}
          >
            {searchTerm || selectedCategory
              ? 'Try adjusting your search terms or browse all categories'
              : 'Check back later for new additions to our library'}
          </p>
          {(searchTerm || selectedCategory) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              style={{
                marginTop: 24,
                padding: '12px 24px',
                background: 'linear-gradient(90deg,#7b2ff2,#f357a8)',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontWeight: 500,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </Layout>
  );
};

export default BooksPage;
