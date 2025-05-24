export const priceFormatter = (price: number) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  const formattedPrice = formatter.format(price);

  return formattedPrice;
}
