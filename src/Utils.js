export const isAndroid = () => {
  return navigator.userAgent.match('Android');
}

export const isIOS = () => {
  return navigator.userAgent.match('iPad') || navigator.userAgent.match('iPhone') || navigator.userAgent.match('iPod');
}

export const isMobile = () => {
  return (isAndroid() || isIOS()) && window.innerWidth < 1100 ? true : false;
}

export const numberFormat = (amount, decimalCount = 8, decimal = '.', thousands = ',') => {
  if( isNaN(amount) ) amount = 0;
  if( amount >= 1 && amount % 1 === 0 ) decimalCount = 0;
  if( amount == 0 ) decimalCount = 0;
  const negativeSign = amount < 0 ? '-' : '';
  let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
  let j = (i.length > 3) ? i.length % 3 : 0;
  let formatted = negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');
  return formatted;
}
