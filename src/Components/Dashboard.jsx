import Navbar from "./navbar";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Dashboard = ({ books, changeShelf }) => {
  const getBooksForShelf = (bookshelf) => {
    return books.filter(({ shelf }) => shelf === bookshelf);
  };

  const shelves = [
    { id: 0, title: "Currently Reading", code: "currentlyReading" },
    { id: 1, title: "Want to Read", code: "wantToRead" },
    { id: 2, title: "Read", code: "read" },
  ];

  return (
    <div>
      <Navbar></Navbar>

      {shelves.map((shelf) => (
        <BookShelf
          key={shelf.id}
          shelfTitle={shelf.title}
          shelfCode={shelf.code}
          books={getBooksForShelf(shelf.code)}
          changeShelf={changeShelf}
        ></BookShelf>
      ))}
      <div className="open-search">
        <Link to={"/search"}>Find a book</Link>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
};
export default Dashboard;
