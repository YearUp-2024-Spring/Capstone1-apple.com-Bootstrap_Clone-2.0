"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const signUpBtn = document.querySelector("#signUpBtn");
    const signUpMessageDiv = document.querySelector("#signUpMessageDiv");

    signUpBtn.onclick = onSignUpBtnClicked;

function onSignUpBtnClicked(e){
    e.preventDefault();
    console.log("I am clicked")

    if (!firstName.value || !lastName.value || !email.value || !password.value) {
        signUpMessageDiv.className = "text-danger text-center mt-2"
        signUpMessageDiv.innerHTML = 'All fields are required!';
        return;
    };

    let bodyData = {
        username: email.value,
        fullName: firstName.value + " " + lastName.value,
        password: password.value
    }
    console.log(bodyData)

    fetch(apiBaseURL + "/api/users", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => {
        if(json.statusCode === 409){
            console.log(json)
            signUpMessageDiv.className = "text-danger text-center"
            signUpMessageDiv.innerHTML = json.message;
        } else{
            signUpMessageDiv.className = "text-success text-center border p-2 shadow bg-success m-1 text-white"
            signUpMessageDiv.innerHTML = 'User created Succesfully. Please login with the credentials you used.'
            setTimeout("location.href = 'index.html';", 2000);
        }
    })
    .catch(error => {
        console.error('Error adding user: ', error);
        signUpMessageDiv.innerHTML = 'Error creating user. Please try again.';
    });
}
});