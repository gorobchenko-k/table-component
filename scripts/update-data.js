const colors = {
    blue: "#0000ff",
    brown: "#a52a2a",
    green: "#00ff00",
    red: "#ff0000"
};

const tableTr = tableBody.querySelectorAll("tr");
const form = document.querySelector(".form");
const inputFirstName = document.querySelector("#firstName");
const inputLastName = document.querySelector("#lastName");
const inputAbout = document.querySelector("#about");
const inputEyeColor = document.querySelector("#eyeColor");
const buttonSave = document.querySelector(".button-save");
const buttonCancel = document.querySelector(".button-cancel");

let rowId;

tableBody.addEventListener("click", (e) => {
    const toHex = function (color) { // функция преобразования rgb в hex 
        function hex(str) {
            let result = parseInt(str).toString(16);
            return result < 2 ? "0" + result : result;
        }

        let rgb = color.match(/^rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)$/);

        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    };

    let row = e.target.closest("tr");
    const color = row.querySelector(".eyeColor").style.backgroundColor;

    rowId = row.dataset.id;

    form.classList.add("_active"); // отображение формы для изменения данных

    if (row.classList.contains("_active")) {
        row.classList.remove("_active");
    } else {
        tableTr.forEach(item => item.classList.remove("_active"));
        row.classList.add("_active");
    }
    // вывод дынных в поля формы 
    inputFirstName.value = row.querySelector(".firstName").textContent;
    inputLastName.value = row.querySelector(".lastName").textContent;
    inputAbout.value = row.querySelector(".about").textContent;
    inputEyeColor.value = colors[color] ? colors[color] : toHex(color);
});

buttonSave.addEventListener("click", () => {
    // сохранение данных
    people = people.map(item => {
        if (item.id === rowId) {
            item.name.firstName = inputFirstName.value;
            item.name.lastName = inputLastName.value;
            item.about = inputAbout.value;
            item.eyeColor = inputEyeColor.value;
        }
        return item;
    });

    //обновление таблицы (вывод новых данных)
    tableBody.innerHTML = downloadData(people);
    //очищение полей
    inputFirstName.value = "";
    inputLastName.value = "";
    inputAbout.value = "";
    inputEyeColor.value = "#000000";
    sortAsc.forEach(item => item.classList.remove("_active"));
    sortDesc.forEach(item => item.classList.remove("_active"));
    form.classList.remove("_active");
});

buttonCancel.addEventListener("click", () => { //отмена сохранение данных
    form.classList.remove("_active");
    tableTr.forEach(item => item.classList.remove("_active"));
});
