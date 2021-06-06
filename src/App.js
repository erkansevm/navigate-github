import {useState} from 'react'
import helpers from './helpers/index';
import './App.scss';

function App() {
  const [repoLink, setRepoLink] = useState('');
  const [repoApi,setRepoApi] = useState('');
  const [repo,setRepo] = useState({});


  return (
    <div className="app">
      <div className="content">
        <div className="url-input element">
          <i class="fab fa-github"></i>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setRepoApi(helpers.findRepoName(repoLink));
            }}
          >
            <input
              value={repoLink}
              placeholder="Your url"
              onChange={(e) => {
                setRepoLink(e.target.value);
              }}
            />
          </form>
        </div>
        <div className="element branch-options">
         
              <select id="branches">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="fiat">Fiat</option>
                <option value="audi">Audi</option>
              </select>
              <button type="submit"></button>
        </div>

        <div className="result element">
          <div className="result-inner">
            <div className="wrapper">
              <a target="_blank" href={helpers.findBranches(repoLink)}>{helpers.findBranches(repoLink)}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
