export default function validateCPF(cpf: string): boolean {
  if (cpf.length !== 11 && cpf.length !== 14) return false;

  let cpfStr = cpf;

  if (cpf.length === 14) cpfStr = cpf.replaceAll(/\.|-/g, ""); // remove dots and strafes

  if (isInvalidKnownCPF(cpfStr)) return false;

  let firstDigitValues: number[] = [];

  for (let i = 0; i < cpfStr.length - 2; i++) {
    firstDigitValues.push(Number(cpfStr[i]) * (10 - i));
  }

  let firstValuesRest = firstDigitValues.reduce((acc, curr) => acc + curr) % 11;
  let firstDigitSubtraction = 11 - firstValuesRest;
  let firstDigit = firstDigitSubtraction > 9 ? 0 : firstDigitSubtraction;

  if (Number(cpfStr[9]) !== firstDigit) return false;

  let secondDigitValues: number[] = [];

  for (let i = 0; i < cpfStr.length - 1; i++) {
    secondDigitValues.push(Number(cpfStr[i]) * (11 - i));
  }

  let secondValuesRest = secondDigitValues.reduce((acc, curr) => acc + curr) % 11;
  let secondDigitSubtraction = 11 - secondValuesRest;
  let secondDigit = secondDigitSubtraction > 9 ? 0 : secondDigitSubtraction;

  return Number(cpfStr[10]) === secondDigit;
}

function isInvalidKnownCPF(cpf: string) {
  switch (cpf) {
    case "00000000000":
    case "11111111111":
    case "22222222222":
    case "33333333333":
    case "44444444444":
    case "55555555555":
    case "66666666666":
    case "77777777777":
    case "88888888888":
    case "99999999999":
      return true;

    default:
      return false;
  }
}
