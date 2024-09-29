async function getColaboretor() {
    const payload = {
        report: {
            group_by: "",
            columns: "id,name",
            format: "json"
        }
    };

    try {
        const response = await fetch(url_employees, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "access-token": accessToken
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Exception(response.status);

        const data = await response.json();
        return data.data[0][0].data;

    } catch (error) {
        alert("Erro ao obter colaboradores:", error.message);
    }
}

async function colaboretor() {
    const colaboretors = await getColaboretor();
    const select = document.getElementById("search_colaborator");

    colaboretors.forEach(colaboretor => {
        const newOption = document.createElement("option");
        newOption.value = colaboretor.id
        newOption.textContent = colaboretor.name

        select.appendChild(newOption)
    });
}