let shift_time;
let total_hours_positive = [];
let total_hours_negative = [];

async function getHours(id) {
    const start_at = document.getElementById("start_at");
    const end_at = document.getElementById("end_at");

    const payload = {
        report: {
            start_date: start_at.value,
            end_date: end_at.value,
            group_by: "employee",
            columns: "date,time_cards,total_time,shift_time,extra_time",
            format: "json",
            employee_id: id
        }
    };

    try {
        const response = await fetch(url_work_days, {
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
        console.error("Erro ao obter horas:", error.message);
    }
}

async function hours(id) {
    const hours = await getHours(id);

    hours.forEach(hour => {
        shift_time = hour.shift_time;
        cardHours(hour);
    });
}

function cardHours(hour) {
    const content = document.getElementById("content");
    const div = document.createElement("div");
    const header = document.createElement("div");
    const body = document.createElement("div");
    const footer = document.createElement("div");

    card(div);
    cardHeader(header, hour.date);
    cardBody(body, hour.time_cards, hour.date);
    cardFooter(body, footer, hour.time_cards)

    div.append(header);
    div.append(body);
    div.append(footer);
    content.append(div)
}

function card(div) {
    div.style.width = "150px";
    div.style.textAlign = "center"
    div.style.borderRadius = "10px";
    div.style.border = "1px solid #d2f7d8"
}

function cardHeader(header, data)
{
    header.textContent = data;
    header.style.backgroundColor = "#d2f7d8"
    header.style.borderRadius = "10px 10px 0px 0px"
    header.style.display = "flex";
    header.style.height = "35px";
    header.style.alignItems = "center";
    header.style.justifyContent = "center";
}

function cardBody(body, times, date){
    body.id = date;
    body.style.padding = "3px"

    if( times.length === 0 &&
        (
            date.includes("Dom") ||
            date.includes("Sáb")
        )
    ) {
        body.style.color = "green";
        body.textContent = `Fim de semana`;
        return;
    }

    if(times.length === 0){
        body.style.color = "red";
        body.textContent = `Sem Ponto`;
        total_hours_negative.push(shift_time);
        return;
    }

    times.forEach(time => {
        const p = document.createElement('p');
     
        if(time.title.includes("manualmente")){
            p.style.color = "orange";
        }

        p.textContent += `${time.csv_value}`;
        body.append(p)
    });
}

function cardFooter(body, footer,times) {
    const div = document.createElement('div');

    if(times.length === 0){
        return;
    }

    let a = [];
    let b = [];
    let hours = [];

    times.forEach((time, index) => {
        if (index % 2 === 0) {
            b.push(time);
        } else {
            a.push(time);
        }
    })

    a.forEach((time, index) => {
        if(b[index]){
            hours.push(hoursDiff(time.csv_value, b[index].csv_value).hours)
        }
    })

    const workingTime = hoursSum(hours);
    const diff = hoursDiff(workingTime, shift_time);

    div.textContent = diff.hours
    if(diff.status === "positive"){
        div.style.background = "#50e068";
        total_hours_positive.push(diff.hours)
    } else {
        div.style.background = "#ff6e6e";
        total_hours_negative.push(diff.hours)
    }

    div.style.borderRadius = "10px";


    body.append(div)
}

function totalHours() {
    const content = document.getElementById("content_total");

    const hoursPositive = hoursSum(total_hours_positive);
    const hoursNegative = hoursSum(total_hours_negative);

    const diff = hoursDiff(hoursPositive, hoursNegative);

    content.textContent = diff.hours;

    if(diff.status === "positive"){
        content.style.background = "#50e068";
    } else {
        content.style.background = "#ff6e6e";
    }
}