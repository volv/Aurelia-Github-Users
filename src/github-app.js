//straight copy of users.js

import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class GithubApp {

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    this.http = http;
  }

  heading = 'Search Github User';
  users = [];
  userSearch = 'scraggo';

// //added
  submit() {
    // this.userName = this.user;
    alert(`Do stuff, ${this.userSearch}!`);
  }

  parseUserData(users) {
    console.log(users);
    users.forEach(function(user) {
      // return this.http.fetch(`${user.login}/followers`)
      // .then(response => response.json())
      // .then(followers => this.followers.length);

      user.site_admin = false;
    });
  }

  fetchOrgs() {
    // this.user = user;
    // console.dir(user);
    // console.log(`users/${user.login}/orgs`);
    // console.log(this.userSearch);
    // return this.http.fetch(`users/${user.login}/orgs`)
    return this.http.fetch(`users/${this.userSearch}/orgs`)
    .then(response => response.json())
    // .then(data => data.length)
    .then(data => this.data = data);
  }

  activate() {
    return this.http.fetch(`users/${this.userSearch}`)
    // return this.http.fetch('users/brianyu28/orgs')
      .then(response => response.json())
      .then(user => this.user = user);
      // .then(user => this.fetchOrgs(user));
      // .then(data => console.log(data.length));
  }

}
