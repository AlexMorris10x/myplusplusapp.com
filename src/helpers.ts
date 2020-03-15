export const orderProjects = (projects: any) => {
  // return projects;
  // error catching
  if (projects === undefined || projects.length === 0) {
    return projects;
  }
  //
  let newArr: any = [];
  let orderObj: any = {};
  for (let project of projects) {
    orderObj[project.order] = project;
  }
  let finder: any = orderObj["null"]._id;
  newArr.push(orderObj["null"]);
  delete orderObj["null"];
  for (let project in orderObj) {
    newArr.unshift(orderObj[finder]);
    finder = orderObj[finder]._id;
  }
  return newArr;
};
