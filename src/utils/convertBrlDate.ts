export const ConvertDate = (dateStr: string) => {
  const dateArray = dateStr.split('-');
  return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
};
