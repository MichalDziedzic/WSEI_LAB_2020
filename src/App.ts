const formVin: HTMLElement | null = document.querySelector(".formVin");

if (formVin != null) {
  formVin.addEventListener<"submit">("submit", (e) => {
    e.preventDefault();
    let form: object = <HTMLInputElement>e.target;

    console.log(form);
  });
} else {
  throw new Error("Button not found");
}
