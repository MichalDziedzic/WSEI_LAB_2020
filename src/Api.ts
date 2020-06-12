//import CarData from "./VinHistoryUI";
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

export default class Api {
  vin: string;
  testDuba: object;
  constructor(vinCode: string) {
    this.vin = vinCode;
    this.testDuba = {};
    //this.vinsDB = this.handleVinsFromLocal();
  }
  mergeObjectData = (data: object, data1: object) => {
    return Object.assign({}, data, data1);
  };

  handleVinInfo = (param: string): void => {
    const apiArray: string[] = [
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

    fetch(`${test}=${this.vin}`, {
      method: "GET",
      headers: {
        authorization: "Basic YmZkZTkzMWEtNWI4NS00NTg5LTkxYmEtYWVkZjRhMWQzNmZi", //"Basic N2U4ZDIwNDAtM2ZiZi00N2RlLTljYzgtZDNlYTI0OWM5NTBm", //"Basic ZDIwMjE3OTMtNzM1Zi00YzIyLWI2NmEtNWRiZjRkMmIyMDEy", //"Basic N2U4ZDIwNDAtM2ZiZi00N2RlLTljYzgtZDNlYTI0OWM5NTBm", // ,"Basic NWYwYThhNWEtYjAxMy00YTQwLWFhZWUtZTM5OTQzNzJkZmU4", "Basic N2U4ZDIwNDAtM2ZiZi00N2RlLTljYzgtZDNlYTI0OWM5NTBm", //"Basic ZGRiZTVlZDAtYTM2Ni00NzVjLWFlOWItNTZhMGU4MWQ3Zjhj", //"Basic OGQ5NzM4ZmQtZDg3Yi00MzU4LWI2NzItOWJlZmI3YTE0ZTYz",
        "partner-token": "38300df0932f4ae697b9822965d7f129", //"41b91927b6104c9199daf05ff511368f", // "63e713fbbc4a4532b1e5edd6f25f39a3", // "543fafc5bd9b472ea5d6614e0b9a56d1", //"63e713fbbc4a4532b1e5edd6f25f39a3", "c0937ea58143414796ec5c98cbb9bfd8", //"fe1708c8fbc94a29a7885e04c837da04",
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

            break;
        }
        this.testDuba = this.mergeObjectData(this.testDuba, {
          vin: this.vin,
        }) as object;

        if (this.testDuba) {
          //console.log(this.testDuba);
          //   this.saveDataToLocal(this.testDuba);
          //   new Ui(this.testDuba as ApiObject);
        }
      })
      .catch((err) => {
        console.log(err);
        return new Error("sry api not works");
      });
  };
  handleApiData = (): object => {
    return this.testDuba;
  };
}
