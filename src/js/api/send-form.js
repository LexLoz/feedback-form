import { IsAllFieldsFilled } from "./validation";

// function submitHandler(e) {
//   e.preventDefault();

//   if (!IsAllFieldsFilled()) return console.error('Error: all field not filled');

//   var request = new XMLHttpRequest();
//   request.onreadystatechange = function () {
//     console.log("readyState=", this.readyState, "statis=", this.status);
//     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//       console.log("SUCCESS", this);
//     }
//   }

//   request.open(this.method, this.action, true);
//   request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//   var data = new FormData(this);
//   for (var key of data.keys())
//     console.log(key, data.get(key));

//   request.send(data);
// }

function submitHandler(){
  fetch("mail.php", {
    method: "POST",
    body: new FormData(form)
  })
  .then(response => response.json())
  .then(function(json) { console.log(json) })
  .catch(function(error) { console.log(error); });
}

document.querySelector("form").addEventListener("submit", submitHandler)