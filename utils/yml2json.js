const yaml = require('js-yaml');
const fs   = require('fs');
const pjson = require('../package.json');

try {
  const doc = yaml.load(fs.readFileSync(process.argv[2], 'utf8'));
  const html = fs.readFileSync(process.argv[3]+`/${pjson.name}/index.html`);
  fs.writeFileSync(`${process.argv[3]}/${pjson.name}/${pjson.name}.xml`, processYML(doc, html));
} catch (e) {
  console.log(e);
}


function processYML(json, html){
  let modulePrefs = `<?xml version=\"1.0\" encoding=\"UTF-8\" ?> \n<Module>\n`
  modulePrefs+=modulePrefsHeader(json);
  modulePrefs+=locales(json.locales)
  modulePrefs+=requirements(json.requirements)
  modulePrefs+=userPrefs(json.prefs);
  modulePrefs+=`</ModulePrefs>\n<Content type="html">\n<![CDATA[\n`
  modulePrefs+=html
  modulePrefs+=`\n]]>\n</Content>\n</Module>`
  return modulePrefs
}


function modulePrefsHeader(json){
  return `<ModulePrefs title="${json.title}" title_url="${json.title_url}" version="${pjson.version}" description="${json.description}" author="${json.author}" background="${json.background}">\n`
}

function locales(optionsArray){
  let locales = "";
  if(optionsArray) {
    for (let val of optionsArray) {
      if (val.lang)
        locales += `    <Locale lang="${val.lang}" messages="${val.messages}"/>\n`
      else
        locales += `    <Locale messages="${val.messages}"/>\n`
    }
  }
  return locales
}

function requirements(optionsArray){
  let requirements = "";
  if(optionsArray) {
    for (let val of optionsArray) {
      requirements += `    <Require feature="${val}" />\n`
    }
  }
  return requirements;
}

function userPrefs(optionsArray){
  let userPrefs = "";
  if(optionsArray) {
    for (let val of optionsArray) {
      if(val.datatype!=='enum') userPrefs+=`    <UserPref name="${val.name}" display_name="${val.display_name}" datatype="${val.datatype}" default_value="${val.default_value}" required="${(!!val.required)}"/>\n`
      else{
        userPrefs+=`    <UserPref name="${val.name}" display_name="${val.display_name}" datatype="${val.datatype}" default_value="${val.default_value}" required="${(!!val.required)}">`
        for(let option of val.options){
          userPrefs+=`\n      <EnumValue value="${option.value}" display_value="${option.display_value}" />`
        }
        userPrefs+="\n    </UserPref>\n"
      }
    }
  }
  return userPrefs;
}
