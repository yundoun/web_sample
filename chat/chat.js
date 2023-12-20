// 소켓 서버에 연결합니다.
const socket = io('http://113.198.233.57:3001/c0e31');



// 'joinUser' 이벤트를 수신하여 참가자 정보 업데이트합니다.
// 상대방이 들어왔을때 들어온 정보 출력
socket.on('joinUser', (data) => {
  const messagesElement = document.getElementById('messages');
  const messageElement = document.createElement('div');

  messageElement.textContent = `${data.stdName} 님이 참가하였습니다.`;
  messagesElement.appendChild(messageElement);
});


// 'getMessage' 이벤트를 수신하여 채팅 메시지를 화면에 표시
// 채팅 출력
socket.on('getMessage', (data) => {
  const messagesElement = document.getElementById('messages');
  const messageElement = document.createElement('div');
  const timestamp = new Date(data.timeStamp).toLocaleTimeString();

  messageElement.textContent = `[${timestamp}] ${data.stdName}: ${data.message}`;
  messagesElement.appendChild(messageElement);

});

// 내 정보 입력후 등록 버튼 클릭시
// 내가 입력한 정보 서버에 전송
const sendAddButton = document.getElementById('addButton');
sendAddButton.addEventListener('click', () => {

  const userNameInput = document.getElementById('name'); // 사용자 이름 설정
  const userNumberInput = document.getElementById('number'); // 사용자 학번 설정
  const userChatInput = document.getElementById('chat'); // 사용자 학번 설정
  const stdName = userNameInput.value;
  const stdNumber = userNumberInput.value;
  const message = userChatInput.value;

  if (stdName && stdNumber && message) {
    socket.emit('enter', { stdName, stdNumber }); // 서버로 메시지 전송
    socket.emit('sendMessage', { message }); // 서버로 메시지 전송
  } else {
    alert('이름과 학번을 모두 입력하세요.'); // 메시지 미입력시 경고
  }

});
/////========================================


// GET 버튼 클릭 시
document.getElementById("getButton").addEventListener("click", function () {
  // 서버로 GET 요청 보내기
  fetch("http://113.198.233.57:3001/api/c0e31/chat?index=4", {
    method: "GET",
  })
    .then(response => response.json())
    .then(data => {
      // 서버 응답을 문자열로 변환
      const message = `GET 응답: ${JSON.stringify(data)}`;

      // 2초 후에 alert 창으로 메시지 표시
      setTimeout(() => {
        alert(message);
      }, 2000); // 5000 밀리초(5초) 후 함수 실행

    })


  // 입력 필드 초기화
  document.getElementById("getButton").value = "";
});



// // 메시지 전송 버튼을 클릭하면 메시지를 서버로 전송하는 이벤트 핸들러입니다.
// const sendMessageButton = document.getElementById('sendMessageButton');
// sendMessageButton.addEventListener('click', () => {
//   const userName = "tester";
//   const messageInput = document.getElementById('messageInput');
//   const message = messageInput.value;

//   // 메시지 입력 확인
//   if (message) {
//     socket.emit('sendMessage', { userName, message }); // 서버로 메시지 전송
//     messageInput.value = ''; // 입력 필드 초기화
//   } else {
//     alert('이름과 메시지를 모두 입력하세요.'); // 메시지 미입력시 경고
//   }
// });


// // 5초 후에 alert 창으로 메시지 표시
// setTimeout(() => {
//   alert(message);
// }, 5000); // 5000 밀리초(5초) 후 함수 실행 