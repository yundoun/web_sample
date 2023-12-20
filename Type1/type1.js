// 소켓 서버에 연결합니다.
const socket = io('http://113.198.234.56:3001/bfa4');

socket.on('changeScore', (data) => {
  console.log(data);
  const chatBox = document.getElementById("chatBox");
  const content = document.createElement("p");
  content.textContent = `${data.userName}님이 ${data.type} 점수를 ${data.score}점으로 변경하였습니다.`;
  chatBox.appendChild(content);
  console.log("a");
});

socket.on('proverb', (data) => {
  localStorage.setItem('proverb', data.proverb);
});

const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');

// postKor
document.getElementById("postKor").addEventListener("click", function () {
  const userName = nameInput.value;
  const score = Number(scoreInput.value);

  const requestBody = JSON.stringify({ userName, score, type: "kor" });

  if (userName && score) {
    fetch("http://113.198.234.56:3001/api/bfa4/record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: requestBody
    })
      .then(response => response.json())
      .then(data => {
        // 서버 응답을 문자열로 변환
        const message = `${JSON.stringify(data)}`;
        // 결과를 화면에 표시
        const resultElement = document.getElementById("chatBox");
        let currentContent = resultElement.innerHTML;
        let newContent = message
        resultElement.innerHTML = currentContent + newContent;
      })
  } else {
    alert('정보를 모두 입력해주세요');
  }
});

// postEng
document.getElementById("postEng").addEventListener("click", function () {
  const userName = nameInput.value;
  const score = Number(scoreInput.value);

  const requestBody = JSON.stringify({ userName, score, type: "eng" });

  if (userName && score) {
    fetch("http://113.198.234.56:3001/api/bfa4/record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: requestBody
    })
      .then(response => response.json())
      .then(data => {
        // 서버 응답을 문자열로 변환
        const message = `${JSON.stringify(data)}`;
        // 결과를 화면에 표시
        const resultElement = document.getElementById("chatBox");
        let currentContent = resultElement.innerHTML;
        let newContent = message
        resultElement.innerHTML = currentContent + newContent + "<br>";
      })
  } else {
    alert('정보를 모두 입력해주세요');
  }
});


// getKor
document.getElementById("getKor").addEventListener("click", function () {
  // 서버로 GET 요청 보내기
  fetch("http://113.198.234.56:3001/api/bfa4/record?type=kor", {
  })
    .then(response => response.json())
    .then(data => {
      // 서버 응답을 문자열로 변환
      const message = `GET 응답: ${JSON.stringify(data)} <br>`;

      // 결과를 화면에 표시
      const resultElement = document.getElementById("chatBox");
      let currentContent = resultElement.innerHTML;
      let newContent = message
      resultElement.innerHTML = currentContent + newContent;

    })
});

// getEng
document.getElementById("getEng").addEventListener("click", function () {
  // 서버로 GET 요청 보내기
  fetch("http://113.198.234.56:3001/api/bfa4/record?type=eng", {
  })
    .then(response => response.json())
    .then(data => {
      // 서버 응답을 문자열로 변환
      const message = `GET 응답: ${JSON.stringify(data)}<br>`;

      // 결과를 화면에 표시
      const resultElement = document.getElementById("chatBox");
      let currentContent = resultElement.innerHTML;
      let newContent = message
      resultElement.innerHTML = currentContent + newContent;
    })
});