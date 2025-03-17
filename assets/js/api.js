// api.js: Handles API calls from the client to the backend server using fetch or axios.

// Ensure only logged-in users can access the page
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    if (!token) {
        // Redirect to login page if no token is found
        window.location.href = "index.html";
    }
});

// Logout functionality
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("token"); // Remove token from storage
        window.location.href = "index.html"; // Redirect to login page
    });
});

let btn = document.getElementById("btn");
let input = document.getElementById("txt-field");
let resultTxt = document.getElementById("result-txt");
let div = document.getElementById("enemy-div");

btn.onclick = function () {
    loadEnemy(input.value);
};

async function loadEnemy(enemy) {
    if (enemy == "") {
        resultTxt.innerHTML = "INVALID ENEMY NAME";
        return;
    }

    enemy = enemy.replace(/\s+/g, '-').toLowerCase();
    console.log(enemy);

    try {
        let response = await fetch("https://www.dnd5eapi.co/api/2014/monsters/" + enemy);
        let dataTxt = await response.text();
        let dataJSON = JSON.parse(dataTxt);

        console.log(dataJSON);

        let node = document.createElement("div");
        let image = document.createElement("img");
        let name = document.createElement("p");
        let cr = document.createElement("p");
        let hp = document.createElement("p");
        let ac = document.createElement("p");
        let stats = document.createElement("div");

        image.src = "https://www.dnd5eapi.co" + dataJSON["image"];
        name.innerHTML = dataJSON["name"];
        cr.innerHTML = "CR: " + dataJSON["challenge_rating"];
        hp.innerHTML = "HP: " + dataJSON["hit_points"];
        ac.innerHTML = "AC: " + getAC(dataJSON["armor_class"]);

        node.appendChild(image);
        node.appendChild(name);
        stats.appendChild(cr);
        stats.appendChild(hp);
        stats.appendChild(ac);
        node.appendChild(stats);

        name.classList.add("enemy-title");
        node.classList.add("enemy-card");
        div.appendChild(node);
        resultTxt.innerHTML = "Added Enemy Card!";
    } catch (error) {
        console.error("Error loading enemy:", error);
        resultTxt.innerHTML = "INVALID ENEMY NAME";
    }
}

function getAC(arr) {
    let ac = 0;
    arr.forEach(obj => {
        ac += obj["value"];
    });
    return ac;
}


