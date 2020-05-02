import InfoVin from "./InfoVin";
import Ui from "./Ui";

class App {
  btnCheck: HTMLElement | null;
  vinCodeEl: HTMLInputElement | null;
  vinCode: string | null | undefined;
  vin: string | null;

  constructor() {
    (this.btnCheck = document.querySelector(".checkBtn")),
      (this.vinCodeEl = document.querySelector("input[name=vinCode]")),
      (this.vin = null),
      (this.vinCode = "");
    this.startAppEvent();
    this.getItemsFromLocalStorage();
  }
  startAppEvent = () => {
    if (this.btnCheck) {
      if (this.vinCodeEl != null) {
        this.vinCodeEl.addEventListener<"keyup">("keyup", () =>
          this.handleKeyUp()
        );
        this.btnCheck.addEventListener<"click">("click", () =>
          this.handleClickCheck()
        );
      } else {
        throw new Error("vin not found");
      }
    } else {
      throw new Error("Button not found");
    }
  };

  handleKeyUp = () => {
    this.vinCodeEl?.value.toUpperCase();
  };
  handleClickCheck = () => {
    this.vinCode = this.vinCodeEl?.value;

    console.log("chodzi" + this.vinCode);

    this.handleVinInfo();

    (<HTMLInputElement>document.querySelector("input[name=vinCode]")).value =
      "";
  };

  handleVinInfo = (): void => {
    const dataExample: object = {
      manufacturer: "Genral-Motors",
      make: "Mazda",
      model: "mx-5",
      engine: "2,4",
      transmission: "AUTOMATIC",
      trim: 127546,
      fuel: "gas",
      year: 2015,
      vinNum: this.vinCode,
    };
    new Ui(dataExample);
    fetch(`http://api.carmd.com/v3.0/decode?vin=${this.vinCode}`, {
      method: "GET",
      headers: {
        authorization: "Basic OGQ5NzM4ZmQtZDg3Yi00MzU4LWI2NzItOWJlZmI3YTE0ZTYz",
        "partner-token": "fe1708c8fbc94a29a7885e04c837da04",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.saveToLocalStorage(data);
        new Ui(data);
      })
      .catch((err) => {
        console.log(err);
        return new Error("sry api not works");
      });
  };
  saveToLocalStorage = (data: object) => {
    if (this.vinCode) localStorage.setItem(this.vinCode, JSON.stringify(data));
  };
  getItemsFromLocalStorage = () => {
    const items = { ...localStorage };

    for (const [key, value] of Object.entries(items)) {
      console.log(key, value);
      console.log(JSON.parse(value));
    }
  };
}

new App();
