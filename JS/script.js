let accessToken;
const url_work_days = "https://api.pontomais.com.br/external_api/v1/reports/work_days";
const url_exemptions = "https://api.pontomais.com.br/external_api/v1/reports/exemptions";
const url_employees = "https://api.pontomais.com.br/external_api/v1/reports/employees";

const today = new Date();

document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    const start_at = document.getElementById("start_at");
    const end_at = document.getElementById("end_at");

    start_at.value =  new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
    end_at.value = formatDate(today);

    const buttonSearch = document.getElementById("search");
    const buttonGetToken = document.getElementById("getToken");
    console.log(accessToken);
    buttonGetToken.addEventListener('click', () => {
        colaboretor();
    })

    buttonSearch.addEventListener('click', function() {
        const colaboretorId = document.getElementById("search_colaborator").value;
        const content = document.getElementById("content");
        content.textContent = '';
        
        hours(colaboretorId);
        allowances(colaboretorId);
    }); 

    const token = document.getElementById("token");
    token.addEventListener('input', () => {
        accessToken = token.value;
    })
});
