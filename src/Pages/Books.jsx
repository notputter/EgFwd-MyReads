import PropTypes from "prop-types";
import { useNavigate } from "react-router";

const Book = ({ book, changeShelf }) => {
  const nav = useNavigate();
  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData("book", JSON.stringify(book));
  };
  const shelves = [
    { id: 0, title: "Currently Reading", code: "currentlyReading" },
    { id: 1, title: "Want to Read", code: "wantToRead" },
    { id: 2, title: "Read", code: "read" },
  ];
  return (
    <div
      className="book"
      draggable
      onDragStart={(e) => {
        onDragStart(e, book.id);
      }}
    >
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                // handle
                nav(`/bookDetails?id=${book.id}`);
              }
            }}
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${
                book.imageLinks ? book.imageLinks.smallThumbnail : ""
              }")`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={book.shelf ? book.shelf : "none"}
              onChange={(e) => {
                changeShelf(book, e.target.value);
              }}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <option value="disabled" disabled>
                Move to...
              </option>
              {shelves.map((shelf) => (
                <option key={shelf.id} value={shelf.code}>
                  {shelf.title}
                </option>
              ))}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors &&
          book.authors.map((author) => (
            <div key={author} className="book-authors">
              {author}
            </div>
          ))}
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  changeShelf: PropTypes.func.isRequired,
};
export default Book;
