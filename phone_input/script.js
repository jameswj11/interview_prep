let input = document.getElementById("inputText");
let display = document.getElementById("displayText");
let phoneNumber;

input.addEventListener("keyup", (event)=>{
    if (event.key >= 0 && event.key <= 9) {
        let text = event.target.value;
    
        if (display.innerHTML.length >= 14) {
            input.disabled = true;
            return;
        };
    
        display.innerHTML = text;
    
        if (text.length == 10) {
            display.innerHTML = '(' + text.substring(0, 3) + ') ' + text.substring(3, 6) + '-' + text.substring(6, text.length);
        } 
    } else {
        event.target.value = event.target.value.slice(0, event.target.value.length - 1)
    }
})