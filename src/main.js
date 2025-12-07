import './style.css'

const TOTAL = 30;
const scores = Array(TOTAL).fill("");
const comments = Array(TOTAL).fill("");

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLScfphKgtJh5pTSTtHXH_pitD5ldbNi0dYl-m8rjS7XZ_nHfTw/formResponse";

const ENTRY_MYID = "entry.366340186";
const ENTRY_SCORE = "entry.881681143";
const ENTRY_COMMENT = "entry.1359523338";

// 점수 버튼 생성
function makeButtons() {
  document.querySelectorAll(".score-buttons").forEach(box => {
    for (let s = 1; s <= 5; s++) {
      const btn = document.createElement("button");
      btn.className = "score-btn";
      btn.textContent = s;
      btn.dataset.score = s;

      btn.addEventListener("click", (e) => {
        const p = e.target.parentElement;
        p.querySelectorAll(".score-btn").forEach(b => b.classList.remove("selected"));
        e.target.classList.add("selected");
      });

      box.appendChild(btn);
    }
  });
}

makeButtons();

document.getElementById("saveBtn").addEventListener("click", () => {
  const myId = document.getElementById("myId").value.trim();
  if (myId.length !== 5) {
    alert("학번은 5자리 숫자로 입력하세요. (예: 30401)");
    return;
  }

  const target = parseInt(document.getElementById("targetNum").value);
  if (!target || target < 1 || target > TOTAL) {
    alert("평가할 친구 번호는 1~30 사이여야 합니다.");
    return;
  }

  const pitch = getSelected("pitch");
  const rhythm = getSelected("rhythm");
  const pron = getSelected("pron");
  const express = getSelected("express");

  if (!pitch || !rhythm || !pron || !express) {
    alert("4개 점수를 모두 선택하세요.");
    return;
  }

  const comment = document.getElementById("comment").value.trim();

  const resultStr = `(${pitch},${rhythm},${pron},${express})`;
  scores[target - 1] = resultStr;
  comments[target - 1] = comment;

  updateResult(myId);

  // 다음 입력 편하게 하도록 한줄평만 초기화
  document.getElementById("comment").value = "";
});

function getSelected(type) {
  const box = document.querySelector(`.score-buttons[data-type="${type}"]`);
  const selected = box.querySelector(".score-btn.selected");
  return selected ? selected.dataset.score : null;
}

function updateResult(myId) {
  const scoreArea = document.getElementById("scoreResult");
  const commentArea = document.getElementById("commentResult");

  let selfNum = parseInt(myId.slice(-2)); // 마지막 두 자리 → 번호
  if (isNaN(selfNum)) selfNum = null;

  let scoreOutput = `평가자:${myId}\n`;
  let commentOutput = `평가자:${myId}\n`;

  for (let i = 1; i <= TOTAL; i++) {
    const index = i - 1;
    const label = (selfNum === i) ? `${i}(본인)` : `${i}`;

    scoreOutput += `${label}: ${scores[index] ? scores[index] : ""}  `;
    commentOutput += `${label}: ${comments[index] ? comments[index] : ""}  `;
  }

  scoreArea.value = scoreOutput;
  commentArea.value = commentOutput;
}

// 구글 설문으로 전송하기
document.getElementById("submitGoogleBtn").addEventListener("click", () => {
  const myId = document.getElementById("myId").value.trim();
  if (myId.length !== 5) {
    alert("학번은 5자리 숫자로 입력하세요. (예: 30401)");
    return;
  }

  // 최신 결과 문자열 갱신
  updateResult(myId);

  const scoreText = document.getElementById("scoreResult").value.trim();
  const commentText = document.getElementById("commentResult").value.trim();

  if (!scoreText) {
    alert("아직 입력된 점수가 없습니다. 먼저 [입력하기]를 눌러 점수를 저장하세요.");
    return;
  }

  // 동적으로 폼 생성해서 제출 (CORS 문제 피하기 위한 전통적인 방식)
  const form = document.createElement("form");
  form.method = "POST";
  form.action = GOOGLE_FORM_ACTION;
  form.target = "hidden_iframe";

  const makeInput = (name, value) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    return input;
  };

  form.appendChild(makeInput(ENTRY_MYID, myId));
  form.appendChild(makeInput(ENTRY_SCORE, scoreText));
  form.appendChild(makeInput(ENTRY_COMMENT, commentText));

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);

  alert("구글 설문으로 제출되었습니다. (설문 응답 내역을 꼭 확인하세요!)");
});
