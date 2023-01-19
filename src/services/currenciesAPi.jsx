const API = 'https://economia.awesomeapi.com.br/json/all';

const currencies = async () => {
  const response = await (await fetch(API)).json();
  return response;
};

export default currencies;
