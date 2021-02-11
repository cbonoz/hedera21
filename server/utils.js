export function UInt8ToString(array) {
  var str = "";
  for (var i = 0; i < array.length; i++) {
    str += array[i];
  }
  return str;
}

export function secondsToDate(time) {
  var date = new Date(1970, 0, 1);
  date.setSeconds(time.seconds);
  return date;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function handleLog(event, log, status) {
  if (status === "default") {
    console.log(event + " " + log);
  } else if (status === "minimal") {
    console.log(event);
  } else {
    // debug mode. destructure mirror receipts or print a usual log
    if (log.toString() !== log && log["runningHash"] !== undefined) {
      console.log(event);
      console.log("\t message: " + log.toString());
      console.log("\t runningHash: " + UInt8ToString(log["runningHash"]));
      console.log(
        "\t consensusTimestamp: " + secondsToDate(log["consensusTimestamp"])
      );
    } else {
      console.log(event + " " + log);
    }
  }
}
