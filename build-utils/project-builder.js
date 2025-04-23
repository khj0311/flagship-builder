/**
 * Project Builder 유틸리티
 * 
 * 이 스크립트는 HTML 템플릿과 컴포넌트 파일들을 조합하여
 * 최종 HTML을 생성하는 역할을 합니다.
 */

import fs from 'fs';
import path from 'path';
import glob from 'glob';

/**
 * 프로젝트 빌드 함수
 * @param {string} projectName - 프로젝트 이름 (예: 'projectA')
 * @param {string} templateType - 템플릿 타입 (예: 'index', 'index-rtl', 'index-pim')
 * @param {string} outputPath - 출력 경로
 */
export async function buildProject(projectName, templateType, outputPath) {
  console.log(`Building ${projectName} (${templateType})...`);
  
  // 1. 템플릿 파일 읽기
  const templatePath = path.resolve(`src/${projectName}/templates/${templateType}.html`);
  let templateContent = fs.readFileSync(templatePath, 'utf-8');
  
  // 2. 컴포넌트 스타일 수집
  const componentStyles = await collectComponentStyles(projectName);
  
  // 3. 컴포넌트 HTML 수집
  const componentHTMLs = await collectComponentHTMLs(projectName);
  
  // 4. 컴포넌트 스크립트 수집
  const componentScripts = await collectComponentScripts(projectName);
  
  // 5. 템플릿에 컴포넌트 내용 주입
  templateContent = templateContent.replace(
    /<style id="style-container">[\s\S]*?<\/style>/,
    `<style id="style-container">\n${componentStyles.join('\n')}\n</style>`
  );
  
  templateContent = templateContent.replace(
    /<div id="contents">[\s\S]*?<\/div>/,
    `<div id="contents">\n${componentHTMLs.join('\n')}\n</div>`
  );
  
  templateContent = templateContent.replace(
    /<script id="script-container">[\s\S]*?<\/script>/,
    `<script id="script-container">\n${componentScripts.join('\n')}\n</script>`
  );
  
  // 6. 최종 HTML 파일 저장
  const outputFilePath = path.resolve(outputPath, `${templateType}.html`);
  
  // 출력 디렉토리가 없으면 생성
  if (!fs.existsSync(path.dirname(outputFilePath))) {
    fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
  }
  
  fs.writeFileSync(outputFilePath, templateContent);
  
  console.log(`Successfully built ${projectName} (${templateType}) at ${outputFilePath}`);
}

/**
 * 컴포넌트 스타일 수집
 * @param {string} projectName - 프로젝트 이름
 * @returns {Promise<string[]>} 스타일 컨텐츠 배열
 */
async function collectComponentStyles(projectName) {
  const stylesPattern = `src/${projectName}/components/**/*.scss`;
  const styleFiles = await glob(stylesPattern);
  
  return styleFiles.map(file => {
    const style = fs.readFileSync(file, 'utf-8');
    return `/* ${path.basename(file)} */\n${style}`;
  });
}

/**
 * 컴포넌트 HTML 수집
 * @param {string} projectName - 프로젝트 이름
 * @returns {Promise<string[]>} HTML 컨텐츠 배열
 */
async function collectComponentHTMLs(projectName) {
  const htmlPattern = `src/${projectName}/components/**/*.html`;
  const htmlFiles = await glob(htmlPattern);
  
  return htmlFiles.map(file => {
    const html = fs.readFileSync(file, 'utf-8');
    return `<!-- ${path.basename(file)} -->\n${html}`;
  });
}

/**
 * 컴포넌트 스크립트 수집
 * @param {string} projectName - 프로젝트 이름
 * @returns {Promise<string[]>} 스크립트 컨텐츠 배열
 */
async function collectComponentScripts(projectName) {
  const scriptsPattern = `src/${projectName}/components/**/*.js`;
  const scriptFiles = await glob(scriptsPattern);
  
  return scriptFiles.map(file => {
    const script = fs.readFileSync(file, 'utf-8');
    return `// ${path.basename(file)}\n${script}`;
  });
}

/**
 * 프로젝트 빌드 실행 - CLI에서 사용 가능
 * 사용법: node project-builder.js projectA index ./dist/projectA
 */
if (process.argv.length > 2) {
  const projectName = process.argv[2];
  const templateType = process.argv[3] || 'index';
  const outputPath = process.argv[4] || `./dist/${projectName}`;
  
  buildProject(projectName, templateType, outputPath)
    .then(() => console.log('Build completed!'))
    .catch(err => console.error('Build failed:', err));
}