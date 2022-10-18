import Navbar from "./navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { get } from "./../Api/BooksAPI";
import { useEffect, useState } from "react";
import "./../App.css";

const BookDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [book, setBook] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    get(searchParams.get("id")).then((res) => {
      setBook(res);
    });
  }, [searchParams]);
  return (
    <div>
      <Navbar> </Navbar>
      <div className="main-details">
        <div className="close-details" onClick={() => navigate(-1)}></div>
        {book && (
          <div className="container-details">
            {book.imageLinks && (
              <div className="thumbnail-details">
                <img
                  width="400"
                  alt="book cover"
                  src={book.imageLinks ? book.imageLinks.thumbnail : ""}
                />
              </div>
            )}
            <div className="book-details">
              <h1 className="book-title-details">{book.title}</h1>
              {book.authors &&
                book.authors.map((author) => (
                  <div key={author} className="book-author-details">
                    <h2> {author} </h2>
                  </div>
                ))}
              {book.description && (
                <div className="book-description-details">
                  {book.description}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
