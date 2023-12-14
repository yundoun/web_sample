// // 로컬 스토리지에서 메시지 로드하는 함수
// function loadMessages() {
//   // 'apiMessages'라는 키로 저장된 메시지를 로컬 스토리지에서 불러옴
//   const storedMessages = localStorage.getItem('apiMessages');
//   // 저장된 메시지가 있으면 JSON 형태로 파싱, 없으면 빈 배열 반환
//   return storedMessages ? JSON.parse(storedMessages) : [];
// }

// // 로컬 스토리지에 메시지 저장하는 함수
// function saveMessage(newMessage) {
//   // 기존에 저장된 메시지 불러옴
//   const messages = loadMessages();
//   // 새 메시지를 메시지 배열에 추가
//   messages.push(newMessage);
//   // 수정된 메시지 배열을 'apiMessages'라는 키로 로컬 스토리지에 저장
//   localStorage.setItem('apiMessages', JSON.stringify(messages));
// }

// // 페이지 로딩 시 저장된 메시지 표시
// document.addEventListener('DOMContentLoaded', () => {
//   // 저장된 메시지 불러옴
//   const messages = loadMessages();
//   // 결과를 표시할 HTML 요소 찾기
//   const resultElement = document.getElementById("message");

//   // 각 메시지에 대해 HTML 요소에 추가
//   messages.forEach(message => {
//     resultElement.innerHTML += `서버로부터 받은 메시지: ${message} <br>`;
//   });
// });

// POST API 요청 처리
document.getElementById("post").addEventListener("click", function (event) {
  event.preventDefault(); // 폼의 기본 동작인 페이지 리로딩 방지

  // 입력 필드에서 이름과 점수 가져오기
  const name = document.getElementById("name").value;
  const score = parseInt(document.getElementById("score").value);

  // 요청 본문 생성
  const requestBody = JSON.stringify({ name, score });

  // 서버로 POST 요청 보내기
  fetch("http://113.198.233.57:3000/api/test/record", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: requestBody
  })
    .then(response => response.json())
    .then(data => {
      // 서버 응답을 문자열로 변환
      const message = `POST 응답: ${JSON.stringify(data)}`;
      // // 로컬 스토리지에 메시지 저장
      // saveMessage(message);

      // 결과를 화면에 표시
      const resultElement = document.getElementById("message");
      let currentContent = resultElement.innerHTML;
      let newContent = `내가 보낸 메시지: ${name} \t ${score} <br> 서버로부터 받은 메시지: ${message} <br>`;
      resultElement.innerHTML = currentContent + newContent;
    })
    .catch(error => console.error(error)); // 오류 처리

  // 입력 필드 초기화
  document.getElementById("name").value = "";
  document.getElementById("score").value = "";
});

// GET API 요청 처리
document.getElementById("get").addEventListener("click", function () {
  // 입력 필드에서 이름과 점수 가져오기
  const name = document.getElementById("name").value;
  const score = parseInt(document.getElementById("score").value);

  // 서버로 GET 요청 보내기
  fetch("http://113.198.233.57:3000/api/test/record?type=score", {
    method: "GET"
  })
    .then(response => response.json())
    .then(data => {
      // 서버 응답을 문자열로 변환
      const message = `GET 응답: ${JSON.stringify(data)}`;
      // // 로컬 스토리지에 메시지 저장
      // saveMessage(message);

      // 결과를 화면에 표시
      const resultElement = document.getElementById("message");
      let currentContent = resultElement.innerHTML;
      resultElement.innerHTML = currentContent + `서버로부터 받은 메시지: ${message} <br>`;

      // // 5초 후에 alert 창으로 메시지 표시
      // setTimeout(() => {
      //   alert(message);
      // }, 5000); // 5000 밀리초(5초) 후 함수 실행

    })
    .catch(error => console.error(error)); // 오류 처리

  // 입력 필드 초기화
  document.getElementById("name").value = "";
  document.getElementById("score").value = "";
});
