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
    if (items.length != 0) {
      for (const [key, value] of Object.entries(items)) {
        console.log(key, value);
        console.log("w vinHistory " + JSON.parse(value));
        //const testUIHIS = new HistoryUI();
        //testUIHIS.DisplayVinHeader(JSON.parse(value));
        return JSON.parse(value);
      }
    } else {
      return false;
    }
  };
}
