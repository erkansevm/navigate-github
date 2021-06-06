
const helpers = {
  findRepoName :  (repoLink)=>{
    
    const info = repoLink.split('/');
    const repoName = info[info.length-1];
    const repoOwner = info[info.length-2];
    return `api.github.com/repos/${repoOwner}/${repoName}`;
  },
  findBranches : function (repoLink) {
    return 'https://'+this.findRepoName(repoLink) + '/branches';
  },
  findCommits: function (repoLink) {
    return this.findRepoName(repoLink) + '/commits';
  }
}

export default helpers;