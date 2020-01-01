dateConverter = () => {
  let date = Date();
  const months = {
    Jan: 1,
    Feb: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    Aug: 8,
    Sept: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
  };
  date = date.split(" ");
  let finalDate = [];
  finalDate.push(date[3]);
  if (date[1] in months) {
    date[1] = months[date[1]];
  }
  finalDate.push(date[1]);
  finalDate.push(date[2]);
  return finalDate.join("");
};

console.log(dateConverter());
