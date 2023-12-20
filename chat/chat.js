// 소켓 서버에 연결합니다.
const socket = io('http://113.198.234.56:3001/c0e3');

const $chatBox = document.getElementById("chatBox");
const $chat = document.getElementById("chat");
const $chatBtn = document.getElementById("chatBtn");
const $studentName = document.getElementById("studentName");
const $studentNumber = document.getElementById("studentNumber");
const $num = document.getElementById("num");


socket.on('join', (data) => {

  const content = document.createElement("p");
  content.textContent = `${data.studentName}님이 입장하셨습니다.`;
  $chatBox.appendChild(content);
});

socket.on('message', (data) => {
  const content = document.createElement("p");
  const timestamp = new Date(data.timeStamp).toLocaleTimeString();
  console.log(timestamp);

  content.textContent = `[${timestamp}] ${data.studentName}: ${data.message}`;
  $chatBox.appendChild(content);
});




document.getElementById("regBtn").addEventListener('click', () => {

  const studentName = $studentName.value;
  const studentNumber = $studentNumber.value;

  if (studentName && studentNumber) {
    socket.emit('join', { studentName, studentNumber }); // 서버로 입장 정보 전송
  } else {
    alert('이름과 학번을 모두 입력하세요.'); // 이름 또는 학번 미입력시 경고
  }
})


document.getElementById("chatBtn").addEventListener('click', () => {

  const message = $chat.value;

  if ($chat) {
    socket.emit('message', { message }); // 서버로 입장 정보 전송
  } else {
    alert('채팅을 입력하세요'); // 채팅 미입력시 경고
  }

})

// get
document.getElementById("getNum").addEventListener("click", function () {

  const num = $num.value;

  // 서버로 GET 요청 보내기
  fetch("http://113.198.234.56:3001/api/c0e3/chat?num=" + num, {
  })
    .then(response => response.json())
    .then(data => {
      // 서버 응답을 문자열로 변환
      const message = `GET 응답: ${JSON.stringify(data)}`;
      setTimeout(() => {
        alert(message);
      }, 2000);

    })
});