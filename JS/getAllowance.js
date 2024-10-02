
async function getAllowances(id) {
    const start_at = document.getElementById("start_at");
    const end_at = document.getElementById("end_at");

    const payload = {
        report: {
            employee_id: id,
            start_date: start_at.value,
            end_date: end_at.value,
            columns: "employee_name, date, start_time, end_time, solicitation_status, status",
            format: "json"
        }
    };

    try {
        const response = await fetch(url_exemptions, {
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
    }
}

async function allowances(id) {
    const allowances = await getAllowances(id);

    if(!allowances){
        return;
    }
    //TO-DO colocar o motivo = atestado / afastamento
    await sleep(1000);
    for(const allowance of allowances){
        body = document.getElementById(`${allowance.date}`);
        
        if(allowance.all_day == "Sim") {
            body.textContent = "Abono para o dia todo";
            body.style.color = "orange";
            total_hours_positive.push(shift_time);
        } else {
            const hr = document.createElement('hr');
            hr.style.width = '50%';
            body.append(hr);

            const p = document.createElement('p');
            p.style.color = "orange";
            const p2 = document.createElement('p');
            p2.style.color = "orange";

            p.textContent += `${allowance.start_time}`;
            p2.textContent += `${allowance.end_time}`;
            body.append(p)
            body.append(p2)
        }
    };
}
