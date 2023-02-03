const tableTr = tableBody.querySelectorAll("tr");
const form = document.querySelector(".form");
const inputFirstName = document.querySelector("#firstName");
const inputLastName = document.querySelector("#lastName");
const inputAbout = document.querySelector("#about");
const inputEyeColor = document.querySelector("#eyeColor");
const buttonSave = document.querySelector(".button-save");
const buttonCancel = document.querySelector(".button-cancel");

let rowIndex; // индекс строки, данный которой изменены

// событие при клике по строке таблицы
tableBody.addEventListener("click", (e) => {
    // функция преобразования rgb в hex
    const toHex = (color) => { 
        function hex(str) {
            const result = parseInt(str).toString(16);
            return result.length < 2 ? "0" + result : result;
        }

        const rgb = color.match(/^rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)$/);
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    };

    const row = e.target.closest("tr");
    const color = row.querySelector(".eyeColor").style.backgroundColor;

    rowIndex = row.dataset.index;

    form.classList.add("_active"); // отображение формы для изменения данных

    if (row.classList.contains("_active")) {
        row.classList.remove("_active");
    } else {
        tableTr.forEach(item => item.classList.remove("_active"));
        row.classList.add("_active");
    }
    // вывод данных в поля формы 
    inputFirstName.value = row.querySelector(".firstName").textContent;
    inputLastName.value = row.querySelector(".lastName").textContent;
    inputAbout.value = row.querySelector(".about").textContent;
    inputEyeColor.value = toHex(color);
});

// функция сохранения данных, обновление таблицы
buttonSave.addEventListener("click", () => {
    people[rowIndex].name.firstName = inputFirstName.value;
    people[rowIndex].name.lastName = inputLastName.value;
    people[rowIndex].about = inputAbout.value;
    people[rowIndex].eyeColor = inputEyeColor.value;

    sortData(dataSort);
    tableBody.innerHTML = downloadData(people);

    // очищение полей и скрытие формы
    inputFirstName.value = "";
    inputLastName.value = "";
    inputAbout.value = "";
    inputEyeColor.value = "#000000";
    form.classList.remove("_active");
});

// функция отмены сохранения данных
buttonCancel.addEventListener("click", () => {
    form.classList.remove("_active");
    tableTr.forEach(item => item.classList.remove("_active"));
});