import axios from 'axios'
const helpers = {
  createRootReqUrl:  (repoLink)=>{
    
    const info = repoLink.split('/');
    const repoName = info[info.length-1];
    const repoOwner = info[info.length-2];
    return `https://api.github.com/repos/${repoOwner}/${repoName}`;
  },
  findBranches : function (repoLink) {
    return 'https://'+this.createRootReqUrl(repoLink) + '/branches';
  },
  findCommits: function (repoLink) {
    return this.createRootReqUrl(repoLink) + '/commits';
  },
  fetchUrl:  async function (requestUrl) {
   console.log('url',requestUrl);
   const response = await axios.get(requestUrl);
   console.log(response);
   return response;
  }
}

export default helpers;