// Minggu 1
// script.js
// Minggu 15
import { tambahTugas, renderTugas, cariTugasDebounce } from "./tugas.js";
import { tambahCatatan, renderCatatan } from "./catatan.js";
import { muatDariStorage, muatCatatanDariStorage } from "./storage.js";
import { ambilCuaca, muatSemuaWidget } from "./api.js";

console.log("Dailyboard siap dijalankan!");

// Minggu 2
const app = document.getElementById("app");

const judul = document.createElement("h2");
judul.textContent = "Selamat datang di Dailyboard!";
app.appendChild(judul);

// Mengubah gaya elemen lewat js
judul.style.color = "#2563eb";

// Tugas Minggu 2
const tugas = document.createElement("section");
const catatan = document.createElement("section");
const cuaca = document.createElement("section");

app.appendChild(tugas);
app.appendChild(catatan);
app.appendChild(cuaca);

// Minggu 3
const tombol = document.createElement("button");
tombol.textContent = "Klik saya";
app.appendChild(tombol);

tombol.addEventListener("click", () => {
  alert("Tombol berhasil diklik!");
});

// Event pada input
const input = document.createElement("input");
app.appendChild(input);

input.addEventListener("input", (e) => {
  console.log("Nilai input: ", e.target.value);
});

// Opt
const judulTugas = document.createElement("h2");
judulTugas.textContent = "Tugas";

tugas.appendChild(judulTugas);

const judulCatatan = document.createElement("h2");
judulCatatan.textContent = "Catatan";

catatan.appendChild(judulCatatan);

const judulCuaca = document.createElement("h2");
judulCuaca.textContent = "Cuaca";

cuaca.appendChild(judulCuaca);

// Tugas Minggu 3
const formCariTugas = document.getElementById("form-cari-tugas");
tugas.appendChild(formCariTugas);

// Tugas Minggu 6
const selesai = document.getElementById("selesai");
const belum = document.getElementById("belum");
const semua = document.getElementById("semua");

tugas.appendChild(selesai);
tugas.appendChild(belum);
tugas.appendChild(semua);

selesai.addEventListener("click", (e) => {
  e.preventDefault();
  filter = "selesai";
  renderTugas(list, daftarTugas, filter);
});

belum.addEventListener("click", (e) => {
  e.preventDefault();
  filter = "belum";
  renderTugas(list, daftarTugas, filter);
});

semua.addEventListener("click", (e) => {
  e.preventDefault();
  filter = "";
  renderTugas(list, daftarTugas, filter);
});

const formTugas = document.getElementById("form-tugas");
const namaTugas = document.getElementById("nama-tugas");
const tombolTambahTugas = document.getElementById("tambah-tugas");

tugas.appendChild(formTugas);

// Tugas Minggu 5
tombolTambahTugas.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(namaTugas.value);
  tambahTugas(daftarTugas, namaTugas.value, list, filter);
});

// Minggu 4
let daftarTugas = [
  { id: 1, nama: "Belajar Javascript", selesai: false },
  { id: 2, nama: "Olahraga pagi", selesai: false },
];

// Tugas Minggu 4
const list = document.getElementById("daftar-tugas");
tugas.appendChild(list);

// Tugas Minggu 6
let filter;

// Tugas Minggu 7
daftarTugas = muatDariStorage();
renderTugas(list, daftarTugas, filter);

// Minggu 8
let daftarCatatan = [];

// Tugas Minggu 8
daftarCatatan = muatCatatanDariStorage();

const formCatatan = document.getElementById("form-catatan");
const isiCatatan = document.getElementById("isi-catatan");
const tombolTambahCatatan = document.getElementById("tambah-catatan");

tombolTambahCatatan.addEventListener("click", (e) => {
  e.preventDefault();
  tambahCatatan(daftarCatatan, isiCatatan.value, container);
});

catatan.appendChild(formCatatan);
const container = document.getElementById("daftar-catatan");

catatan.appendChild(container);
renderCatatan(container, daftarCatatan);

// Minggu 10
// Tugas Minggu 10
const kutipan = document.createElement("section");
const kutipanHarian = document.getElementById("kutipan-harian");

kutipanHarian.addEventListener("dblclick", () => {
  
})

kutipan.appendChild(kutipanHarian);
app.appendChild(kutipan);

// Minggu 11
// Tugas Minggu 11
const infoCuaca = document.getElementById("info-cuaca");
const formCuaca = document.getElementById("form-cuaca");

cuaca.appendChild(formCuaca);
cuaca.appendChild(infoCuaca);

const namaKota = document.getElementById("nama-kota");
const cariKota = document.getElementById("cari-kota");

cariKota.addEventListener("click", (e) => {
  e.preventDefault();
  ambilCuaca(namaKota.value, infoCuaca);
});

// Terapkan tema
window.addEventListener("DOMContentLoaded", () => {
  muatSemuaWidget(kutipanHarian, infoCuaca);

  if (localStorage.getItem("tema") === "gelap") {
    document.body.classList.add("dark-mode");
  }
});

// Minggu 14
const toggleTema = document.getElementById("toggle-tema");

toggleTema.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const modeAktif = document.body.classList.contains("dark-mode");
  localStorage.setItem("tema", modeAktif ? "gelap" : "terang");
});

// Pencarian tugas
document.getElementById("cari-tugas").addEventListener("input", (e) => {
  const kataKunci = e.target.value.toLowerCase();
  cariTugasDebounce(list, daftarTugas, kataKunci, filter);
});
