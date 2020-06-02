export default class Ui {
  data: object;
  mainIsCreated: HTMLElement | null;

  constructor(data: object) {
    (this.data = data), (this.mainIsCreated = document.querySelector("main"));
    if (this.mainIsCreated != null && this.mainIsCreated != undefined) {
      this.updateData();
    } else {
      this.printData();
    }
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
      year,
      vin,
      img,
    } = this.data;

    const aside: HTMLElement | null = document.querySelector("aside");
    const main: HTMLElement = document.createElement("main");

    const headerRaport: HTMLElement = document.createElement("div");
    const mainRaport: HTMLElement = document.createElement("div");
    const infoRaport: HTMLElement = document.createElement("div");
    const imgRaport: HTMLElement = document.createElement("div");
    const detailsRaport: HTMLElement = document.createElement("div");
    const ContainerDetailsRaport: HTMLElement = document.createElement("div");

    const elemHeaderRaport: HTMLElement = document.createElement("h3");
    const vinLocationIMG: HTMLElement = document.createElement("img");

    headerRaport.className = "headerRaport";
    mainRaport.className = "mainRaport";
    infoRaport.className = "infoRaport";
    imgRaport.className = "imgRaport";
    ContainerDetailsRaport.className = "ContainerDetailsRaport";

    detailsRaport.className = "detailsRaport";
    vinLocationIMG.className = "vinImg";
    const imgSrc: string = `../IMG/vinLocation.png`;
    const describeBtn: string = `POKAŻ SZCZEGÓŁY `;
    const btnDetails: string = `<button class="detailsBtn">
    <span>${describeBtn}<i class="fas fa-check"></i></span>
    </button>`;

    infoRaport.innerHTML = `<ul>
    <li>${vin}</li>
    <li>${engine}</li>
    <li>${make}</li>
    <li>${manufacturer}</li>
    <li>${model}</li>
    <li>${transmission}</li>
    <li>${trim}</li>
    <li>${year}</li>
    </ul>`;

    if (aside != null) {
      aside.before(main);
      main.appendChild(headerRaport);
      headerRaport.after(mainRaport);
      mainRaport.appendChild(infoRaport);
      infoRaport.after(imgRaport);
      mainRaport.after(detailsRaport);
      detailsRaport.innerHTML = btnDetails;
      imgRaport.appendChild(vinLocationIMG);
      main.after(ContainerDetailsRaport);
      headerRaport.appendChild(elemHeaderRaport);
      elemHeaderRaport.innerText = "TWÓJ RAPORT POJAZDU";

      const imgLocation: HTMLImageElement | null = document.querySelector(
        ".vinImg"
      );
      if (imgLocation != null) {
        // console.log("testImg");
        imgLocation.setAttribute("src", img);
      }
    }
  };
  updateData = () => {
    //console.log(this.data);
    const {
      engine,
      make,
      manufacturer,
      model,
      transmission,
      trim,
      year,
      vin,
      img,
    } = this.data;

    let infoRaport: HTMLElement | null = document.querySelector(".infoRaport");
    if (infoRaport) {
      infoRaport.innerHTML = `<ul>
        <li>${vin}</li>
          <li>${engine}</li>
          <li>${make}</li>
          <li>${manufacturer}</li>
          <li>${model}</li>
          <li>${transmission}</li>
          <li>${trim}</li>
          <li>${year}</li>
          </ul>`;
    }
  };
}
