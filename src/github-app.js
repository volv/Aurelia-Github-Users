export class GithubApp {
  heading = 'Search Github User';
  userSearch = "defunkt"; // can change to null or undefined to start blank

  activate() {
    if (!this.userSearch) return;
    this.fetchUserInfo()
      .then(handleErrors)
      .then((userInfo) => {
        this.user = userInfo;
        return this.fetchUserOrgs();
      })
      .then((orgData) => {
        this.user.orgData = orgData;
        return this.fetchUserRepos();
      })
      .then((repoData) => {
        this.user.repoData = repoData;
        this.showApiUsage();
      })
  }

  fetchUserInfo = (user) => 
    fetch(`https://api.github.com/users/${this.userSearch}`)
      .then(response => response.json())

  fetchUserOrgs = (user) => 
    fetch(`https://api.github.com/users/${this.userSearch}/orgs`)
      .then(response => response.json())

  fetchUserRepos = (user) => 
    fetch(`https://api.github.com/users/${this.userSearch}/repos`)
      .then(response => response.json())

  showApiUsage = () => // Github rate limits to 60/hour. rate_limit call shouldn't count.
    fetch("https://api.github.com/rate_limit")
      .then(response => response.json())
      .then(data => {
        console.log(`Remaining API calls - ${data.rate.remaining}`);
        console.log(`Reset - ${new Date(data.rate.reset*1000).toLocaleTimeString()}`);
      });
}

function handleErrors(response) {
  if (!response.ok) {
    setTimeout(() => console.log("Error - ", response.message), 1000); // I just want it last in console.
  }
  return response;
}





// ```<p if.bind="user.repoData">Repos: ${user.repoData.length}</p>
//           <ul>
//               <!-- <div repeat.for="item of items | limitTo:5">${i}</div> -->
//             <li repeat.for="i of user.repoData | limitTo:5"><a href="${user.repoData[i].html_url}">${user.repoData[i].name}</a> - ${user.repoData[i].language}</li>
//           </ul>```




//STUFF I REMOVED TO MAKE SMALL VERSION
// import {inject} from 'aurelia-framework';
// import {HttpClient} from 'aurelia-fetch-client';
// import 'fetch';

// @inject(HttpClient)
// export class GithubApp {
//   constructor(http) {
//     http.configure(config => {
//       config
//         .useStandardConfiguration()
//         .withBaseUrl('https://api.github.com/');
//     });

//     this.http = http;
//   }
//   parseUserData(users) {
//     users.forEach(function(user) {
//       // return this.http.fetch(`${user.login}/followers`)
//       // .then(response => response.json())
//       // .then(followers => this.followers.length);
//       user.site_admin = false;
//     });
//   }