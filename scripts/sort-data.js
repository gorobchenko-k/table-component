const sortAsc = document.querySelectorAll(".sort-asc");
const sortDesc = document.querySelectorAll(".sort-desc");

//каждой стрелке для сортировки добавляем событие
sortAsc.forEach(item => item.addEventListener("click", (e) => showSort(e.target, "asc")));
sortDesc.forEach(item => item.addEventListener("click", (e) => showSort(e.target, "desc")));

//функция, которая выделяет стрелку сортировки и выводит отсортированный массив People
function showSort(target, orderSort) {
    let column = target.parentElement.classList[1].slice(5); // получаем ключ объекта, по которому необходимо отсортировать массив
    if (target.classList.contains("_active")) { // если массив уже отсортирован по этому ключу, выводим исходный массив
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

//функция сортировки массива People по определенной колонке 
function sortData(dataSort) {
    const [column, orderSort] = dataSort;
    people.sort((a, b) => {
        if (column === "firstName" || column === "lastName") {
            return a.name[column] > b.name[column] ? 1 : -1;
        } else {
            return a[column] > b[column] ? 1 : -1;
        }
    });
    if(orderSort === "desc") people.reverse();
}

