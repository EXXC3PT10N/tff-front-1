// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  path: 'http://localhost:5001/toplance-842bb/us-central1/app',
  defaultImage: 'assets/assets_with/img/pic.png',
  firebaseConfig: {
    apiKey: "AIzaSyANiESTPjqrYVDRq91YOTumRnkaMVYajlc",
    authDomain: "toplance-842bb.firebaseapp.com",
    databaseURL: "https://toplance-842bb.firebaseio.com",
    projectId: "toplance-842bb",
    storageBucket: "toplance-842bb.appspot.com",
    messagingSenderId: "303574020364"
  }
};
