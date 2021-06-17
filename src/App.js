import {useState,useEffect} from 'react'
import helpers from './helpers/index';
import './App.scss';

function App() {
  const [repoLink, setRepoLink] = useState('');
  const [localStates, setLocalStates] = useState({
    repo:{},
    branches:[],
    selectedBranch:'',
    selectedCommitOption:'last-commit',
  })
  const [steps, setSteps] = useState({
    submited:false,
    final:false,
  })
  const [result,setResult] = useState(''); 

  useEffect(() => {
    async function calculateLink() {
      if (steps.final === true) {
        const link = await helpers.findCommits(repoLink,localStates.selectedBranch,localStates.selectedCommitOption);
        setResult(link);
      }
    }

    calculateLink();
  },[localStates.selectedBranch,localStates.selectedCommitOption,repoLink,steps.final])
  
  const repoOnSubmit = async (e) => {
    e.preventDefault();
    const repoResponse = await helpers.fetchUrl(helpers.createRootReqUrl(repoLink));
    const branchesResponses = await helpers.fetchUrl(repoResponse.data.branches_url.replace('{/branch}', ''));
    setLocalStates({
      ...localStates,
      repo: repoResponse.data,
      branches: branchesResponses.data,
      selectedBranch:branchesResponses.data[0].name
    })
    setSteps({
      ...steps,
      submited:true
    });
  }

  const resultInfo = steps.submited ? 'One more step.Select branch and commit options': "Copy repo link and press enter for options";

  return (
    <div className="app">
      <div className="content">
        <div className="url-input element">
          <i className="fab fa-github"></i>
          <form onSubmit={repoOnSubmit}>
            <input
              value={repoLink}
              placeholder="Your url"
              onChange={(e) => {
                setRepoLink(e.target.value);
              }}
            />
          </form>
        </div>
        {steps.submited ? (
          <>
            <div className="element branch-options">
              <select
                defaultValue={localStates.branches[0].name}
                onChange={(e) => {
                  setLocalStates({
                    ...localStates,
                    selectedBranch: e.target.value
                  })
                }}
                id="branches"
              >
                {localStates.branches.map((branch, index) => {
                  return (
                    <option value={branch.name} key={index}>
                      {branch.name}
                    </option>
                  );
                })}
              </select>
              <button type="submit"></button>
            </div>
            <div className="element branch-options">
              <select
                value='last-commit'
                onChange={(e) => {
                  setLocalStates({
                    ...localStates,
                    selectedCommitOption: e.target.value,
                  })
                }}
                id="commits"
              >
                <option  value='last-commit'>
                        Last commit
                </option>
                <option  value='first-commit'>
                        First commit
                </option>
                
              </select>
            </div>
            <div className=" final-button-wrapper">
              <button 
                className="final-result"
                onClick = {
                  e => {
                    console.log(repoLink);
                    setSteps({
                      ...steps,
                      final: true
                    });
                  }
                }
              >
                Get link!
              </button>
            </div>
           
          </>
        ) : null}

        <div className="result element">
          <div className="result-inner">
            <div className="wrapper">
              {steps.final ? (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={result}
                >
                  {result}
                </a>
              ) : (
                resultInfo
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
