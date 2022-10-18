import Book from "./../Pages/Books";
import PropTypes from "prop-types";

const BookShelf = ({ shelfTitle, books, changeShelf, shelfCode }) => {
  const onDrop = (ev, cat) => {
    let book = JSON.parse(ev.dataTransfer.getData("book"));
    changeShelf(book, cat);
  };

  return (
    <div
      className="bookshelf"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        onDrop(e, shelfCode);
      }}
    >
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} book={book} changeShelf={changeShelf} />
          ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  shelfCode: PropTypes.string.isRequired,
};

export default BookShelf;
