const tableBody = document.querySelector(".table__body");

function downloadData(people) {
    let strTable = '';

    for (let index = 0; index < people.length; index++) {
        const person = people[index];
        strTable += `<tr>
                    <td class="firstName">${person.name.firstName}</td>
                    <td class="lastName">${person.name.lastName}</td>
                    <td class="about"><p> ${person.about}</p></td>
                    <td class="eyeColor" style="background-color: ${person.eyeColor};">${person.eyeColor}</td>
                </tr>`;
    }

    return strTable;
}

tableBody.innerHTML = downloadData(people); // загрузка строки таблицы в <tbody>