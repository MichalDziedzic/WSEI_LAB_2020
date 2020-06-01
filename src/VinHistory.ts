// import Ui from "./Ui";

// console.log(" działą w pliku  z klasa infoVin");
// //1GNALDEK9FZ108495 example number vin
export default class VinHistory {
  constructor() {}

  public saveItemToLocalStorage = (vinCode: string, data: object): void => {
    localStorage.setItem(vinCode, JSON.stringify(data));
  };

  getItemsFromLocalStorage = () => {
    const items = { ...localStorage };
    console.log(items);
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
