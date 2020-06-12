import vinHistory from "./VinHistory";
import Ui from "./Ui";
interface ApiObject {
  engine: string;
  make: string;
  manufacturer: string;
  model: string;
  transmission: string;
  trim: string;
  year: number;
  vin: string;
  img: string;
}
export default interface CarData {
  [index: number]: {
    engine: string;
    make: string;
    manufacturer: string;
    model: string;
    transmission: string;
    trim: string;
    year: number;
    vin: string;
    img: string;
  };
}
export default class VinHistoryUI {
  listVinEl: HTMLElement | null;
  ElemHistoryVin: null | NodeListOf<Element>;
  constructor() {
    this.listVinEl = document.querySelector(".hitoryVin-Bar");
    this.ElemHistoryVin = null;
  }
  DisplayVinHeader = (HistoryVin: CarData[]) => {
    HistoryVin.map((el) => {
      const { vin } = el;
      const li: HTMLElement = document.createElement("li");
      const shortDescVin: HTMLElement = document.createElement("p");
      const HeaderHistoryVin: HTMLElement = document.createElement("div");
      HeaderHistoryVin.addEventListener("mousedown", (e) =>
        this.handleMouseDownListElem(e)
      );

      shortDescVin.innerHTML = "testVin-HISTORY";
      HeaderHistoryVin.className = "vinHistory-test";
      HeaderHistoryVin.setAttribute("id", vin);

      if (this.listVinEl) {
        this.listVinEl.appendChild(li);
        HeaderHistoryVin.innerHTML = ` <p>${vin}</p><a href='usun'>X</a>`;
        li.appendChild(HeaderHistoryVin);
      }
    });
  };
  handleMouseDownListElem = (e: Event) => {
    console.log(e);
    let id = (e.target as Element).id;
    console.log(id);

    console.log(id);
    let testduba: Array<object> = new vinHistory().getItemsFromLocalStorage();
    console.log(testduba);

    const catchElemList: Array<object> = testduba.filter((el) => el.vin == id);

    catchElemList.map((el) => new Ui(el));
  };
  ClearVinHistoryList = () => {
    let menuList: HTMLElement | null = document.querySelector(".hitoryVin-Bar");
    if (menuList != null) {
      while (menuList.firstChild) {
        menuList.removeChild(menuList.firstChild);
      }
    }
  };
}
