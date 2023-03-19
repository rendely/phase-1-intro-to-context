function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(array) {
  return array.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateStamp) {
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0]
  })
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0]
  })
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStamp){
  const timeInEvent = employeeRecord.timeInEvents.find(d => d.date === dateStamp);
  const timeOutEvent = employeeRecord.timeOutEvents.find(d => d.date === dateStamp);
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour)/100;
  return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, dateStamp){
  const hoursWorked = hoursWorkedOnDate(employeeRecord, dateStamp)
  const payPerHour = employeeRecord.payPerHour;
  return payPerHour * hoursWorked;
}

function allWagesFor(employeeRecord){
  const wagesOwed = employeeRecord.timeInEvents.reduce((acc,e) => acc + wagesEarnedOnDate(employeeRecord,e.date),0)
  return wagesOwed;
}

function calculatePayroll(allEmployeeRecords){
  const totalPayroll = allEmployeeRecords.reduce(
    (acc, r) => acc + allWagesFor(r),0
  )
  return totalPayroll;
}