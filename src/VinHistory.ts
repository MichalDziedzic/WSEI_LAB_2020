import CarData from "./Interfaces";

export default class VinHistory {
  vinsDB: Object[] | undefined | CarData;
  constructor() {
    this.vinsDB = this.handleVinsFromLocal();
  }
  public saveItemToLocalStorage = (vinCode: string, data: object): boolean => {
    let CopyVinsArray = this.vinsDB as Object[];

    let bagno: boolean = CopyVinsArray.some((el) => el.vin === vinCode);

    if (bagno != true) {
      localStorage.setItem(vinCode, JSON.stringify(data));
    }
    return bagno;
  };

  handleVinsFromLocal = () => {
    const items = { ...localStorage };

    let VinsArrayFromLocal: Object[] = [];

    if (items.length != 0) {
      Object.entries(items).forEach(([key, value]) => {
        VinsArrayFromLocal.push(JSON.parse(value));
      });

      return VinsArrayFromLocal;
    }
  };
}
