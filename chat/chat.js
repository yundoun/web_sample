// 소켓 서버에 연결
const socket = io('http://113.198.233.57:3000/chat');

// 오늘 날짜를 표시하는 엘리먼트를 가져와서 날짜를 업데이트합니다.
const dateElement = document.getElementById('date');
const today = new Date();
dateElement.textContent = `오늘 날짜: ${today.toLocaleDateString()}`;

// 'joinUser' 이벤트를 수신하여 유저 수 업데이트
socket.on('joinUser', (data) => {
  const userCountElement = document.getElementById('userCount');
  // 새로운 유저가 연결되면 유저 수를 업데이트합니다.
  userCountElement.textContent = `유저 수: ${data.userCount}`;
});

// 'receiveMessage' 이벤트를 수신하여 메시지 표시
socket.on('receiveMessage', (data) => {
  const messagesElement = document.getElementById('messages');
  const messageElement = document.createElement('div');
  const timestamp = new Date(data.timeStamp).toLocaleTimeString();

  // 수신된 메시지를 표시합니다.
  messageElement.textContent = `[${timestamp}] ${data.userName}: ${data.message}`;
  messagesElement.appendChild(messageElement);
});

// 메시지 전송 버튼 클릭 시 호출되는 함수
const sendMessageButton = document.getElementById('sendMessageButton');
sendMessageButton.addEventListener('click', () => {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;

  // 유저 이름과 메시지가 입력되었는지 확인합니다.
  if (message) {
    // 서버로 메시지를 전송합니다.
    socket.emit('sendMessage', { userName: "윤도운", message });
    messageInput.value = ''; // 입력 필드 초기화
  } else {
    alert('이름과 메시지를 모두 입력하세요.');
  }
});
