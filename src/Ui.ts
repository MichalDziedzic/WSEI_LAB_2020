export default class Ui {
  data: object;

  constructor(data: object) {
    this.data = data;
    this.printData();
  }
  printData = () => {
    console.log(this.data);
    const main: HTMLElement = document.createElement("main");

    const headerRaport: HTMLElement = document.createElement("div");
    const mainRaport: HTMLElement = document.createElement("div");
    const infoRaport: HTMLElement = document.createElement("div");
    const imgRaport: HTMLElement = document.createElement("div");
    const detailsRaport: HTMLElement = document.createElement("div");

    const elemHeaderRaport: HTMLElement = document.createElement("h3");

    headerRaport.className = "headerRaport";
  };
}
