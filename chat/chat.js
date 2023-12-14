// 소켓 서버에 연결합니다. 서버의 주소는 'http://113.198.233.57:3000/chat'입니다.
const socket = io('http://113.198.233.57:3000/chat');

// 오늘 날짜를 표시하는 엘리먼트를 찾아서 오늘 날짜로 업데이트합니다.
const dateElement = document.getElementById('date');
const today = new Date();
dateElement.textContent = `오늘 날짜: ${today.toLocaleDateString()}`;

// 'joinUser' 이벤트를 수신하여 유저 수를 업데이트합니다.
// 이 이벤트는 새로운 유저가 채팅방에 참여할 때마다 발생합니다.
socket.on('joinUser', (data) => {
  const userCountElement = document.getElementById('userCount');
  userCountElement.textContent = `유저 수: ${data.userCount}`;
});

// 로컬 스토리지에서 저장된 채팅 메시지를 불러오는 함수입니다.
function loadMessages() {
  const storedMessages = localStorage.getItem('chatMessages');
  return storedMessages ? JSON.parse(storedMessages) : [];
}

// 새로운 채팅 메시지를 로컬 스토리지에 저장하는 함수입니다.
function saveMessage(newMessage) {
  const messages = loadMessages();
  messages.push(newMessage);
  localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// 페이지가 로드될 때, 로컬 스토리지에서 저장된 채팅 메시지를 화면에 표시합니다.
document.addEventListener('DOMContentLoaded', () => {
  const messages = loadMessages();
  const messagesElement = document.getElementById('messages');

  messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `[${message.timeStamp}] ${message.userName}: ${message.message}`;
    messagesElement.appendChild(messageElement);
  });
});

// 'receiveMessage' 이벤트를 수신하여 채팅 메시지를 화면에 표시하고
// 로컬 스토리지에 저장합니다.
socket.on('receiveMessage', (data) => {
  const messagesElement = document.getElementById('messages');
  const messageElement = document.createElement('div');
  const timestamp = new Date(data.timeStamp).toLocaleTimeString();

  messageElement.textContent = `[${timestamp}] ${data.userName}: ${data.message}`;
  messagesElement.appendChild(messageElement);

  saveMessage({ ...data, timeStamp: timestamp }); // 로컬 스토리지에 저장
});

// 메시지 전송 버튼을 클릭하면 메시지를 서버로 전송하는 이벤트 핸들러입니다.
const sendMessageButton = document.getElementById('sendMessageButton');
sendMessageButton.addEventListener('click', () => {
  const userName = "윤도운"; // 사용자 이름 설정
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;

  // 메시지 입력 확인
  if (message) {
    socket.emit('sendMessage', { userName, message }); // 서버로 메시지 전송
    messageInput.value = ''; // 입력 필드 초기화
  } else {
    alert('이름과 메시지를 모두 입력하세요.'); // 메시지 미입력시 경고
  }
});
