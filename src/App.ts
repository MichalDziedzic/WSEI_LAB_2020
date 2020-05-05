import InfoVin from "./InfoVin";
import Ui from "./Ui";

class App {
  btnCheck: HTMLElement | null;
  btnDetailsRaport: HTMLElement | null;
  ContainerDetailsRaport: HTMLElement | null;
  vinCodeEl: HTMLInputElement | null;
  vinCode: string | null | undefined;
  vin: string | null;
  testDuba: object;

  constructor() {
    (this.btnCheck = document.querySelector(".checkBtn")),
      (this.ContainerDetailsRaport = document.querySelector(
        ".ContainerDetailsRaport"
      )),
      (this.btnDetailsRaport = document.querySelector(".detailsBtn")),
      (this.vinCodeEl = document.querySelector("input[name=vinCode]")),
      (this.vin = null),
      (this.vinCode = ""),
      (this.testDuba = {}),
      this.startAppEvent();
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
  validationInput = () => {};
  handleKeyUp = () => {
    this.vinCodeEl?.value.toUpperCase();
  };
  handleClickCheck = () => {
    if (this.vinCodeEl) {
      const vinCodeUpper: string = this.vinCodeEl.value.toUpperCase();
      if (
        vinCodeUpper.length == 17 &&
        vinCodeUpper.indexOf(" ") == -1 &&
        vinCodeUpper.indexOf("I") == -1 &&
        vinCodeUpper.indexOf("O") == -1 &&
        vinCodeUpper.indexOf("Q") == -1
      ) {
        this.vinCode = this.vinCodeEl?.value;
      } else {
        throw new Error("inncorect vin format");
      }
    }

    console.log("chodzi" + this.vinCode);
    this.handleVinInfo("img");
    //
    this.handleVinInfo("maintanceList");
    this.handleVinInfo("carData");

    (<HTMLInputElement>document.querySelector("input[name=vinCode]")).value =
      "";
  };
  handleClickDetails = () => {
    if (this.btnDetailsRaport) {
      this.btnDetailsRaport.addEventListener<"click">("click", () =>
        this.handleClickDetailsRaport()
      );
    }
  };
  mergeObjectData = (data: object, data1: object) => {
    return Object.assign({}, data, data1);
  };
  handleClickDetailsRaport = () => {
    this.ContainerDetailsRaport?.setAttribute("style", `display:flex`);
  };
  newGetRapportEl = () => {
    this.btnDetailsRaport = document.querySelector(".detailsBtn");

    this.ContainerDetailsRaport = document.querySelector(
      ".ContainerDetailsRaport"
    );
  };

  handleVinInfo = (param: string): void => {
    const apiArray: Array<string> = [
      "http://api.carmd.com/v3.0/image?vin",
      "http://api.carmd.com/v3.0/maintlist?vin",
      "http://api.carmd.com/v3.0/decode?vin",
    ];

    let test: string = "";

    switch (param) {
      case "img":
        test = apiArray[0];
        break;
      case "maintanceList":
        test = apiArray[1];
        break;
      case "carData":
        test = apiArray[2];
        break;
    }

    fetch(`${test}=${this.vinCode}`, {
      method: "GET",
      headers: {
        authorization: "Basic OGQ5NzM4ZmQtZDg3Yi00MzU4LWI2NzItOWJlZmI3YTE0ZTYz",
        "partner-token": "fe1708c8fbc94a29a7885e04c837da04",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const { data, message } = response;
        console.log(response);
        // this.testDuba = this.mergeObjectData(data, this.testDuba) as object;
        // console.log(`test dubatest to : ${this.testDuba}`);
        switch (param) {
          case "img":
            this.testDuba = this.mergeObjectData(
              { image: data.image },
              this.testDuba
            ) as object;
            console.log("wszystko jasne" + this.testDuba);
            break;
          case "maintanceList":
            //this.testDuba = this.mergeObjectData(data, this.testDuba) as object;
            break;
          case "carData":
            this.testDuba = this.mergeObjectData(data, {
              vin: this.vinCode,
            }) as object;
            this.saveToLocalStorage(this.testDuba);
            if (this.testDuba) new Ui(this.testDuba);

            this.newGetRapportEl();
            this.handleClickDetails();
            break;
        }
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
