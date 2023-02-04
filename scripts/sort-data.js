"use strict";
const sortAsc = document.querySelectorAll(".sort-asc");
const sortDesc = document.querySelectorAll(".sort-desc");

// добавление события для стрелок сортировки
sortAsc.forEach(item => item.addEventListener("click", (e) => showSort(e.target, "asc")));
sortDesc.forEach(item => item.addEventListener("click", (e) => showSort(e.target, "desc")));

// функция изменения стиля активной стрелки сортировки и выводы отсортированных данных
function showSort(target, orderSort) {
    // колонка таблицы, по которой необходимо отсортировать массив
    const column = target.parentElement.classList[1].slice(5);
    if (target.classList.contains("_active")) {
        target.classList.remove("_active");
        dataSort = ["id", "asc"];
    } else {
        sortAsc.forEach(item => item.classList.remove("_active"));
        sortDesc.forEach(item => item.classList.remove("_active"));
        target.classList.add("_active");
        dataSort = [column, orderSort];
    }
    sortData(dataSort);
    tableBody.innerHTML = downloadData(people);
}

// функция сортировки данных по определенным параметрам 
function sortData(dataSort) {
    const [column, orderSort] = dataSort;
    people.sort((a, b) => {
        if (column === "firstName" || column === "lastName") {
            return a.name[column] > b.name[column] ? 1 : -1;
        } else {
            return a[column] > b[column] ? 1 : -1;
        }
    });
    if (orderSort === "desc") people.reverse();
}