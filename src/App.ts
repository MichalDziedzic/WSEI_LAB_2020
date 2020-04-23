import InfoVin from "./InfoVin";

console.log("dziala w pliku app js");
const btnCheck: HTMLElement | null = document.querySelector(".checkBtn");
let vinCodeEl: HTMLElement | null = document.querySelector(
  "input[name=vinCode]"
);

console.log(" działa  infoVin");

if (btnCheck) {
  if (vinCodeEl != null) {
    btnCheck.addEventListener<"click">("click", (e) => {
      const vin: string = (<HTMLInputElement>(
        document.querySelector("input[name=vinCode]")
      )).value;
      console.log("chodzi" + vin);

      const checkVin: object | null = new InfoVin(vin);

      (<HTMLInputElement>document.querySelector("input[name=vinCode]")).value =
        "";
    });
  } else {
    throw new Error("vin not found");
  }
} else {
  throw new Error("Button not found");
}
