import './App.css';
import firebase from './firebase';
import { useState, useEffect } from 'react';

function App() {

  const [books, setBooks] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleChange = (event) => {
    setUserInput(event.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref();
    dbRef.push(userInput);
    setUserInput('');
  }

  const removeBook = (key) => {
    // send off a request to firebase to remove a book with a specific id
    const dbRef = firebase.database().ref();

    dbRef.child(key).remove();

  }

  useEffect( () => {

    // Here we create a variable that holds a reference to our database
    const dbRef = firebase.database().ref();

    // Here we add an event listener to that variable that will fire
    // every time there is a change in the database.

    // This event listener takes a callback function which we will use to get our data
    // from the database, and call that data 'response'.

    dbRef.on('value', (response) => {

      // Here we're creating a variable to store the new state we want to introduce to our app

      const newState = [];

      // Here we store the response from our query to Firebase inside of a variable called data
      // .val() is a Firebase method that gets us the information we want

      const data = response.val();

      // data is an object, so we iterate through it using a for in loop to access each book name

      for (let key in data) {
        newState.push({
          key: key, 
          name: data[key]
        });
      }

      // call the seBooks function to update out component's state to be the new value
      setBooks(newState);
     
  
    })

  }, [] );

  return (
    <div className="App">
      <h1>Our Bookshelf App</h1>
      <ul>
        {books.map( (book) => {
          return(
            <li key={book.key}>
              <p>{book.name}</p>
              <button onClick={() => removeBook(book.key)}>Remove Book</button>
            </li>
          )
        })}
      </ul>

      <form action="submit">
        <label htmlFor="newBook">Add a book to your bookshelf</label>
        <input 
          type="text" 
          id="newBook" 
          onChange={handleChange}
          value={userInput}
        />
        <button onClick={handleClick}>Add Book</button>
      </form>
    </div>
  );
}

export default App;
