const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml');

const mapHubsPackage = require('../maphubs/package.json');
const version = mapHubsPackage.version;

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory())
}

var dirs = getDirectories('templates/maphubs');
console.log(dirs);
let largest = 0;
dirs.forEach(dir => {
  let dirInt = parseInt(dir);
  if(dirInt && dirInt > largest){
    largest = dirInt;
  }
});
let next = largest + 1;
fs.copy('templates/maphubs/' + largest, 'templates/maphubs/' + next, function (err) {
  if (err) return console.error(err)
  console.log('copied template folder');
  try {
  var config = yaml.safeLoad(fs.readFileSync('templates/maphubs/config.yml', 'utf8'));
  config.version = version;
  fs.writeFileSync('templates/maphubs/config.yml', yaml.safeDump(config));
  //console.log(doc);
  const rancherComposePath = 'templates/maphubs/' + next + '/rancher-compose.yml';
  var rancherCompose = yaml.safeLoad(fs.readFileSync(rancherComposePath));
  rancherCompose.catalog.version = version;
  fs.writeFileSync(rancherComposePath, yaml.safeDump(rancherCompose));
  
  const dockerComposePath = 'templates/maphubs/' + next + '/docker-compose.yml';
  var dockerCompose = yaml.safeLoad(fs.readFileSync(dockerComposePath));
  console.log(dockerCompose);
  dockerCompose.web.image = 'quay.io/maphubs/web:v' + version;
  fs.writeFileSync(dockerComposePath, yaml.safeDump(dockerCompose));    
} catch (e) {
  console.log(e);
}
});

