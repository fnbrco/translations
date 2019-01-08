var fs = require('fs');
var path = require('path');

var args = process.argv.slice(2);
if(!args || args.length <= 0) {
    return console.error('No arguments given, requires at least one [language name]');
}

var code = args[0].toLowerCase();
var parsedEnglish, parsedLanguage;

if(code == 'en') {
    return console.error('Language cannot be en');
}

try {
    parsedEnglish = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'en.json'), 'utf8'));
    parsedLanguage = JSON.parse(fs.readFileSync(path.join(process.cwd(), code + '.json'), 'utf8'));
} catch(e) {
    console.error('Error while parsing JSON files, does ' + code + '.json exist?\n');
    console.error(e);
    return;
}

if(!parsedEnglish) {
    return console.error('en.json appears to be empty');
}
if(!parsedLanguage) {
    return console.error(code + '.json appears to be empty');
}

console.log('Testing ' + code + '.json\n');

Promise.all([
    new Promise((resolve, reject) => {
        return parsedLanguage.hasOwnProperty('name') && parsedLanguage.name.length > 1 ? resolve('Name found') : reject('Missing name');
    }),
    new Promise((resolve, reject) => {
        return parsedLanguage.hasOwnProperty('translations') && typeof parsedLanguage.translations == 'object' ? resolve('Found translations object') : reject('Missing translations object');
    }),
    new Promise((resolve, reject) => {
        if(Object.keys(parsedLanguage.translations).length < Object.keys(parsedEnglish).length) {
            return resolve('Translations is not the same length, not all sections may be present in ' + code + '.json');
        }

        var directFind = function(inObject, path) {
            return path ? path.split('.').reduce(function(obj, i) {
                return typeof obj == 'undefined' ? undefined : typeof obj[i] == 'boolean' ? obj[i] : (obj[i] || undefined);
            }, inObject) : undefined;
        };

        var mismatch = [];
        var compareObjects = function(obj, path) {
            return new Promise((res, rej) => {
                Object.keys(obj).forEach((key) => {
                    var type = typeof obj[key];

                    if(type == 'undefined') {
                        return rej({path: path + '.' + key, reason: 'source undefined'});
                    } else {
                        var directType = typeof directFind(parsedLanguage, path + '.' + key);
                        if(directType != type) {
                            if(directType == 'undefined' && (path + '.' + key).split('.').length <= 2) {
                                mismatch.push((path + '.' + key));
                                return res();
                            }

                            return rej({path: path + '.' + key, reason: 'type mismatch (' + directType + ' vs ' + type + ')'});
                        } else if(type == 'object') {
                            return compareObjects(obj[key], path + '.' + key).then(() => res()).catch((e) => rej(e));
                        } else {
                            return typeof directFind(parsedLanguage, path + '.' + key) == 'undefined' ? rej({path: path + '.' + key, reason: 'language undefined'}) : res();
                        }
                    }
                });
            });
        };

        compareObjects(parsedEnglish.translations, 'translations').then(() => {
            return resolve('Translations object keys ' + (mismatch.length > 0 ? 'mostly match, failed keys (highest level):\n   * ' + mismatch.join('\n   * ') : 'match'));
        }).catch((err) => reject(err));
    })
]).then(function(results) {
    console.log('Test result for ' + code + '.json:\n');
    console.log((results.length > 0 ? ' - ' + results.join('\n - ') + '\n\n Pass' : ' Pass, no messages.'));
    process.exit(0);
}).catch(function(err) {
    console.error('Test failed for ' + code + '.json\n');
    console.error(err);
    process.exit(-1);
});

