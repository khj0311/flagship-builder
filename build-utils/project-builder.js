/**
 * Project Builder 유틸리티
 * 
 * 이 스크립트는 HTML 템플릿과 컴포넌트 파일들을 조합하여
 * 최종 HTML을 생성하는 역할을 합니다.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname 설정 (ES module에서는 __dirname이 기본적으로 없음)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

/**
 * 디렉토리 내의 모든 파일 목록을 재귀적으로 가져오는 함수
 * @param {string} dir 검색할 디렉토리 경로
 * @param {RegExp} filter 파일 필터링을 위한 정규식
 * @returns {string[]} 파일 경로 배열
 */
function getAllFiles(dir, filter) {
  let results = [];
  
  try {
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat && stat.isDirectory()) {
        // 재귀적으로 하위 디렉토리 검색
        results = results.concat(getAllFiles(filePath, filter));
      } else {
        // 필터에 맞는 파일만 추가
        if (!filter || filter.test(filePath)) {
          results.push(filePath);
        }
      }
    });
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
  
  return results;
}

/**
 * 프로젝트 빌드 함수
 * @param {string} projectName - 프로젝트 이름 (예: 'projectA')
 * @param {string} templateType - 템플릿 타입 (예: 'index', 'index-rtl', 'index-pim')
 * @param {string} outputPath - 출력 경로
 */
export async function buildProject(projectName, templateType, outputPath) {
  console.log(`Building ${projectName} (${templateType})...`);
  
  // 프로젝트 경로 설정
  const projectSrcDir = path.join(rootDir, 'src', projectName);
  const projectComponentsDir = path.join(projectSrcDir, 'components');
  
  // 1. 템플릿 파일 읽기
  const templatePath = path.join(projectSrcDir, 'templates', `${templateType}.html`);
  let templateContent = fs.readFileSync(templatePath, 'utf-8');
  
  // 2. 컴포넌트 스타일 수집
  const componentStyles = collectComponentStyles(projectComponentsDir);
  
  // 3. 컴포넌트 HTML 수집
  const componentHTMLs = collectComponentHTMLs(projectComponentsDir);
  
  // 4. 컴포넌트 스크립트 수집
  const componentScripts = collectComponentScripts(projectComponentsDir);
  
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
 * 이미지와 비디오 파일을 복사하는 함수
 * @param {string} projectName - 프로젝트 이름
 * @param {string} outputPath - 출력 경로
 */
export function copyMediaFiles(projectName, outputPath) {
  console.log(`Copying media files for ${projectName}...`);
  
  const projectSrcDir = path.join(rootDir, 'src', projectName);
  const imagesDir = path.join(projectSrcDir, 'images');
  const videosDir = path.join(projectSrcDir, 'videos');
  
  // 이미지 폴더가 존재하면 파일 복사
  if (fs.existsSync(imagesDir)) {
    const imageFiles = getAllFiles(imagesDir, /\.(jpg|jpeg|png|gif|svg|webp)$/i);
    const outputImagesDir = path.join(outputPath, 'images');
    
    // 출력 디렉토리 생성
    if (!fs.existsSync(outputImagesDir)) {
      fs.mkdirSync(outputImagesDir, { recursive: true });
    }
    
    imageFiles.forEach(file => {
      const relativePath = path.relative(imagesDir, file);
      const targetPath = path.join(outputImagesDir, relativePath);
      
      // 대상 디렉토리 생성
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      // 파일 복사
      fs.copyFileSync(file, targetPath);
    });
  }
  
  // 비디오 폴더가 존재하면 파일 복사
  if (fs.existsSync(videosDir)) {
    const videoFiles = getAllFiles(videosDir, /\.(mp4|webm|ogg|mov)$/i);
    const outputImagesDir = path.join(outputPath, 'images'); // 비디오도 images 폴더에 복사
    
    // 출력 디렉토리 생성
    if (!fs.existsSync(outputImagesDir)) {
      fs.mkdirSync(outputImagesDir, { recursive: true });
    }
    
    videoFiles.forEach(file => {
      const relativePath = path.relative(videosDir, file);
      const targetPath = path.join(outputImagesDir, relativePath);
      
      // 대상 디렉토리 생성
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      // 파일 복사
      fs.copyFileSync(file, targetPath);
    });
  }
  
  console.log(`Media files for ${projectName} copied successfully!`);
}

/**
 * 컴포넌트 스타일 수집
 * @param {string} componentsDir - 컴포넌트 디렉토리
 * @returns {string[]} 스타일 컨텐츠 배열
 */
function collectComponentStyles(componentsDir) {
  const styleFiles = getAllFiles(componentsDir, /\.scss$/);
  
  return styleFiles.map(file => {
    const style = fs.readFileSync(file, 'utf-8');
    return `/* ${path.basename(file)} */\n${style}`;
  });
}

/**
 * 컴포넌트 HTML 수집
 * @param {string} componentsDir - 컴포넌트 디렉토리
 * @returns {string[]} HTML 컨텐츠 배열
 */
function collectComponentHTMLs(componentsDir) {
  const htmlFiles = getAllFiles(componentsDir, /\.html$/);
  
  return htmlFiles.map(file => {
    const html = fs.readFileSync(file, 'utf-8');
    return `<!-- ${path.basename(file)} -->\n${html}`;
  });
}

/**
 * 컴포넌트 스크립트 수집
 * @param {string} componentsDir - 컴포넌트 디렉토리
 * @returns {string[]} 스크립트 컨텐츠 배열
 */
function collectComponentScripts(componentsDir) {
  const scriptFiles = getAllFiles(componentsDir, /\.js$/);
  
  return scriptFiles.map(file => {
    const script = fs.readFileSync(file, 'utf-8');
    return `// ${path.basename(file)}\n${script}`;
  });
}

/**
 * 프로젝트 빌드 실행 함수
 * @param {string} projectName - 프로젝트 이름
 * @param {string} outputPath - 출력 경로
 */
export async function buildProjectAll(projectName, outputPath = null) {
  // 기본 출력 경로 설정
  const defaultOutputPath = path.join(rootDir, 'dist', projectName);
  const finalOutputPath = outputPath || defaultOutputPath;
  
  // index.html 빌드
  await buildProject(projectName, 'index', finalOutputPath);
  
  // index-rtl.html 빌드
  try {
    await buildProject(projectName, 'index-rtl', finalOutputPath);
  } catch (err) {
    console.warn(`Warning: Could not build index-rtl.html for ${projectName}: ${err.message}`);
  }
  
  // index-pim.html 생성 (index.html에서 필요한 부분 추출)
  try {
    const indexContent = fs.readFileSync(path.join(finalOutputPath, 'index.html'), 'utf-8');
    
    const styleRegex = /<style id="style-container">([\s\S]*?)<\/style>/;
    const contentRegex = /<div id="contents">([\s\S]*?)<\/div>/;
    const scriptRegex = /<script id="script-container">([\s\S]*?)<\/script>/;
    
    const styleMatch = indexContent.match(styleRegex);
    const contentMatch = indexContent.match(contentRegex);
    const scriptMatch = indexContent.match(scriptRegex);
    
    const pimHTML = `
${styleMatch ? styleMatch[0] : ''}
${contentMatch ? contentMatch[0] : ''}
${scriptMatch ? scriptMatch[0] : ''}
`;
    
    fs.writeFileSync(path.join(finalOutputPath, 'index-pim.html'), pimHTML.trim());
    console.log(`Generated index-pim.html for ${projectName}`);
  } catch (err) {
    console.error(`Error generating index-pim.html for ${projectName}:`, err);
  }
  
  // 미디어 파일 복사
  copyMediaFiles(projectName, finalOutputPath);
}

/**
 * 프로젝트 빌드 실행 - CLI에서 사용 가능
 * 사용법: node project-builder.js projectA
 */
if (process.argv.length > 2) {
  const projectName = process.argv[2];
  
  buildProjectAll(projectName)
    .then(() => console.log('Build completed!'))
    .catch(err => console.error('Build failed:', err));
}