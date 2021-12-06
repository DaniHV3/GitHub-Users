$("#search").keypress(function (e) {
  var keycode = e.keyCode ? e.keyCode : e.which;
  if (keycode == "13") {
    getUserName();
  }
});

function getUserName() {
  const userName = document.getElementsByTagName("input")[0].value;
  getUserData(userName);
}

async function getUserData(userName) {
  let urlName = "https://api.github.com/users/" + userName;
  const response = await fetch(urlName);
  const userData = await response.json();
  printUserData(userData);

  // waits until the request completes...
}

function printUserData(userData) {
  if (!userData.message) {
    console.log(userData);
    let temp = document.getElementsByTagName("template")[0]; //Cogemos el template
    let clon = temp.content.cloneNode(true); //Clonamos el template
    //Imagen
    clon.childNodes[1].childNodes[1].childNodes[1].src = userData.avatar_url;
    //Nombre
    clon.childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerHTML =
      userData.name;
    //Usuario
    clon.childNodes[1].childNodes[3].childNodes[1].childNodes[3].innerHTML =
      userData.login;
    //Biografía
    clon.childNodes[1].childNodes[3].childNodes[3].childNodes[1].innerHTML =
      userData.bio;
    clon.childNodes[1].childNodes[3].childNodes[3].childNodes[3].childNodes[1].childNodes[2].innerHTML =
      userData.followers;
    clon.childNodes[1].childNodes[3].childNodes[3].childNodes[3].childNodes[3].childNodes[2].innerHTML =
      userData.public_repos;
    let fatherCont = document.getElementsByClassName("contGeneralData")[0];

    fatherCont.appendChild(clon);

    let child = document.getElementsByClassName("contDataUser")[0];
    fatherCont.removeChild(child);
    console.log(clon);
  } else {
    console.log("Este usuario no existe");
  }
}
