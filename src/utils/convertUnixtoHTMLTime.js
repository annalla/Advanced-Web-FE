export const convertUnixToHTMLTime = (unixTime) => {
    // Timing to renew access token
    const date = new Date(unixTime * 1000);
    const year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    // if month length = 1 => plus 0 front
    // example: month = 8 => month => 08
    if (month.toString().length === 1)
        (month = '0' + month);
    if (day.toString().length === 1)
        (day = '0' + day);
    return year + "-" + month + "-" + day;
  };