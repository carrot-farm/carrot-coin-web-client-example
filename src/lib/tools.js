// ===== 날짜 포맷
export const dateFormat = (_date, _format) => {
  const date = _date || new Date();
  const format = _format || "yyyy-MM-dd";
  if (format === "yyyy-MM-dd") {
    return (
      date.getFullYear() +
      "-" +
      addZero(date.getMonth() + 1, 2) +
      "-" +
      addZero(date.getDate(), 2)
    );
  }
};

// ===== 제로
export const addZero = (n, digits) => {
  let zero = "";
  n = n.toString();
  if (n.length < digits) {
    for (let i = 0; i < digits - n.length; i++) {
      zero += "0";
    }
  }
  return zero + n;
};
