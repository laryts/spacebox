let $ = document.querySelector.bind(document);

const container = $(".container-staffs");
const contentstaff = $(".staffs");
const containerSelected = $(".container-selected");
const contentstaffSelected = $(".staff-selected");
let data;

document.addEventListener(
  "click",
  function(event) {
    document.querySelectorAll(".card").forEach(item => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
    });
    if (!event.target.matches(".card")) return;
    event.preventDefault();
    event.target.classList.toggle("active");

    //
    const key = event.target.getAttribute("key");
    data.find(function(staff, index) {
      if (staff.id == key) {
        contentstaffSelected.innerHTML = templateSeleted(staff);
      }
    });
  },
  false
);

const templateSeleted = staff => {
  return `
    <div class="card" id="staff-${staff.id}" key="${staff.id}">
      <div class="avatar">
        <img src="assets/${staff.foto}" />
      </div>
      <div class="card-content">
        <div class="staff staff-fields">
          <span>Name: </span>
          <span>Cargo: </span>
          <span>Idade: </span>
        </div>
        <div class="staff staff-values">
          <span>${staff.nome}</span>
          <span>${staff.cargo}</span>
          <span>${staff.idade}</span>
        </div>
      </div>
    </div>
    `;
};

const template = staffs => {
  return `
  ${staffs
    .map(
      staff => `
    <div class="card" id="staff-${staff.id}" key="${staff.id}">
        <div class="avatar">
            <span class="badge">${staff.id}</span>
            <img src="assets/${staff.foto}" />
        </div>
        <div class="card-content">
            <div class="nome">${staff.nome}</div>
            <div class="cargo">${staff.cargo}</div>
        </div>
    </div>
    `
    )
    .join(" ")} `;
};

fetch("dados.json")
  .then(response => {
    return response.json();
  })
  .then(staffs => {
    data = staffs;
    contentstaff.innerHTML = template(staffs);
  })
  .catch(err => console.error(err));
