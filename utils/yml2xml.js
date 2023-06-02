const yaml = require('js-yaml');
var HTMLParser = require('node-html-parser');
const fs = require('fs');
const { create } = require('xmlbuilder2');
const pjson = require('../package.json');


try {
  const doc = yaml.load(fs.readFileSync(process.argv[2], 'utf8'));
  const html = fs.readFileSync(process.argv[3] + `/${pjson.name}/index.html`);

  fs.writeFileSync(`${process.argv[3]}/${pjson.name}/${pjson.name}.xml`, processYML(doc, html));
} catch (e) {
  console.log(e);
}


function processYML(json, html) {

  const root = create({ version: '1.0', encoding: 'UTF-8' });

  const module = root.ele('Module');
  const modulePrefs = module.ele('ModulePrefs', {
    title: json.title,
    title_url: json.title_url,
    version: pjson.version,
    description: json.description,
    author: json.author,
    background: json.background
  });

  if (json.locales) {
    for (let val of json.locales) {
      const locale = modulePrefs.ele('Locale');
      if (val.lang) {
        locale.att('lang', val.lang);
      }
      locale.att('messages', val.messages);
    }
  }

  if (json.requirements) {
    for (let val of json.requirements) {
      modulePrefs.ele('Require', { feature: val });
    }
  }

  if (json.prefs) {
    for (let val of json.prefs) {
      const userPref = modulePrefs.ele('UserPref', {
        name: val.name,
        display_name: val.display_name,
        datatype: val.datatype,
        default_value: val.default_value,
        required: !!val.required
      });
      if (val.datatype === 'enum') {
        for (let option of val.options) {
          userPref.ele('EnumValue', {
            value: option.value,
            display_value: option.display_value
          });
        }
      }
    }
  }

  modulePrefs.ele('UserPref', {
    name: 'rdW',
    display_name: 'Width',
    datatype: 'hidden',
    default_value: 280,
    required: true
  });
  modulePrefs.ele('UserPref', {
    name: 'rdH',
    display_name: 'Height',
    datatype: 'hidden',
    default_value: 190,
    required: true
  });
  modulePrefs.ele('UserPref', {
    name: 'rdKey',
    datatype: 'hidden'
  });
  modulePrefs.ele('UserPref', {
    name: 'ForeColor',
    datatype: 'hidden'
  });
  modulePrefs.ele('UserPref', {
    name: 'BackColor',
    datatype: 'hidden'
  });

  var htmlRoot = HTMLParser.parse(html);
  module.ele('Content', { type: 'html' }).ele({
    '$':
      htmlRoot.querySelector('style').toString() +
      htmlRoot.querySelector('script').toString() +
      htmlRoot.querySelector('body').toString()
  });

  return root.end({ prettyPrint: true });
}
