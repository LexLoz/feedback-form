import { IsAllFieldsFilled } from "./validation";

function submitHandler(e) {
    e.preventDefault();

    if (!IsAllFieldsFilled()) return console.error('Error: all field not filled');
  
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() { 
      console.log("readyState=", this.readyState, "statis=", this.status);
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          console.log("SUCCESS", this);
      }
    }
    
    request.open(this.method, this.action, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    var data = new FormData(this);
    for (var key of data.keys())
      console.log(key, data.get(key));
      
    request.send(data);
  }
  
  document.querySelector("form").addEventListener("submit", submitHandler)