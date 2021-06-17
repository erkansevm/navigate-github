import axios from 'axios'
const helpers = {
  createRootReqUrl:  (repoLink)=>{
    
    const info = repoLink.split('/');
    const repoName = info[info.length-1];
    const repoOwner = info[info.length-2];
    return `https://api.github.com/repos/${repoOwner}/${repoName}`;
  },
  findCommitCountAtGivenBranch :  function (repoLink,branchName,option) {
/*     //https://api.github.com/repos/vitejs/vite/commits?sha=main
    const url = `${this.createRootReqUrl(repoLink)}/commits?sha=${branchName}`;
    console.log('url-commit',url);
    const response = await axios.get(url);
    console.log('commits',response.data);
    return repoLink+ '/commits/'+branchName; */
    let url = `${this.createRootReqUrl(repoLink)}/commits?sha=${branchName}&per_page=100`
    let pages = 0;

  return fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })
    .then((data) => data.headers)
    .then(
      (result) =>
      result
      .get("link")
      .split(",")[1]
      .match(/.*page=(?<page_num>\d+)/).groups.page_num
    )
    .then((numberOfPages) => {
      pages = numberOfPages;
      return fetch(url + `&page=${numberOfPages}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }).then((data) => data.json());
    })
    .then((data) => {
      return data.length + (pages - 1) * 100;
    })
    .catch((err) => {
      console.log(`ERROR: calling: ${url}`);
      console.log("See below for more info:");
      console.log(err);
    });
  },
  findCommits:async function (repoLink,branchName,option) {
    const commitCount = await this.findCommitCountAtGivenBranch(repoLink, branchName, option);
    if (commitCount < 35) {
      return `${repoLink}/commits/${branchName}`
    }

    const numberAfterSha = commitCount - 35;
    let url = `${this.createRootReqUrl(repoLink)}/commits?sha=${branchName}&per_page=35`
    const response = await axios.get(url);
    const lastCommitsShaofPage = response.data[0].sha;
    console.log(response);
    console.log(lastCommitsShaofPage);

    let resultUrl = `${repoLink}/commits/${branchName}?after=${lastCommitsShaofPage}+${numberAfterSha}&branch=${branchName}`;
    return resultUrl;
  },
  fetchUrl:  async function (requestUrl) {
   console.log('url',requestUrl);
   const response = await axios.get(requestUrl);
   console.log(response);
   return response;
  },
  
}

export default helpers;

  
