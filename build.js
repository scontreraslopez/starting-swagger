const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Clean dist directory
console.log('Cleaning dist directory...');
execSync('npx rimraf dist', { stdio: 'inherit' });

// Create dist directory
fs.mkdirSync('dist', { recursive: true });

// Copy and modify index.html
console.log('Copying and modifying index.html...');
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/\.\/node_modules\/swagger-ui-dist\//g, './swagger-ui-dist/');
fs.writeFileSync('dist/index.html', indexHtml);

// Copy openapi.yaml
console.log('Copying openapi.yaml...');
fs.copyFileSync('openapi.yaml', 'dist/openapi.yaml');

// Copy swagger-ui-dist
console.log('Copying swagger-ui-dist...');
execSync('npx cpr node_modules/swagger-ui-dist dist/swagger-ui-dist', { stdio: 'inherit' });

console.log('Build completed successfully!');
