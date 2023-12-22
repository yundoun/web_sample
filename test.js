// // 로컬 스토리지에서 저장된 채팅 메시지를 불러오는 함수입니다.
// function loadMessages() {
//   const storedMessages = localStorage.getItem('chatMessages');
//   return storedMessages ? JSON.parse(storedMessages) : [];
// }

// // 새로운 채팅 메시지를 로컬 스토리지에 저장하는 함수입니다.
// function saveMessage(newMessage) {
//   const messages = loadMessages();
//   messages.push(newMessage);
//   localStorage.setItem('chatMessages', JSON.stringify(messages));
// }

// // 페이지가 로드될 때, 로컬 스토리지에서 저장된 채팅 메시지를 화면에 표시합니다.
// document.addEventListener('DOMContentLoaded', () => {
//   const messages = loadMessages();
//   const messagesElement = document.getElementById('messages');

//   messages.forEach(message => {
//     const messageElement = document.createElement('div');
//     messageElement.textContent = `[${message.timeStamp}] ${message.userName}: ${message.message}`;
//     messagesElement.appendChild(messageElement);
//   });
// });

// // 메시지를 alert로 표시
// alert(`[${timestamp}] ${data.userName}: ${data.message}`);



// 입장 이벤트 처리
// 'join' 이벤트를 수신하여 유저의 이름을 화면에 표시
socket.on('join', (data) => {
  const userNamesElement = document.getElementById('userNames'); // 유저 이름을 표시할 엘리먼트
  const userNameElement = document.createElement('div');
  userNameElement.textContent = data.studentName;
  userNamesElement.appendChild(userNameElement);
});

// 클라이언트에서 서버로 이름과 학번을 보내는 부분
const studentName = 'John Doe'; // 예시 이름
const studentNumber = '12345';  // 예시 학번

socket.emit('join', { studentName, studentNumber }, (data) => {
  const userNamesElement = document.getElementById('userNames'); // 유저 이름을 표시할 엘리먼트
  const userNameElement = document.createElement('div');
  userNameElement.textContent = data.studentName;
  userNamesElement.appendChild(userNameElement);
});


// 채팅 메시지 이벤트 처리
// 'message' 이벤트를 수신하여 채팅 메시지를 화면에 표시
socket.on('message', (data) => {
  const messagesElement = document.getElementById('messages');
  const messageElement = document.createElement('div');
  const timestamp = new Date(data.timeStamp).toLocaleTimeString();

  messageElement.textContent = `[${timestamp}] ${data.studentName}: ${data.message}`;
  messagesElement.appendChild(messageElement);
});


// 입장 이벤트 송신 처리
const sendAddButton = document.getElementById('addButton');
sendAddButton.addEventListener('click', () => {
  const userNumber = document.getElementById('number').value; // 사용자 학번 설정
  const userName = document.getElementById('name').value; // 사용자 이름 설정

  if (userName && userNumber) {
    socket.emit('join', { studentName: userName, studentNumber: userNumber }); // 서버로 입장 정보 전송
  } else {
    alert('이름과 학번을 모두 입력하세요.'); // 이름 또는 학번 미입력시 경고
  }
});

// 수신 이벤트 송신 처리
const sendMessageButton = document.getElementById('sendMessageButton');
sendMessageButton.addEventListener('click', () => {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;

  if (message) {
    socket.emit('message', { message }); // 서버로 메시지 전송
    messageInput.value = ''; // 입력 필드 초기화
  } else {
    alert('메시지를 입력하세요.'); // 메시지 미입력시 경고
  }
});


// 클라이언트
const dataToSend = { message: '안녕하세요!' };
socket.emit('clientEvent', dataToSend);

// 서버
socket.on('serverEvent', (data) => {
  console.log('클라이언트로부터 데이터 수신:', data);
});

// 요약하면, socket.on은 이벤트 수신을 위해 사용되고,
//  socket.emit은 이벤트를 발생시켜 데이터를 전송하는 데 사용됩니다.
//  이 두 메서드를 조합하여 양방향 통신을 구현할 수 있습니다.