import "./App.css";
import { Routes, Route } from "react-router-dom";
import { getAll, update } from "./Api/BooksAPI";
import Dashboard from "./Components/Dashboard";
import Search from "./Pages/Search";
import { useState, useEffect } from "react";
import BookDetails from "./Components/BookDetails";

function App() {
  const [books, setBooks] = useState([]);

  const changeShelf = (bookToChange, shelf) => {
    // temp array to change shelf
    let mutableArray = books.map((a) => {
      return { ...a };
    });

    let bookFound = mutableArray.find((a) => a.id === bookToChange.id);

    if (bookFound) {
      mutableArray = mutableArray.map((book) => {
        if (bookToChange.id === book.id) {
          return { ...book, shelf };
        }
        return book;
      });
    } else {
      bookToChange.shelf = shelf;
      mutableArray = [...mutableArray, bookToChange];
    }
    update(bookToChange, shelf).then((res) => {});
    setBooks(mutableArray);
  };

  useEffect(() => {
    const localData = localStorage.getItem("books");
    if (localData) {
      setBooks(JSON.parse(localData));
    } else {
      getAll().then((res) => {
        setBooks(res);
      });
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={<Dashboard books={books} changeShelf={changeShelf} />}
        ></Route>
        <Route
          exact
          path="/search"
          element={<Search books={books} changeShelf={changeShelf} />}
        ></Route>
        <Route path="/bookdetails" element={<BookDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
