// imports
import { psg, myu, bayern, city, real, barca, liverpool } from "./data.js";

// elements

const loginBtn = document.querySelector("#loginBtn");
const clubNameInp = document.querySelector("#clubName");
const loginPage = document.querySelector(".login");
const teamName = document.querySelector(".teamName");
const players = document.querySelector(".players");
const positionFilter = document.querySelectorAll("#positionFilter button");
const logoutBtn = document.querySelector("#logout");
const containerEl = document.querySelector(".container");
const clubNameEL = localStorage.getItem("clubName");
const teamInfo = document.querySelector(".teamInfo");


const PsgData = JSON.stringify(psg);
const myuData = JSON.stringify(myu);
const bayernData = JSON.stringify(bayern);
const cityData = JSON.stringify(city);
const realData = JSON.stringify(real);
const barcaData = JSON.stringify(barca);
const liverpoolData = JSON.stringify(liverpool);




// localstorage -------------

localStorage.getItem("clubName") ? loginPage.style.display = "none" : loginPage.style.display = "flex";
if (loginPage.style.display === "flex") {
    containerEl.style.display = "none";
} else {
    containerEl.style.display = "flex";
}

// functions -----------

const functionForAppend = (player) => {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player");
    playerDiv.innerHTML = functionForInner(player);;
    localStorage.setItem("players", JSON.stringify(functionForFindCLub()));
    return playerDiv;
}

const functionForFindCLub = () => {
    if (clubNameEL.toLowerCase() === "psg") {
        return JSON.parse(PsgData);
    } else if (clubNameEL.toLowerCase() === "myu") {
        return JSON.parse(myuData);
    } else if (clubNameEL.toLowerCase() === "bayern") {
        return JSON.parse(bayernData);
    } else if (clubNameEL.toLowerCase() === "city") {
        return JSON.parse(cityData);
    } else if (clubNameEL.toLowerCase() === "real") {
        return JSON.parse(realData);
    } else if (clubNameEL.toLowerCase() === "barca") {
        return JSON.parse(barcaData);
    } else if (clubNameEL.toLowerCase() === "liverpool") {
        return JSON.parse(liverpoolData);
    }
}


const functionForInner = (player) => {
    return `
        <h3>${player.name}</h3>
        <p>Age: ${player.age}</p>
        <p>Position: ${player.position}</p>
        <p>Number: ${player.number}</p>
        <p>Market Value: ${player.price}MLN funt</p>
    `
}

// Login --------------

loginBtn.addEventListener("click", (e) => {
    if (["psg", "myu", "bayern", "city", "real", "barca", "liverpool"].includes(clubNameInp.value.toLowerCase())) {
        localStorage.setItem("clubName", clubNameInp.value.toLowerCase());

        teamName.textContent = clubNameEL === "psg" ? "Paris Saint-Germain" : clubNameEL === "myu" ? "Manchester United" : clubNameEL === "bayern" ? "Bayern Munich" : clubNameEL === "city" ? "Manchester City" : clubNameEL === "real" ? "Real Madrid" : clubNameEL === "barca" ? "FC Barcelona" : clubNameEL === "liverpool" ? "Liverpool" : "";
        players.append(...functionForFindCLub().map(player => {
            return functionForAppend(player)
        }));
    }else{
        alert("Club nomini tepada ko'rsatilgan kabi yozing! kichik harfda ham yozsangiz bo'laveradi!")
    }
})

//  LogOut -------------

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("clubName");
    location.reload();
})

// filters ----------------

positionFilter.forEach(button => {
    button.addEventListener("click", () => {
        const position = button.textContent;
        if (position.toLowerCase() === "all") {
            players.innerHTML = "";
            players.append(...functionForFindCLub().map(player => {
                return functionForAppend(player)
            }));
        } else {
            players.innerHTML = "";
            players.append(...functionForFindCLub().filter(player => player.position.toLowerCase() === position.toLowerCase()).map(player => {
                return functionForAppend(player)
            }));
        }
    });
});


teamName.textContent = clubNameEL === "psg" ? "Paris Saint-Germain" : clubNameEL === "myu" ? "Manchester United" : clubNameEL === "bayern" ? "Bayern Munich" : clubNameEL === "city" ? "Manchester City" : clubNameEL === "real" ? "Real Madrid" : clubNameEL === "barca" ? "FC Barcelona" : clubNameEL === "liverpool" ? "Liverpool" : "";

players.append(...functionForFindCLub().map(player => {
    return functionForAppend(player)
}));


const teamInfoFunc = (team) => {
    teamInfo.textContent = JSON.parse(team).length + " players and Club price " + JSON.parse(team).reduce((acc, player) => acc + player.price, 0) + "M";
}

teamInfoFunc(localStorage.getItem("players"));