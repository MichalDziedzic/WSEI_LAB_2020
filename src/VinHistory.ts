// import Ui from "./Ui";

// console.log(" działą w pliku  z klasa infoVin");
// //1GNALDEK9FZ108495 example number vin

export default class VinHistory {
  public saveItemToLocalStorage = (vinCode: string, data: object) => {
    // const items = { ...localStorage };
    // Object.entries(items).forEach(([key, value]) => {
    //   if (vinCode === key) {
    //     console.log(`${key} chujowo!`);
    //     return false;
    //   } else {
    //     console.log(`${key} ok!`);
    //   }
    // });
    localStorage.setItem(vinCode, JSON.stringify(data));
  };

  getItemsFromLocalStorage = () => {
    const items = { ...localStorage };
    //console.log(items);
    let tabtest: Array<object> = [];

    if (items.length != 0) {
      Object.entries(items).forEach(([key, value]) => {
        tabtest.push(JSON.parse(value));
      });
      return tabtest;
    } else {
      return [];
    }
  };
}
