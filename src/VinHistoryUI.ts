export default class VinHistoryUI {
  listVinEl: HTMLElement | null;
  constructor() {
    this.listVinEl = document.querySelector(".hitoryVin-Bar");
  }

  DisplayVinHeader = (HistoryVin: Array<object>) => {
    HistoryVin.map((el) => {
      const { vin } = el;
      const li: HTMLElement = document.createElement("li");
      const shortDescVin: HTMLElement = document.createElement("p");
      const HeaderHistoryVin: HTMLElement = document.createElement("div");

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
}
