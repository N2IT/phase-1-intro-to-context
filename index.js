// Your code here
// let employeeRecords = []

function createEmployeeRecord(array) {

    let employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    // employeeRecords.push(employeeRecord)
    return employeeRecord
}


function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(employeeData => createEmployeeRecord(employeeData));
}

function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    let timeInObj = {
        type: "TimeIn",
        hour: Number(hour),
        date: date
    }
    employee.timeInEvents.push(timeInObj)
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    let timeOutObj = {
        type: "TimeOut",
        hour: Number(hour),
        date: date
    }
    employee.timeOutEvents.push(timeOutObj)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let timeInEvent = employee.timeInEvents.find(e => e.date === date)
    let timeOutEvent = employee.timeOutEvents.find(e => e.date === date)
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    const wages = employee.payPerHour
    return hours * wages
}

function allWagesFor(employee) {
    // console.log(employee)
    let totalWages = 0
    const dates = employee.timeInEvents.map((e) => {
        let days = e.date
        const wagesEarned = wagesEarnedOnDate(employee, days)
        totalWages += wagesEarned
    })
    return totalWages
}

function calculatePayroll(arrayEmployeeRecords) {
    // console.log(arrayEmployeeRecords)
    let totalPay = 0
    for (const key in arrayEmployeeRecords) {
        const recordEvents = arrayEmployeeRecords[key].timeInEvents
        recordEvents.forEach((e) => {
            let keyDates = e.date
            const dailyWages = wagesEarnedOnDate(arrayEmployeeRecords[key], keyDates)
            totalPay += dailyWages
        })
    }
    return totalPay
}
