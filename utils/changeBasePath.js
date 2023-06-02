const pjson = require('../angular.json');
const fs = require('fs');
const gitRemoteOriginUrl = (...args) => import('git-remote-origin-url').then(({ default: fetch }) => fetch(...args));

gitRemoteOriginUrl().then(name => {
    let vals = name.split('/');
    let path = `https://${vals[3]}.github.io/${vals[4].split('.')[0]}/`

    // Update angular.json baseHref/deployUrl with full path to our app
    pjson.projects.GadgetHarness.architect.build.configurations.production.baseHref = path;
    pjson.projects.GadgetHarness.architect.build.configurations.production.deployUrl = path;

    fs.writeFile('./angular.json', JSON.stringify(pjson, null, 4), function writeJSON(err) {
        if (err) return console.log(err);
    });
})
