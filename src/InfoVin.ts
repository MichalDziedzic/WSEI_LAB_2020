import Ui from "./Ui";

console.log(" działą w pliku  z klasa infoVin");
//1GNALDEK9FZ108495 example number vin
export default class InfoVin {
  vin: string;

  constructor(vin: string) {
    this.vin = vin;
    //this.showVin();
  }

  showVin = () => {
    fetch(`http://api.carmd.com/v3.0/decode?vin=${this.vin}`, {
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
        new Ui(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
