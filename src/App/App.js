import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setTitle , setSize, clearWord, addWord, searchWordGenerate  } from './store';

function App(props) {
  const selectSize = useSelector(state => state.size);
  const selectWordList = useSelector(state => state.wordList)
  const selectSearchWord = useSelector(state => state.searchWord);
  const dispatch = useDispatch();

  const handleChange = event => {
    console.log("Size : " + event.target.value);
    // parseInt will transform the string we recieved by an integer value
    dispatch(setSize(parseInt(event.target.value)));
  }

  const handleSubmit = async(event) => {
    // the prevent Default will prevent all my page to refresh when submit the form (just the form will refreshe)
    event.preventDefault();
    // we set the title
    console.log("Title : " + event.target.title.value)
    dispatch(setTitle(event.target.title.value))
    //the size is already set by the onChange function
    console.log("Size : " + event.target.size.value)

    dispatch(clearWord())

    console.log("Word list:")
    await event.target.word.forEach(word => {
      if(word.value){
        console.log(word.value)
        dispatch(addWord(word.value))
      }
    });

    dispatch(searchWordGenerate(selectWordList, selectSize));
  }

  return (
    <div className="App">
      {/* Header + instruction */}
      <header>
        <h1>Search Words Generator</h1>
      </header>
      <h2>Instruction</h2>
      <p>Follow the various steps to customize your word search puzzle. Some of the steps are optional while others are required in order to generate the puzzle. 
        <br/>When you're finished, you can generate your puzzle. If you're not satisfied with the layout, 
        you can regenerate the puzzle and once you're happy with it, you can print the result and enjoy a paper version of your puzzle!
        <br/><br/>
        Happy Puzzling!
      </p>

      {/* Customization formular */}
      <h2>customizator:</h2>
      <form onSubmit={handleSubmit}>

        <h3>1- Title (optional)</h3>
        <p>Enter the title you would like for your puzzle. It can be a theme such as for example, Disney movies, Vegetables...</p>
        <label for="title">Title</label>
        <br/><input type="text" id="title" />
        
        <h3>2- Size (optional)</h3>
        <p>If you like to change the size of the grid, by default we had a 16 by 16 grid.
          <br/>We recommend that you keep the default size, but if you decide to go smaller, 
          please note that your words must be shorter than the minimum length of your grid.
        </p>
        <label for="size">Size : {selectSize}*{selectSize} </label>
        <br/><input type="range"  id="size" min="8" max="24" step="4" list='length' onChange={handleChange}/>
        <datalist id='length'>
          <option value="8" label='8'></option>
          <option value="16" label='16'></option>
          <option value="24" label='24'></option>
        </datalist>
        
        <h3>3- Words (required)</h3>
        <p>Choose the number of words you want to hide inside the puzzle and write them: 
          <br/>- For your puzzle size {selectSize}*{selectSize} we recommande beetween 10 - 30 words. {/*interactivity we will be add with state*/}
          <br/>- Your words must be {selectSize} letters or fewer. Any special characters, accents, or spaces will be removed.
        </p>
        <label for="word">Words</label>
        <br/><input type="text" id="word" required/><input type="text" id="word" required/><input type="text" id="word" required/><input type="text" id="word" required/><input type="text" id="word" required/> - 5 words 
        <br/><input type="text" id="word" required/><input type="text" id="word" required/><input type="text" id="word" required/><input type="text" id="word" required/><input type="text" id="word" required/> - 10 words (required)
        <br/><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /> - 15 words
        <br/><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /> - 20 words
        <br/><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /> - 25 words
        <br/><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /> - 30 words
        <br/>
        <br/>
        <p>When you're satisfied with your list of words, you can generate your puzzle by pressing this button: <input type="submit" value="Generate" />
        <br/>If you want a different layout, click on the Generate button again.
        </p>
      </form>
      
      {/* Puzzle */}
      <div className='Puzzle'>

      </div>
    </div>
  );
}

export default App;