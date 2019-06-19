let $ = document.querySelector.bind(document);

const container = $(".container-staffs");
const contentstaff = $(".staffs");
const containerSelected = $(".container-selected");
const contentstaffSelected = $(".staff-selected");
let data;

// Listing event click
document.addEventListener(
  "click",
  function(event) {
    event.preventDefault();

    // Looking for all selects to disable active class
    document.querySelectorAll(".card").forEach(item => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
    });

    if (!event.target.matches(".card")) return;

    // Toggle class active
    event.target.classList.toggle("active");

    // Get id of staff selected and find in data to render template selected
    const key = event.target.getAttribute("key");
    data.find(function(staff, index) {
      if (staff.id == key) {
        contentstaffSelected.innerHTML = templateSeleted(staff);
      }
    });
  },
  false
);

// Build template staff selected
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

// Build template staff's list
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

// Get data of json file
fetch("dados.json")
  .then(response => {
    return response.json();
  })
  .then(staffs => {
    // global variable
    data = staffs;

    // add staffs list in HTML > container-staffs
    contentstaff.innerHTML = template(staffs);
  })
  .catch(err => console.error(err));
