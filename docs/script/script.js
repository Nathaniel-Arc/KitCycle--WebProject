document.getElementById("loginForm").addEventListener("submit", function(event){

    event.preventDefault();

    let role = document.getElementById("role").value;

    if(role === "student"){
        window.location.href = "student-dashboard.html";
    }

    else if(role === "faculty"){
        window.location.href = "faculty-dashboard.html";
    }

    else if(role === "admin"){
        window.location.href = "admin-dashboard.html";
    }

});