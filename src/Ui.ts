export default class Ui {
  data: object;

  constructor(data: object) {
    this.data = data;
    this.printData();
  }
  printData = () => {
    console.log(this.data);
    const {
      engine,
      make,
      manufacturer,
      model,
      transmission,
      trim,
      years,
    } = this.data;

    const aside: HTMLElement | null = document.querySelector("aside");
    const main: HTMLElement = document.createElement("main");

    const headerRaport: HTMLElement = document.createElement("div");
    const mainRaport: HTMLElement = document.createElement("div");
    const infoRaport: HTMLElement = document.createElement("div");
    const imgRaport: HTMLElement = document.createElement("div");
    const detailsRaport: HTMLElement = document.createElement("div");

    const elemHeaderRaport: HTMLElement = document.createElement("h3");
    const vinLocationIMG: HTMLElement = document.createElement("img");

    headerRaport.className = "headerRaport";
    mainRaport.className = "mainRaport";
    infoRaport.className = "infoRaport";
    imgRaport.className = "imgRaport";
    vinLocationIMG.className = "vinImg";
    const imgSrc: string = `../IMG/vinLocation.png`;

    infoRaport.innerHTML = `<ul>
    <li>${engine}</li>
    <li>${make}</li>
    <li>${manufacturer}</li>
    <li>${model}</li>
    <li>${transmission}</li>
    <li>${trim}</li>
    <li>${years}</li>
    </ul>`;

    if (aside != null) {
      aside.before(main);
      main.appendChild(headerRaport);
      headerRaport.after(mainRaport);
      mainRaport.appendChild(infoRaport);
      infoRaport.after(imgRaport);
      mainRaport.after(detailsRaport);
      imgRaport.appendChild(vinLocationIMG);
      headerRaport.appendChild(elemHeaderRaport);
      elemHeaderRaport.innerText = "TWÓJ RAPORT POJAZDU";

      const imgLocation: HTMLImageElement | null = document.querySelector(
        ".vinImg"
      );
      if (imgLocation != null) {
        console.log("testImg");
        imgLocation.setAttribute("src", "../IMG/vinLocation.png");
      }
    }
  };
}
