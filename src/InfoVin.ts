console.log(" działą w pliku  z klasa infoVin");
export default class InfoVin {
  vin: string;

  constructor(vin: string) {
    this.vin = vin;
    this.showVin();
  }

  showVin = () => {
    fetch("http://api.carmd.com/v3.0/decode?vin=1GNALDEK9FZ108495", {
      method: "GET",
      headers: {
        undefinedaccept: "application/json",
        "accept-encoding": "gzip,deflate",
        "accept-language": "en-US,en;q=0.8",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
        authorization: "Basic OGQ5NzM4ZmQtZDg3Yi00MzU4LWI2NzItOWJlZmI3YTE0ZTYz",
        "partner-token": "fe1708c8fbc94a29a7885e04c837da04",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
