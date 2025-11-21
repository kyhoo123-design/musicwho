import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'


// 예시: 자기소개와 경력 데이터
const introText = '안녕하세요! 저는 창의적인 개발자입니다. 음악과 코딩을 사랑하며, 다양한 프로젝트에 도전하는 것을 즐깁니다.';
const careers = [
  '2023 - 음악 추천 서비스 개발',
  '2022 - 웹 기반 게임 제작',
  '2021 - 오픈소스 커뮤니티 활동',
];

// DOM에 데이터 반영
document.getElementById('intro-text').textContent = introText;

const careerList = document.getElementById('career-list');
careerList.innerHTML = '';
careers.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  careerList.appendChild(li);
});
