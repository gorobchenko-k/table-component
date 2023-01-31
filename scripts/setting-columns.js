const table = document.querySelector(".table");
const tableSetting = document.querySelector(".table__setting i");
const tableSettingList = document.querySelector(".table__setting-list");
const tableSettingCheckbox = document.querySelectorAll(".table__setting-item input");

tableSetting.addEventListener("click", () => {
    tableSettingList.classList.toggle("_active");
});

window.addEventListener("click", (e) => {
    if (tableSettingList.classList.contains("_active")) {
        const target = e.target
        if (!target.closest(".table__setting-list") && !target.closest(".table__setting i")) {
            tableSettingList.classList.remove("_active");
        }
    }
});

tableSettingCheckbox.forEach(item => item.addEventListener("change", (e) => {
    const column = table.querySelectorAll(`.${e.target.value}`);
    hiddenColumns[e.target.value] = e.target.checked;
    if (e.target.checked) { // показать столбец
        column.forEach(item => item.classList.remove("_hidden"));
    } else { // скрыть столбец
        column.forEach(item => item.classList.add("_hidden"));
    }

    console.log(hiddenColumns);
}));
