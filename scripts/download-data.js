const valueEyeColors = {
    blue: "#0000ff",
    brown: "#a52a2a",
    green: "#008000",
    red: "#ff0000"
};
const tableBody = document.querySelector(".table__body");
const tablePages = document.querySelector(".table__pages");
const arrowPrevPage = document.querySelector(".prevPage");
const arrowNextPage = document.querySelector(".nextPage");
const countRows = 10;
let pageNumber = 1; // при загрузке отобажается 1ая страница таблицы
let dataSort = ["id", "asc"];
let hiddenColumns = { // false - колонка скрыта
    firstName: true,
    lastName: true,
    about: true,
    eyeColor: true
};

// функция формирования строки для вывода таблицы данных
function downloadData(people) {
    const lastRow = pageNumber * countRows;
    const firstRow = lastRow - 10;
    let strTable = "";

    for (let index = firstRow; index < lastRow; index++) {
        const person = people[index];
        strTable += `<tr data-index=${index}>
                    <td class="firstName ${hiddenColumns.firstName ? '' : '_hidden'}">${person.name.firstName}</td>
                    <td class="lastName ${hiddenColumns.lastName ? '' : '_hidden'}">${person.name.lastName}</td>
                    <td class="about ${hiddenColumns.about ? '' : '_hidden'}"><p>${person.about}</p></td>
                    <td class="eyeColor ${hiddenColumns.eyeColor ? '' : '_hidden'}" style="background-color: ${person.eyeColor};"></td>
                </tr>`;
    }
    return strTable;
}

// функция загрузки данных, выбранной страницы, и изменения стиля номера активной страницы 
function changePage() {
    tableBody.innerHTML = downloadData(people);
    tablePageList.forEach(item => item.classList.remove("_active"));
    tablePageList[pageNumber - 1].classList.add("_active");
}

// вывод навигации по страницам
let strTablePages = "";
for (let index = 1; index <= people.length / countRows; index++) {
    strTablePages += `<span class="table__page">${index}</span>`;
}
tablePages.innerHTML = strTablePages;
const tablePageList = tablePages.querySelectorAll(".table__page");
tablePageList[0].classList.add("_active");

// событие при клике по номеру страницы
tablePageList.forEach(item => item.addEventListener("click", (e) => {
    pageNumber = +e.target.textContent;
    changePage();
}));

// события при клике предыдущей/следующей страницы
arrowPrevPage.addEventListener("click", () => {
    if (pageNumber !== 1) {
        pageNumber -= 1;
        changePage();
    }
});
arrowNextPage.addEventListener("click", () => {
    if (pageNumber !== people.length / countRows) {
        pageNumber += 1;
        changePage();
    }
});

people.forEach(item => item.eyeColor = valueEyeColors[item.eyeColor]); // изменение цвета глаз на hex значение
sortData(dataSort); // сортировка данных по id
tableBody.innerHTML = downloadData(people); // загрузка строки таблицы в <tbody>