async function populate() {
    const requestURL =
      "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
    const request = new Request(requestURL);
  
    const response = await fetch(request);
    const superHeroes = await response.json();

    parseData(superHeroes)
};

populate();

function parseData(superHeroes) {
    const itemList = superHeroes.members;
    const itemArr = [];

    for (let i in itemList) {
        itemArr.push(itemList[i])
        itemArr.push(itemList[i])
        itemArr.push(itemList[i])
    }

    itemArr.forEach((element)=> {
        let listItem = document.createElement("li");
        let nameText = document.createElement("h1");
        let ageText = document.createElement("p");
        let secretText = document.createElement("p");
        let powersText = document.createElement("p");

        nameText.innerHTML = element.name;
        ageText.innerHTML = "Age: " + element.age;
        secretText.innerHTML = "Secret Identity: " + element.secretIdentity;
        powersText.innerHTML = "Powers:" + element.powers

        listItem.append(nameText)
        listItem.append(ageText)
        listItem.append(secretText)
        listItem.append(powersText);
        document.getElementById("listContainer").append(listItem)
    })
};