import vinHistory from "./VinHistory";
import Ui from "./Ui";
import CarData from "./Interfaces";

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
      const paragrafVin: HTMLElement = document.createElement("p");
      const HeaderHistoryVin: HTMLElement = document.createElement("div");
      HeaderHistoryVin.className = "vinHistory-test";
      HeaderHistoryVin.setAttribute("id", vin);
      const vinDescribeHeader = document.createTextNode(`${vin}`);

      const aEl: HTMLElement = document.createElement("a");
      aEl.className = "delete";
      const deleteDescribe = document.createTextNode("x");

      HeaderHistoryVin.addEventListener("mousedown", (e) =>
        this.handleMouseDownListElem(e)
      );

      paragrafVin.appendChild(vinDescribeHeader);
      aEl.appendChild(deleteDescribe);

      if (this.listVinEl) {
        this.listVinEl.appendChild(li);
        li.appendChild(HeaderHistoryVin);
        HeaderHistoryVin.appendChild(paragrafVin);
        paragrafVin.after(aEl);
      }
    });
  };
  handleMouseDownListElem = (e: Event) => {
    console.log(e);
    let id = (e.target as Element).id;
    console.log(id);

    console.log(id);
    let testduba: Array<object> = new vinHistory().handleVinsFromLocal();
    console.log(testduba);

    const catchElemList: Array<object> = testduba.filter(
      (el: any) => el.vin == id
    );

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
