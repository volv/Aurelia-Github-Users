export class GithubApp {
  heading = 'Search Github User';
  userSearch = "defunkt"; // can change to null or undefined to start blank

  activate() {
    if (!this.userSearch) return;
    this.fetchUserInfo()
      .then(this.fetchUserOrgs.bind(this))
      .then(this.fetchUserRepos.bind(this))
      .then(this.apiUsage.bind(this))
      .catch(this.displayErrors)
  }

  fetchUserInfo = () => new Promise((resolve, reject) => {
      fetch(`https://api.github.com/users/${this.userSearch}`)
        .then(response => response.json())
        .then(user => { 
          this.user = user;
          resolve();
        })
        .catch(error => { this.user = null; reject(error) });
      });
  

  fetchUserOrgs = () => new Promise((resolve, reject) => {
      fetch(`https://api.github.com/users/${this.userSearch}/orgs`)
        .then(response => response.json())
        .then(orgData => {
          this.user.orgData = orgData;
          resolve();
        })
        .catch(error => { this.user = null; reject(error) });
      });
  

  fetchUserRepos = () => new Promise((resolve, reject) => {
      fetch(`https://api.github.com/users/${this.userSearch}/repos`)
        .then(response => response.json())
        .then(repoData => { 
          this.user.repoData = repoData;
          resolve();
        })
        .catch(error => { this.user = null; reject(error) });
      });

  apiUsage() { // Github rate limits to 60/hour. rate_limit call shouldn't count.
    fetch("https://api.github.com/rate_limit")
      .then(response => response.json())
      .then(data => {
        console.log(`Remaining API calls - ${data.rate.remaining}`);
        console.log(`Reset - ${new Date(data.rate.reset*1000).toLocaleTimeString()}`);
      });
  }

  displayErrors(error) {
    if (error.status === 403) {
      console.log("Forbidden - probably rate limited"); return;
    }
    if (error.status === 404) {
      console.log("Profile Not Found"); return;
    }
    console.log("Error - ", error);
  }

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
