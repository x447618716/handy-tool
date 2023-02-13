export const electron = /^(4026|417500|4405|4508|4844|4913|4917)\d+$/;
export const maestro =
  /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/;
export const dankort = /^(5019)\d+$/;
export const interPayment = /^(636)\d+$/;
export const unionPay = /^(62|88)\d+$/;
export const visa = /^4\d{12}(?:\d{3})?$/;
export const masterCard = /^5[1-5]\d{14}$/;
export const amex = /^3[47][0-9]{13}$/;
export const diners = /^3(?:0[0-5]|[68]\d)\d{11}$/;
export const discover = /^6(?:011|5\d{2})\d{12}$/;
export const jcb = /^(?:2131|1800|35\d{3})\d{11}$/;

export const isElectron = (cardNo: string) => {
  return electron.test(cardNo);
};
export const isMaestro = (cardNo: string) => {
  return maestro.test(cardNo);
};
export const isDankort = (cardNo: string) => {
  return dankort.test(cardNo);
};
export const isInterPayment = (cardNo: string) => {
  return interPayment.test(cardNo);
};
export const isUnionPay = (cardNo: string) => {
  return unionPay.test(cardNo);
};
export const isVisa = (cardNo: string) => {
  return visa.test(cardNo);
};
export const isMasterCard = (cardNo: string) => {
  return masterCard.test(cardNo);
};
export const isAmex = (cardNo: string) => {
  return amex.test(cardNo);
};
export const isDiners = (cardNo: string) => {
  return diners.test(cardNo);
};
export const isDiscover = (cardNo: string) => {
  return discover.test(cardNo);
};
export const isJcb = (cardNo: string) => {
  return jcb.test(cardNo);
};

export default {
    isElectron,
    isMaestro,
    isDankort,
    isInterPayment,
    isUnionPay,
    isVisa,
    isMasterCard,
    isAmex,
    isDiners,
    isDiscover,
    isJcb
}
