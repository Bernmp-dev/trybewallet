const API = 'https://economia.awesomeapi.com.br/json/all';

const currencies = async () => {
  const response = await (await fetch(API)).json();
  const fixResp = Object.keys(response)
    .filter((item) => item !== 'USDT');
  return fixResp;
};

export default currencies;
