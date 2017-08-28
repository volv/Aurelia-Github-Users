export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'github-app'],  name: 'github-app', moduleId: 'github-app', nav: true, title: 'Search GitHub User' }
    ]);

    this.router = router;
  }
}
