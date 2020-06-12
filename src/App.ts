import Api from "./Api";
import VinHistory from "./VinHistory";
import HistoryUI from "./VinHistoryUI";
import Ui from "./Ui";
import CarData from "./VinHistoryUI";

interface ApiObject {
  engine: string;
  make: string;
  manufacturer: string;
  model: string;
  transmission: string;
  trim: string;
  year: number;
  vin: string;
  img: string;
}

interface App {
  btnCheck: HTMLElement | null;
  vinCodeEl: HTMLInputElement | null;
  vinCode: string | null | undefined;
  vin: string | null;
  VinHistory: VinHistory;
  HistoryUi: HistoryUI;
  testDuba: object | ApiObject;
}
class App {
  constructor() {
    // this.Api=new Api();
    (this.btnCheck = document.querySelector(".checkBtn")),
      (this.vinCodeEl = document.querySelector("input[name=vinCode]")),
      (this.vin = null),
      (this.vinCode = ""),
      (this.testDuba = {}),
      (this.VinHistory = new VinHistory());
    this.HistoryUi = new HistoryUI();
    this.handleDataFromLocal();
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
    if (this.vinCode) {
      let API = new Api(this.vinCode);

      API.handleVinInfo("img");
      API.handleVinInfo("maintanceList");
      API.handleVinInfo("carData");

      setTimeout(() => {
        console.log(API.testDuba);
        new Ui(API.testDuba as ApiObject);
        this.saveDataToLocal(API.testDuba);
      }, 1500);
    }

    (<HTMLInputElement>document.querySelector("input[name=vinCode]")).value =
      "";
  };

  handleDataFromLocal = () => {
    const testData: CarData[] = this.VinHistory.handleVinsFromLocal() as CarData[];

    if (testData) {
      this.HistoryUi.DisplayVinHeader(testData);
    } else {
      console.log("your histry vin not found!");
    }
  };
  saveDataToLocal = (data: object) => {
    if (this.vinCode) {
      let test1: boolean = this.VinHistory.saveItemToLocalStorage(
        this.vinCode,
        data
      );
      // console.log({ test1 }, "bagnoo");

      if (test1 === true) {
        throw new Error("your car  stay in  localstorage");
      } else {
        this.HistoryUi.ClearVinHistoryList();
        this.handleDataFromLocal();
      }
    }
  };
}

new App();
