/*
  프로젝트와 상관없는 함수들.
*/

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
  } else if (format === "MM-dd") {
    return addZero(date.getMonth() + 1, 2) + "-" + addZero(date.getDate(), 2);
  } else if (format === "HH:mm") {
    return addZero(date.getHours(), 2) + ":" + addZero(date.getMinutes(), 2);
  }
};

// ===== 문자가 몇번 반복되는지 세기
export const repeatCount = (str, delimiter) => {
  return str.split(delimiter).length - 1;
};

// ===== 기준 단위까지 0 추가 .
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

// ===== commset
export const commSet = (_n, useFloat) => {
  let n = useFloat ? parseFloat(_n) : parseInt(_n, 10);
  if (n === 0) return 0;
  var reg = /(^[+-]?\d+)(\d{3})/;
  n = n + "";
  while (reg.test(n)) n = n.replace(reg, "$1" + "," + "$2");
  // console.log(3, n);
  return n;
};

// ===== 콤마 제거
export const unCommSet = (_n, useFloat) => {
  if (useFloat) {
    return parseFloat(_n.replace(/,/g, ""));
  }
  return parseInt(_n.replace(/,/g, ""), 10);
};

// ===== 소수점 지정 자리수 이후 버림
export const decimalFloor = (_n, digits) => {
  let count = Math.pow(10, digits);
  let num = Math.floor(_n * count) / count;
  return num.toFixed(digits);
};

// ===== 소수점 지정 자리수 이후 올림
export const decimalCeil = (_n, digits) => {
  let count = Math.pow(10, digits);
  let num = Math.ceil(_n * count) / count;
  return num.toFixed(digits);
};

// ===== 소수점 지정 자리수 이후 반올림
export const decimalRound = (_n, digits) => {
  let count = Math.pow(10, digits);
  let num = Math.round(_n * count) / count;
  return num.toFixed(digits);
};

// ===== 입력값을 정수와 commset 값으로 변한한다. 반환한다.
/* commset를 제거하고 난뒤에도 NaN이면 undefined를 반환.
  params
    _n(int or str): 입력 숫자. (실수 사용시 소수점의 . 이 포함된 문자도 가능.)
    digits(int): 실수 사용시 제한할 소수점 단위. 기본은 정수.
*/
export const inputCommSet = (_n, digits) => {
  let result = {
    number: 0,
    numberCommSet: "0"
  };
  let type = typeof _n;
  let useFloat = digits ? true : false;
  let number;
  let comm = _n + "";
  let splitDot; // digits설정 시 문자를 잘라서 0을 몇번 허용할 것인지 정한다.
  let passDot = false; // digits 시 dot입력 중인지 확인 후 통과 여부
  let zeroLen = 0; // 0이 반복되는 횟수.

  // console.log("---> tools.inputCommSet (", _n, ",", digits || "", ")");
  // 0을 입력 하거나 삭제해서 "" 이 입력되었을 때 기본값 리턴
  if (_n === "0" || _n === 0 || _n === "") {
    return result;
  } else if (_n === ".") {
    return {
      number: 0,
      numberCommSet: "0."
    };
  }

  if (typeof digits !== "number" && digits !== undefined) {
    throw "digits는 반드시 정수여야 합니다.";
  }

  // 문자일 경우
  if (type === "string") {
    if (digits) {
      useFloat = true;
      number = unCommSet(_n, useFloat);
      number = parseFloat(number, useFloat);
    } else {
      number = unCommSet(_n);
      number = parseInt(number, 10);
    }
    // console.log("> 문자.uncommset: ", number);

    // console.log(
    //   "> 실수문자 점검:",
    //   digits,
    //   _n.substr(_n.length - 1),
    //   repeatCount(_n, ".")
    // );
    // 실수.
    if (digits) {
      number = parseFloat(decimalFloor(number, digits));
      splitDot = _n.split(".");
      // console.log("> splitDot : ", splitDot, _n);
      if (splitDot.length > 1) {
        // 0이 계속 입력 중인지 확인.
        for (let i = 0, len = splitDot[1].length; i < len; i++) {
          // console.log("> splitDot for : ", splitDot[1][i]);
          if (splitDot[1][i] === "0") {
            passDot = true;
            zeroLen++;
          } else {
            passDot = false;
          }
        }
        if (passDot === true && zeroLen > digits) {
          return result;
        }
      }
      if (
        (_n.substr(_n.length - 1) === "." || passDot === true) &&
        repeatCount(_n, ".") === 1
      ) {
        // console.log("|||| dot : ", number, _n);
        return {
          number: number,
          numberCommSet: _n
        };
      }
    }

    if (isNaN(number)) {
      // console.log("|||| 허용하지 않는 문자: ", _n);
      return;
    }

    // console.log("> 문자 pass: ", number, commSet(number, useFloat));
    return {
      number: number,
      numberCommSet: commSet(number, useFloat)
    };
  }

  if (isNaN(_n)) {
    return;
  }

  number = _n;
  // 실수 제한
  if (digits) {
    number = parseFloat(decimalFloor(number, digits));
  }
  // 실수 표시
  if (!Number.isInteger(number)) {
    useFloat = true;
  }

  // console.log("|||| number pass", number, commSet(comm, useFloat));
  return {
    number: number,
    numberCommSet: commSet(comm, useFloat)
  };
};
// console.log("|||| s 0 ", inputCommSet("0"));
// console.log("|||| s ('15') ", inputCommSet("15"));
// console.log("|||| s (0.)", inputCommSet("0."));
// console.log("|||| s (0. , 2)", inputCommSet("0.", 2));
// console.log("|||| ", inputCommSet("15.", 2));
// console.log("|||| s (0. , 2)", inputCommSet("2,000.", 2));
// console.log("|||| ", inputCommSet("2,000.1", 2));
// console.log("|||| ", inputCommSet("2,000.1.", 2));
// console.log("|||| ", inputCommSet("2,000.977", 2));
// console.log("|||| ", inputCommSet("15,351.977", 2));
// console.log("|||| ", inputCommSet("당근ㅇㄹㄹ.", 2));
// console.log("|||| ", inputCommSet("0.", "0.02.2"));
// console.log("|||| ", inputCommSet("0.1"));
// console.log("|||| ", inputCommSet(0));
// console.log("|||| ", inputCommSet(10));
// console.log("|||| ", inputCommSet(0.12));
// console.log("|||| ", inputCommSet(1015144));
// console.log("|||| ", inputCommSet(1015144.123456789));

// ===== 수의 증감률을 계산해준다.
export const calcRatio = (_old, _new, digits = 2) => {
  // (증가한 부분) / 증가하기전 * 100 = %
  return decimalFloor(((_new - _old) / _old) * 100, digits);
};

// ===== json 정렬
export const jsonSort = (list, field, sortDirection) => {
  // console.log("---> jsonSrot: ", list, field, sortDirection);
  if (sortDirection === false) {
    // desc
    return list.sort((a, b) => {
      return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
    });
  }
  // asc
  return list.sort((a, b) => {
    return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
  });
};

// ===== 지정된 필드으 json 전부 찾기
export const jsonFindAll = (_list, field, value) => {
  let list = [];
  let i = 0,
    k = 0,
    len = _list.length;

  for (; i < len; i++) {
    if (_list[i][field] === value) {
      list[k++] = _list[i];
    }
  }
  return list;
};
