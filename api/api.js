const $app = document.getElementById("app");
const $test = document.createElement("a");
$app.append($test);


// // 버튼 클릭 이벤트 핸들러
// document.getElementById("post").addEventListener("click", function () {
//   // 입력 필드의 값을 가져옴
//   var nameInput = document.getElementById("name").value;
//   var scoreInput = document.getElementById("score").value;

//   // 출력할 div 태그 참조
//   var messageDiv = document.getElementById("message");

// 입력된 내용을 기존 내용 뒤에 추가
// var currentContent = messageDiv.innerHTML;
// var newContent =
//   "이름: " + nameInput + "<br>점수: " + scoreInput + "<br><br>";
// messageDiv.innerHTML = currentContent + newContent;

// // 입력 필드 초기화

//  });



// POST API 요청 처리
document.getElementById("post").addEventListener("click", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const score = parseInt(document.getElementById("score").value);
  console.log(name);
  console.log(score);

  var currentContent = "내가 보낸 메시지: " + name + "\t" + score + "</br>";

  const requestBody = JSON.stringify({ name, score });

  fetch("http://113.198.233.57:3000/api/test/record", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: requestBody
  })
    .then(response => {
      console.log(response);
      return response.json()
    })
    .then(data => {
      console.log(data)
      const resultElement = document.getElementById("message");
      newContent = `서버로부터 받은 메시지: ${data}`;
      resultElement.innerHTML = currentContent + newContent;
    })
    .catch(error => {
      console.error(error);
    });

  document.getElementById("name").value = "";
  document.getElementById("score").value = "";
});

// GET API 요청 처리
document.getElementById("get").addEventListener("click", function () {

  const name = document.getElementById("name").value;
  const score = parseInt(document.getElementById("score").value);
  console.log(name);
  console.log(score);

  fetch("http://113.198.233.57:3000/api/test/record?type=score", {
    method: "GET"
  })
    .then(response => {
      console.log(response);
      return response.json()
    })
    .then(data => {
      console.log(data);
      const resultElement = document.getElementById("message");
      resultElement.innerHTML = `서버로부터 받은 메시지: ${data}`;
    })
    .catch(error => {
      console.error(error);
    });

  document.getElementById("name").value = "";
  document.getElementById("score").value = "";

});

