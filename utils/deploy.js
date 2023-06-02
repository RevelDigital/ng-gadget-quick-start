const ghpages = require('gh-pages');
const pjson = require('../package.json');
const gitRemoteOriginUrl = (...args) => import('git-remote-origin-url').then(({ default: fetch }) => fetch(...args));
gitRemoteOriginUrl().then(name => {
    let vals = name.split('/');
    ghpages.publish('dist/' + pjson.name, function (err) {
        if (typeof err === 'undefined')
            console.log(`${pjson.name} version ${pjson.version} deployed successfully https://${vals[3]}.github.io/${vals[4].split('.')[0]}/${pjson.name}.xml?cacheBreakVersion=${pjson.version}`)
        else
            console.log(err)
    });
})
