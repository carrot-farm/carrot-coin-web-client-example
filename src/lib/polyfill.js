// ===== 정수인지 확인.
/*
  실수, 무한 등을 확인할 때 유용한다.
*/
Number.isInteger =
  Number.isInteger ||
  function(value) {
    return (
      typeof value === "number" &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  };
