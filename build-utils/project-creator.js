import fs from 'fs';
import { resolve } from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('../', import.meta.url));
const sourcePath = resolve(__dirname, 'src');
const templateDir = '_template';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createProject = (basePath, projectName) => {
  if (projectName) {
    fs.readdirSync(basePath, { withFileTypes: true }).map((file) => {
      const filePath = `${basePath}/${file.name}`;
      const copyPath = filePath.replace(templateDir, projectName);

      if (file.isDirectory()) {
        fs.mkdirSync(copyPath);
        createProject(filePath, projectName);
      } else {
        fs.copyFileSync(filePath, copyPath);
      }
    });
  }
};

const cleanProject = () => {
  const projects = [];
  const cleanData = [];

  fs.readdirSync(sourcePath, { withFileTypes: true }).map((file) => {
    if (file.name && file.isDirectory()) {
      projects.push(file.name);
    }
  });

  const packageJson = fs.readFileSync(resolve(__dirname, 'package.json'), 'utf8');
  const packageJsonObj = JSON.parse(packageJson);
  const { var: packageVar, scripts: packageScripts } = packageJsonObj;

  for (const key in packageVar) {
    const flag = projects.findIndex((name) => name === key) !== -1;
    if (!flag) {
      cleanData.push(`  var - ${key}`);
      delete packageVar[key];
    }
  }

  for (const key in packageScripts) {
    if (packageScripts[key].includes(`$npm_package_var_`)) {
      const flag = projects.findIndex((name) => packageScripts[key].includes(`$npm_package_var_${name}`)) !== -1;
      if (!flag) {
        cleanData.push(`  scripts - ${key}`);
        delete packageScripts[key];
      }
    }
  }

  fs.writeFileSync(resolve(__dirname, 'package.json'), JSON.stringify(packageJsonObj, null, 2));
  if (cleanData.length) {
    console.warn(`Remove monorepo-related options that do not exist in package.json \n${cleanData.join(`\n`)}\n`);
  }
};

if (process.argv[2] && process.argv[2] === '-clean') {
  cleanProject();
  process.exit(0);
}

rl.question('Enter project name:', (answer) => {
  const projectName = answer.trim();

  if (projectName) {
    let isUsingName = false;
    fs.readdirSync(sourcePath, { withFileTypes: true }).map((file) => {
      if (file.name === projectName && file.isDirectory()) {
        isUsingName = true;
      }
    });

    if (!isUsingName) {
      fs.mkdirSync(resolve(sourcePath, projectName));
      createProject(resolve(sourcePath, templateDir), projectName);

      // package.json 자동 생성
      const packageJson = fs.readFileSync(resolve(__dirname, 'package.json'), 'utf8');
      const packageJsonObj = JSON.parse(packageJson);
      const { var: packageVar, scripts: packageScripts } = packageJsonObj;

      packageVar[projectName] = `yarn workspace ${projectName}`;
      packageScripts[`dev:${projectName}`] = `$npm_package_var_${projectName} dev`;
      packageScripts[`build:${projectName}`] = `$npm_package_var_${projectName} build`;
      packageScripts[`preview:${projectName}`] = `$npm_package_var_${projectName} preview:all`;
      fs.writeFileSync(resolve(__dirname, 'package.json'), JSON.stringify(packageJsonObj, null, 2));
      cleanProject();
      console.log(`Project creation complete : ${projectName}\n`);
    } else {
      console.error('Error: Project name already exists.');
    }
  } else {
    console.error('Error: Project name is required. Please enter a valid name.');
  }

  rl.close();
});
