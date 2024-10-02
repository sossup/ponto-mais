let accessToken;
const url_work_days = "https://api.pontomais.com.br/external_api/v1/reports/work_days";
const url_exemptions = "https://api.pontomais.com.br/external_api/v1/reports/exemptions";
const url_employees = "https://api.pontomais.com.br/external_api/v1/reports/employees";

const today = new Date();








// TO-DO mudar a forma que é adicionado os pontos,
// estou pegando os pontos, calculando, colocando na div
// depois que eu pego os ajustes e abonos
// o problema é que eu deveria estar calculando tudo junto para ter o resultado final.

// a ideia é criar um array/objeto:
// {
//     "Dom, 2024-02-12": {
//         0: "08:30",
//         1: "12:00"
//     }, 
//     "Seg, 2024-02-13": {

//     }
// }
// primeiro com os dados do ponto
// depois adicionar os valores de abono
// ordenar e depois calcular







document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    const start_at = document.getElementById("start_at");
    const end_at = document.getElementById("end_at");

    start_at.value =  new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
    end_at.value = formatDate(today);

    const buttonSearch = document.getElementById("search");
    const buttonGetToken = document.getElementById("getToken");
    colaboretor();
    buttonGetToken.addEventListener('click', () => {
    })

    buttonSearch.addEventListener('click', async function() {
        total_hours_negative = [];
        total_hours_positive = [];

        const colaboretorId = document.getElementById("search_colaborator").value;
        const content = document.getElementById("content");
        content.textContent = '';
        
        await hours(colaboretorId);
        await allowances(colaboretorId);

        totalHours();
    }); 

    const token = document.getElementById("token");
    token.addEventListener('input', () => {
        accessToken = token.value;
    })
});