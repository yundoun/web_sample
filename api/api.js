// POST API 요청 처리
document.getElementById("post").addEventListener("click", function (event) {
  event.preventDefault(); // 폼의 기본 동작인 페이지 리로딩을 막습니다.

  // 입력 필드에서 이름과 점수를 가져옵니다.
  const name = document.getElementById("name").value;
  const score = parseInt(document.getElementById("score").value);

  console.log(name);
  console.log(score);

  // 요청 본문을 JSON 문자열로 생성합니다.
  const requestBody = JSON.stringify({ name, score });

  // 서버로 POST 요청을 보냅니다.
  fetch("http://113.198.233.57:3000/api/test/record", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: requestBody
  })
    .then(response => {
      console.log(response);
      return response.json(); // 서버 응답을 JSON 형태로 파싱합니다.
    })
    .then(data => {
      console.log(data);

      // 결과를 화면에 표시합니다.
      const resultElement = document.getElementById("message");
      let currentContent = message.innerHTML;
      newContent = `내가 보낸 메시지: ${name} \t  ${score} </br> 서버로부터 받은 메시지: ${data} <br>`;
      resultElement.innerHTML = currentContent + newContent;
    })
    .catch(error => {
      console.error(error);
    });

  // 입력 필드를 초기화합니다.
  document.getElementById("name").value = "";
  document.getElementById("score").value = "";
});

// GET API 요청 처리
document.getElementById("get").addEventListener("click", function () {
  // 입력 필드에서 이름과 점수를 가져옵니다.
  const name = document.getElementById("name").value;
  const score = parseInt(document.getElementById("score").value);

  console.log(name);
  console.log(score);

  // 서버로 GET 요청을 보냅니다.
  fetch("http://113.198.233.57:3000/api/test/record?type=score", {
    method: "GET"
  })
    .then(response => {
      console.log(response);
      return response.json(); // 서버 응답을 JSON 형태로 파싱합니다.
    })
    .then(data => {
      console.log(data);

      // 결과를 화면에 표시합니다.
      const resultElement = document.getElementById("message");
      let currentContent = message.innerHTML;
      resultElement.innerHTML = currentContent + `서버로부터 받은 메시지: ${data} <br>`;
    })
    .catch(error => {
      console.error(error);
    });

  // 입력 필드를 초기화합니다.
  document.getElementById("name").value = "";
  document.getElementById("score").value = "";
});
