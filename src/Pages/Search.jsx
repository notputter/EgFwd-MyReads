import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../Api/BooksAPI";
import Book from "./Books";
import PropTypes from "prop-types";
import useDebounce from "./../Utilities/useDebounce";

const Search = ({ changeShelf, books }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounce(searchQuery, 500);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      search(debouncedValue, 5).then((res) => {
        if (!res.error) {
          res = res.map((searhedBook) => {
            const bookOnShelf = books.find((b) => b.id === searhedBook.id);
            if (bookOnShelf) {
              searhedBook.shelf = bookOnShelf.shelf;
            }
            return searhedBook;
          });
          setSearchResults(res);
        } else {
          setSearchResults([]);
        }
      });
    } else {
      setSearchResults([]);
    }
  }, [books, debouncedValue]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={"/"}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        {searchResults.length > 1 && (
          <ol className="books-grid">
            {searchResults.map((book) => (
              <Book key={book.id} book={book} changeShelf={changeShelf} />
            ))}
          </ol>
        )}
        {searchQuery.length > 0 && searchResults.length < 1 && (
          <h1>Could not find any books</h1>
        )}
      </div>
    </div>
  );
};

Search.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
};
export default Search;
