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
    // console.log(this.data);
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

    // if (this.mainIsCreated != null && this.mainIsCreated != undefined) {
    //   this.updateData();
    // } else {
    //   this.printData();
    // }

    const aside: HTMLElement | null = document.querySelector("aside");
    const main: HTMLElement = document.createElement("main");

    const headerRaport: HTMLElement = document.createElement("div");
    const mainRaport: HTMLElement = document.createElement("div");
    const infoRaport: HTMLElement = document.createElement("div");
    const imgRaport: HTMLElement = document.createElement("div");
    const detailsRaport: HTMLElement = document.createElement("div");
    const ContainerDetailsRaport: HTMLElement = document.createElement("div");
    const nameCarHeader: HTMLElement = document.createElement("h3");
    const infoRaportWrapper: HTMLElement = document.createElement("div");

    const vinLocationIMG: HTMLElement = document.createElement("img");

    headerRaport.className = "headerRaport";
    mainRaport.className = "mainRaport";
    infoRaport.className = "infoRaport";
    imgRaport.className = "imgRaport";
    ContainerDetailsRaport.className = "ContainerDetailsRaport";
    nameCarHeader.className = "NameCarHeader";
    infoRaportWrapper.className = "infoRaportWrapper";

    detailsRaport.className = "detailsRaport";
    vinLocationIMG.className = "vinImg";
    const imgSrc: string = `../IMG/vinLocation.png`;
    const describeBtn: string = `POKAŻ SZCZEGÓŁY `;
    const btnDetails: string = `<button class="detailsBtn">
    <span>${describeBtn}<i class="fas fa-check"></i></span>
    </button>`;
    nameCarHeader.innerText = `${make} ${model}`;
    infoRaportWrapper.innerHTML = `<ul>
    <li>${vin}</li>
      <li>${make}</li>
      <li><i class='fas fa-industry'></i>${manufacturer}</li>
      <li><i class="fas fa-car"></i>${model}</li>
      <li><img src='./IMG/car.png' alt='car_transmission' height='100px' width='100px'>${transmission}</li>
      <li><i class="fas fa-code-branch"></i>equipment ${trim}</li>
      <li><i class="fas fa-calendar-alt"></i>${year}</li>
      </ul>`;
    //`<img src='../IMG/car.png' alt='carv_service' id='carServices'>`
    if (aside != null) {
      aside.before(main);
      main.appendChild(headerRaport);
      headerRaport.after(mainRaport);
      mainRaport.appendChild(infoRaport);
      infoRaport.after(imgRaport);
      mainRaport.after(detailsRaport);

      infoRaport.appendChild(nameCarHeader);
      nameCarHeader.after(infoRaportWrapper);

      detailsRaport.innerHTML = btnDetails;
      imgRaport.appendChild(vinLocationIMG);
      main.after(ContainerDetailsRaport);

      headerRaport.innerHTML = `<p>TWÓJ RAPORT POJAZDU</p><i class='fas fa-info-circle'></i>`;

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

    let infoRaportWrapper: HTMLElement | null = document.querySelector(
      ".infoRaportWrapper"
    );
    let nameCarHeader: HTMLElement | null = document.querySelector(
      ".NameCarHeader"
    );

    if (infoRaportWrapper && nameCarHeader) {
      nameCarHeader.innerText = `${make} ${model}`;
      infoRaportWrapper.innerHTML = `<ul>
        <li>${vin}</li>
          <li><i class='fas fa-industry'></i>${manufacturer}</li>
          <li><i class="fas fa-car"></i>${model}</li>
          <li><img src='./IMG/car.png' alt='car_transmission' height='100px' width='100px'>${transmission}</li>
          <li><i class="fas fa-code-branch"></i>equipment ${trim}</li>
          <li><i class="fas fa-calendar-alt"></i>${year}</li>
          </ul>`;
    }
    const imgLocation: HTMLImageElement | null = document.querySelector(
      ".vinImg"
    );
    imgLocation ? imgLocation.setAttribute("src", img) : null;
  };
}
