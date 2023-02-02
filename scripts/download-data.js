const colors = {
    blue: "#0000ff",
    brown: "#a52a2a",
    green: "#008000",
    red: "#ff0000"
};
const tableBody = document.querySelector(".table__body");
const tablePages = document.querySelector(".table__pages");
const countRows = 10;
let pageNumber = 1; //при загрузке отобажается 1ая страница таблицы
let dataSort = ["id", "asc"];
let hiddenColumns = { // false - колонка скрыта
    firstName: true,
    lastName: true,
    about: true,
    eyeColor: true
};
// выводим номера страниц
let strTablePages = "";
for (let index = 1; index <= people.length / countRows; index++) {
    strTablePages += `<span class="table__page">${index}</span>`;
}
tablePages.innerHTML = strTablePages;
const tablePageList = tablePages.querySelectorAll(".table__page");
tablePageList[0].classList.add("_active");
// при клике по номеру страницы меняем номер страницы и выводим данные
tablePageList.forEach(item => item.addEventListener("click", (e) => {
    pageNumber = e.target.textContent;
    tableBody.innerHTML = downloadData(people); // загрузка строки таблицы в <tbody>
    tablePageList.forEach(item => item.classList.remove("_active"));
    e.target.classList.add("_active");
}));

function downloadData(people) {
    const lastRow = pageNumber * countRows;
    const firstRow = lastRow - 10;
    let strTable = "";

    for (let index = firstRow; index < lastRow; index++) {
        const person = people[index];
        strTable += `<tr data-id=${person.id}>
                    <td class="firstName ${hiddenColumns.firstName ? '' : '_hidden'}">${person.name.firstName}</td>
                    <td class="lastName ${hiddenColumns.lastName ? '' : '_hidden'}">${person.name.lastName}</td>
                    <td class="about ${hiddenColumns.about ? '' : '_hidden'}"><p>${person.about}</p></td>
                    <td class="eyeColor ${hiddenColumns.eyeColor ? '' : '_hidden'}" style="background-color: ${person.eyeColor};"></td>
                </tr>`;
    }

    return strTable;
}

people.map(item => item.eyeColor = colors[item.eyeColor]);
sortData(dataSort);
tableBody.innerHTML = downloadData(people); // загрузка строки таблицы в <tbody>