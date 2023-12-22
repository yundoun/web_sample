// 소켓 서버에 연결합니다.
const socket = io('http://113.198.234.57:3001/api/ddda');

const $name = document.getElementById("name");
const $quest = document.getElementById("quest");
const $answer = document.getElementById("answer");
const $o = document.getElementById("o");
const $x = document.getElementById("x");
const $chatBox = document.getElementById("chatBox");


// 소켓 송신 1 문제요청 ready + 소켓 수신 1 getQuestion
document.getElementById("questRequest").addEventListener('click', () => {
  const name = $name.value;
  console.log(name);


  socket.emit('ready', { name }); // 서버로 입장 정보 전송


  // 소켓 수신
  socket.on('getQuestion', (data) => {
    console.log(data);

    const content = document.createElement("p");
    content.textContent = `${data.expression}`;
    $chatBox.appendChild(content);

  });
})


// 소켓 송신 2 sendanswer + 소켓 수신 2 getResult
document.getElementById("answerPost").addEventListener('click', () => {
  const answer = Number($answer.value);
  socket.emit('sendAnswer', { answer }); // 서버로 입장 정보 전송

  // 소켓 수신 (결과 수신)
  socket.on('getResult', (data) => {
    alert(`${data.isCorrect}`);
  });
})


// post
document.getElementById("regBtn").addEventListener("click", function () {

  const name = $name.value;

  console.log(typeof (name));
  // post 데이터
  const requestBody = JSON.stringify({ name });
  console.log(name);
  debugger
  if (name) {
    fetch("http://113.198.234.57:3001/api/ddda/resister", {
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
    alert('이름을 입력해주세요');
  }
});


// get
document.getElementById("resultBtn").addEventListener("click", function () {

  const name = $name.value;

  // 서버로 GET 요청 보내기
  fetch("http://113.198.234.57:3001/api/ddda/result?name=" + name, {
  })
    .then(response => response.json())
    .then(data => {
      // 서버 응답을 문자열로 변환
      // const message = `GET 응답: ${JSON.stringify(data)}`;


      $o.textContent = data.correctCount;
      $x.textContent = data.incorrectCount

      // // 결과를 화면에 표시
      // const resultElement = document.getElementById("chatBox");
      // let currentContent = resultElement.innerHTML;
      // let newContent = message
      // resultElement.innerHTML = currentContent + newContent;

    })
});