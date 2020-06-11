import CarData from "./VinHistoryUI";

// console.log(" działą w pliku  z klasa infoVin");
// //1GNALDEK9FZ108495 example number vin
export default class VinHistory {
  vinsDB: Object[] | undefined | CarData;
  constructor() {
    this.vinsDB = this.handleVinsFromLocal();
    console.log(this.vinsDB);
  }
  public saveItemToLocalStorage = (vinCode: string, data: object): boolean => {
    let CopyVinsArray = this.vinsDB as Object[]; // do zmiany

    let bagno: boolean = CopyVinsArray.some((el) => el.vin === vinCode);

    if (bagno != true) {
      localStorage.setItem(vinCode, JSON.stringify(data));
    }
    return bagno;
  };

  public getItemsFromLocalStorage = () => {
    if (this.vinsDB != undefined) {
      return this.vinsDB;
    } else {
      return [];
    }
  };
  handleVinsFromLocal = () => {
    const items = { ...localStorage };

    let VinsArrayFromLocal: Object[] = [];

    if (items.length != 0) {
      Object.entries(items).forEach(([key, value]) => {
        VinsArrayFromLocal.push(JSON.parse(value)); ////  zamiast push  użycie jakiegos unshift() ?
      });

      return VinsArrayFromLocal;
    }
  };
}
