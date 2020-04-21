const btnCheck: HTMLElement | null = document.querySelector(".checkBtn");
let vinCodeEl: HTMLElement | null = document.querySelector(
  "input[name=vinCode]"
);

if (btnCheck) {
  if (vinCodeEl != null) {
    btnCheck.addEventListener<"click">("click", (e) => {
      const vin: string = (<HTMLInputElement>(
        document.querySelector("input[name=vinCode]")
      )).value;
      console.log(vin);

      (<HTMLInputElement>document.querySelector("input[name=vinCode]")).value =
        "";
    });
  } else {
    throw new Error("vin not found");
  }
} else {
  throw new Error("Button not found");
}
