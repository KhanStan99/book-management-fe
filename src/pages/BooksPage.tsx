import React, { useEffect, useState } from 'react';
import { bookApi } from '../services/api';
import type { Book } from '../types';

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

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'from-emerald-400 to-emerald-600 text-white';
    if (percentage > 20) return 'from-amber-400 to-amber-600 text-white';
    return 'from-red-400 to-red-600 text-white';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Fiction': 'from-blue-400 to-blue-600 text-white',
      'Science Fiction': 'from-purple-400 to-purple-600 text-white',
      'Fantasy': 'from-pink-400 to-pink-600 text-white',
      'Romance': 'from-rose-400 to-rose-600 text-white',
      'Mystery': 'from-gray-400 to-gray-600 text-white',
      'Non-fiction': 'from-green-400 to-green-600 text-white',
    };
    return colors[category] || 'from-gray-400 to-gray-600 text-white';
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(books.map(book => book.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="animate-fadeInUp">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeInUp">
      {/* Beautiful Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          📚 Discover Amazing Books
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our curated collection of {books.length} incredible books waiting to be discovered
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 glass rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search books or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          <div className="sm:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBooks.map((book, index) => (
          <div
            key={book.id}
            className="group relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-50"></div>
            
            {/* Book Cover Simulation */}
            <div className="relative h-48 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 flex items-center justify-center">
              <div className="text-white text-center p-4">
                <div className="text-4xl mb-2">📖</div>
                <h3 className="font-bold text-lg line-clamp-2">{book.title}</h3>
              </div>
              
              {/* Price Tag */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-gray-900 shadow-lg">
                ${book.price}
              </div>
              
              {/* Availability Badge */}
              <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getAvailabilityColor(book.available_copies, book.total_copies)} shadow-lg`}>
                {book.available_copies}/{book.total_copies}
              </div>
            </div>

            {/* Book Details */}
            <div className="relative p-6">
              {/* Author */}
              <p className="text-gray-600 text-sm mb-2 font-medium">by {book.author}</p>
              
              {/* Category and Year */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getCategoryColor(book.category || '')} shadow-sm`}>
                  {book.category}
                </span>
                {book.publication_year && (
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                    {book.publication_year}
                  </span>
                )}
              </div>

              {/* Description */}
              {book.description && (
                <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {book.description}
                </p>
              )}
              
              {/* ISBN */}
              <div className="text-xs text-gray-500 mb-4 font-mono">
                ISBN: {book.isbn}
              </div>

              {/* Rent Button */}
              <button
                disabled={book.available_copies === 0}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                  book.available_copies > 0
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {book.available_copies > 0 ? (
                  <span className="flex items-center justify-center">
                    <span className="mr-2">📚</span>
                    Rent This Book
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="mr-2">❌</span>
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
        <div className="text-center py-20 animate-fadeInUp">
          <div className="text-8xl mb-6 animate-float">📚</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {searchTerm || selectedCategory ? 'No books match your search' : 'No books available'}
          </h3>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
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
              className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BooksPage;

