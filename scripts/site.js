"use strict";


const signInBtn = document.getElementById("signInBtn")
const appleId = document.getElementById("appleId")
const password = document.getElementById("passWord")

signInBtn.onclick = signInBtnClicked;


function signInBtnClicked(e) {
    e.preventDefault();

    const logInData = {
        username: appleId.value,
        password: password.value
    };
    const options = { 
        method: "POST",
        headers: {            
            "Content-Type": "application/json",
        },
        body: JSON.stringify(logInData),
    };

    fetch(apiBaseURL + "/auth/login", options)
        .then(response => response.json())
        .then(data => {
            if (data.message === "Invalid username or password") {
                console.error(data)
                 document.querySelector("#messageDiv").className = "text-danger text-center mt-3"
               document.querySelector("#messageDiv").innerHTML = "***Invalid username or password***"
                return null
            } else {
                window.localStorage.setItem("login-data", JSON.stringify(logInData));
                document.querySelector("#messageDiv").className = "text-success text-center mt-3"
                document.querySelector("#messageDiv").innerHTML = "***Succesfully signed in***"
                setTimeout("location.href = 'index2.html';", 1300);
            }
        });
}


let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
        	next = items[0]
      	}
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})
