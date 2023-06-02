const ghpages = require('gh-pages');
const pjson = require('../package.json');
const fs = require('fs');
const gitRemoteOriginUrl = (...args) => import('git-remote-origin-url').then(({ default: fetch }) => fetch(...args));
gitRemoteOriginUrl().then(name => {
    let vals = name.split('/');
    let path = `https://${vals[3]}.github.io/${vals[4].split('.')[0]}/`
    let index = fs.readFileSync('dist/' + pjson.name + '/index.html', 'utf8')
    fs.writeFileSync('dist/' + pjson.name + '/index.html', index.replace('<base href="/">', `<base href="${path}">`))
    console.log('Base path changed to', path)
})
