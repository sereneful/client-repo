// main.js: Contains client-side logic for handling form submissions, UI updates, and interactions.

let btn = document.getElementById("btn");
btn.onclick = test;

async function test(){
    let data = await fetch("https://www.dnd5eapi.co/api/2014/monsters/adult-black-dragon/")
    let dataTxt = await data.text();
    let dataJSON = await JSON.parse(dataTxt);
    console.log(dataJSON);

    let node = document.createElement("p");
    console.log(typeof(node));
    node.innerHTML = dataJSON["name"];
    document.body.appendChild(node);
}
