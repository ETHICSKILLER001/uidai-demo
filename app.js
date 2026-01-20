let mobileGlobal = "";


function sendOTP() {
mobileGlobal = document.getElementById("mobile").value;
fetch("http://localhost:4000/api/send-otp", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ mobile: mobileGlobal })
}).then(() => window.location.href = "otp.html");
}


function verifyOTP() {
fetch("http://localhost:4000/api/verify-otp", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
mobile: mobileGlobal,
otpCode: document.getElementById("otp").value
})
})
.then(res => res.json())
.then(data => {
localStorage.setItem("profile", JSON.stringify(data.profile));
window.location.href = "dashboard.html";
});
}

document.addEventListener("DOMContentLoaded", () => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (profile) {
    document.getElementById("profile").innerText =
      JSON.stringify(profile, null, 2);
  }
});

function digilockerLogin() {
  const profile = JSON.parse(localStorage.getItem("profile"));

  fetch("http://localhost:4000/api/digilocker/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid: profile.uid })
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("dlToken", data.accessToken);
      fetchDocuments(data.accessToken);
    });
}

function fetchDocuments(token) {
  fetch("http://localhost:4000/api/digilocker/documents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accessToken: token })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("docs").innerText =
        JSON.stringify(data.documents, null, 2);
    });
}
