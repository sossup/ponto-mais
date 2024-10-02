function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function sleep(milliseconds){
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function hoursDiff(hour1, hour2) {
    const minutes1 = forMinutes(hour1);
    const minutes2 = forMinutes(hour2);

    // Calcula a diferença
    const diff = minutes1 - minutes2;

    // Converte a diferença de volta para "hh:mm"
    const absDiff = Math.abs(diff);
    const hours = Math.floor(absDiff / 60).toString().padStart(2, '0');
    const minutes = (absDiff % 60).toString().padStart(2, '0');

    const result = `${hours}:${minutes}`;
    return {
        "hours": result,
        "status": diff >= 0 ? "positive" : "negative"
    }
}

function forMinutes(hour) {
    const [hours, minutes] = hour.split(':').map(Number);
    return hours * 60 + minutes;
}

function hoursSum(hoursArray) {
    let totalMinutes = 0;

    hoursArray.forEach(hour => {
        totalMinutes += forMinutes(hour);
    });

    const hours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
    const minutes = (totalMinutes % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}