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

    this.handleVinInfo("img");

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
        authorization: "Basic ZTY2YzE0ZDgtMDYzMS00NDM0LTlkMDMtY2JmNzJiZjkwMDkz", //"Basic N2U4ZDIwNDAtM2ZiZi00N2RlLTljYzgtZDNlYTI0OWM5NTBm", //"Basic ZDIwMjE3OTMtNzM1Zi00YzIyLWI2NmEtNWRiZjRkMmIyMDEy", //"Basic N2U4ZDIwNDAtM2ZiZi00N2RlLTljYzgtZDNlYTI0OWM5NTBm", // ,"Basic NWYwYThhNWEtYjAxMy00YTQwLWFhZWUtZTM5OTQzNzJkZmU4", "Basic N2U4ZDIwNDAtM2ZiZi00N2RlLTljYzgtZDNlYTI0OWM5NTBm", //"Basic ZGRiZTVlZDAtYTM2Ni00NzVjLWFlOWItNTZhMGU4MWQ3Zjhj", //"Basic OGQ5NzM4ZmQtZDg3Yi00MzU4LWI2NzItOWJlZmI3YTE0ZTYz",
        "partner-token": "41b91927b6104c9199daf05ff511368f", // "63e713fbbc4a4532b1e5edd6f25f39a3", // "543fafc5bd9b472ea5d6614e0b9a56d1", //"63e713fbbc4a4532b1e5edd6f25f39a3", "c0937ea58143414796ec5c98cbb9bfd8", //"fe1708c8fbc94a29a7885e04c837da04",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const { data, message } = response;

        switch (param) {
          case "img":
            this.testDuba = this.mergeObjectData(
              { img: data.image },
              this.testDuba
            ) as object;

            break;
          case "maintanceList":
            this.testDuba = this.mergeObjectData(data, this.testDuba) as object;
            break;
          case "carData":
            this.testDuba = this.mergeObjectData(this.testDuba, data) as object;

            this.newGetRapportEl();
            this.handleClickDetails();
            break;
        }
        this.testDuba = this.mergeObjectData(this.testDuba, {
          vin: this.vinCode,
        }) as object;

        this.saveToLocalStorage(this.testDuba);
        if (this.testDuba) new Ui(this.testDuba);
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
