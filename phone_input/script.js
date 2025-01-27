let input = document.getElementById("inputText");
let display = document.getElementById("displayText");

let phoneNumber;

input.addEventListener("keypress", (event)=>{
    // console.log(event)
    if (display.innerHTML.length >= 14) {
        input.disabled = true;
        return;
    };
    
    phoneNumber = event.target.value;

    updateDisplay(phoneNumber);

    // if (display.innerHTML < 3) {

    // }
    // else if (display.innerHTML.length == 3) {
    //     let placeholder = display.innerHTML
    //     display.innerHTML = '(' + placeholder + ') ';
    // } else if (display.innerHTML.length == 9) {
    //     placeholder = display.innerHTML;
    //     display.innerHTML = placeholder + '-';
    // }
})

function updateDisplay(phoneNumber) {
    console.log(phoneNumber);
    display.innerHTML = phoneNumber;
    console.log(display.innerHTML)
}