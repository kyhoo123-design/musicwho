import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'


// 김영후의 음악교실 소개와 경력 데이터
const introText = '안녕하세요! 김영후의 음악교실에 오신 것을 환영합니다. 음악을 통해 모두가 즐겁고 창의적으로 성장할 수 있도록 다양한 수업과 활동을 준비했습니다.';
const careers = [
  '2025 - 음악교실 유튜브 채널 운영',
  '2024 - 지역 아동 음악 캠프 주최',
  '2023 - 온라인 음악 이론 강의 개설',
  '2022 - 밴드/합주 지도 및 공연',
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
