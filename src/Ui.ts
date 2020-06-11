interface ApiObject {
  engine: string;
  make: string;
  manufacturer: string;
  model: string;
  transmission: string;
  trim: string;
  year: string;
  vin: string;
  img: string;
}

interface CarData {
  data: ApiObject;
  mainIsCreated: HTMLElement | null;
}

type htmlElem = HTMLElement | null | HTMLButtonElement;

export default class Ui {
  data: ApiObject;
  mainIsCreated: htmlElem;

  constructor(data: ApiObject) {
    (this.data = data), (this.mainIsCreated = document.querySelector("main"));
    if (this.mainIsCreated != null && this.mainIsCreated != undefined) {
      this.updateData();
    } else {
      this.printData();
    }
  }
  createElem = (elem: string): HTMLElement => document.createElement(`${elem}`);
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

    const aside: htmlElem = document.querySelector("aside");
    const main: htmlElem = this.createElem("main");

    const headerRaport: htmlElem = this.createElem("div");
    const mainRaport: htmlElem = this.createElem("div");
    const infoRaport: htmlElem = this.createElem("div");
    const imgRaport: htmlElem = this.createElem("div");
    const detailsRaport: htmlElem = this.createElem("div");
    const ContainerDetailsRaport: htmlElem = this.createElem("div");
    const nameCarHeader: htmlElem = this.createElem("h3");
    const infoRaportWrapper: htmlElem = this.createElem("div");
    const detailsBtn: htmlElem = this.createElem("button");

    const vinLocationIMG: htmlElem = this.createElem("img");

    headerRaport.className = "headerRaport";
    mainRaport.className = "mainRaport";
    infoRaport.className = "infoRaport";
    imgRaport.className = "imgRaport";
    ContainerDetailsRaport.className = "ContainerDetailsRaport";
    nameCarHeader.className = "NameCarHeader";
    infoRaportWrapper.className = "infoRaportWrapper";

    detailsRaport.className = "detailsRaport";
    vinLocationIMG.className = "vinImg";
    detailsBtn.className = "detailsBtn";
    detailsBtn.innerHTML = `Check <i class="fas fa-check"></i>`;

    const imgSrc: string = `../IMG/vinLocation.png`;

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

    if (aside != null) {
      aside.before(main);
      main.appendChild(headerRaport);
      headerRaport.after(mainRaport);
      mainRaport.appendChild(infoRaport);
      infoRaport.after(imgRaport);
      mainRaport.after(detailsRaport);

      infoRaport.appendChild(nameCarHeader);
      nameCarHeader.after(infoRaportWrapper);

      detailsRaport.appendChild(detailsBtn);
      imgRaport.appendChild(vinLocationIMG);
      main.after(ContainerDetailsRaport);

      headerRaport.innerHTML = `<p>TWÓJ RAPORT POJAZDU</p><i class='fas fa-info-circle'></i>`;

      detailsBtn.addEventListener("click", () => {
        ContainerDetailsRaport.setAttribute("style", `display:flex`);
      });
      const imgLocation: HTMLImageElement | null = document.querySelector(
        ".vinImg"
      );
      if (imgLocation != null) {
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
