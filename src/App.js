import {useState} from 'react'
import helpers from './helpers/index';
import './App.scss';

function App() {
  const [repoLink, setRepoLink] = useState('');
  const [repo,setRepo] = useState({});
  const [submited, setSubmited] = useState(false);
  const [branches, setBranches] = useState([]);
  const [mainBranch, setMainBranch] = useState({})
  
  const repoOnSubmit = async (e) => {
    e.preventDefault();
    console.log('submited');
    const repoResponse =  await helpers.fetchUrl(helpers.createRootReqUrl(repoLink));
    const branchesResponses = await helpers.fetchUrl(repoResponse.data.branches_url.replace('{/branch}',''));
    setRepo(repoResponse);
    setBranches(branchesResponses.data);
    setSubmited(true);
  }
  return (
    <div className="app">
      <div className="content">
        <div className="url-input element">
          <i className="fab fa-github"></i>
          <form
            onSubmit={repoOnSubmit}
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
        {
          submited ? 
          <>
          <div className="element branch-options">
         
                <select id="branches">
                {branches.map((branch,index) => {
                    return <option value={branch.name} key={index}>{branch.name}</option>
                  })}
                </select>
                <button type="submit"></button>
          </div>
         
          </> : null
        }

        <div className="result element">
          <div className="result-inner">
            <div className="wrapper">
              <a target="_blank" rel="noreferrer" href={helpers.findBranches(repoLink)}>{helpers.findBranches(repoLink)}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
