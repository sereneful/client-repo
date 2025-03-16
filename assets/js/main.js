// main.js: Contains client-side logic for handling form submissions, UI updates, and interactions.

let btn = document.getElementById("btn");
let btn1 = document.getElementById("btn1");

let div = document.getElementById("enemy-div");

btn.onclick = function(){
    test("adult-black-dragon");
};

btn1.onclick = function(){
    test("goblin");
};

async function test(enemy){
    let data = await fetch("https://www.dnd5eapi.co/api/2014/monsters/" + enemy)
    let dataTxt = await data.text();
    let dataJSON = await JSON.parse(dataTxt);
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

    name.classList.add("enemy-title")
    node.classList.add("enemy-card");
    div.appendChild(node);
}

function getAC(arr){
    let ac = 0;
    arr.forEach(obj => {
        ac += obj["value"];
    });
    return ac;
}

test();
