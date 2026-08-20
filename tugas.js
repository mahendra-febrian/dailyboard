// Minggu 16
// Memecah kode menjadi modul terpisah menggunakan ES Modules
// tugas.js
import { simpanKeStorage, muatDariStorage } from "./storage.js";
import { validasiInput, debounce } from "./api.js";

export function tambahTugas(daftarTugas, nama, list, filter) {
  if (validasiInput(nama)) {
    daftarTugas.push({ id: Date.now(), nama, selesai: false });
    simpanKeStorage(daftarTugas);
    renderTugas(list, daftarTugas, filter);
  }
}

function toggleSelesai(daftarTugas, id, list, filter) {
  daftarTugas = daftarTugas.map((t) =>
    t.id === id ? { ...t, selesai: !t.selesai } : t,
  );
  simpanKeStorage(daftarTugas);
  renderTugas(list, daftarTugas, filter);
}

export function renderTugas(list, daftarTugas, filter) {
  daftarTugas = muatDariStorage();
  list.innerHTML = "";

  const tugasTersaring = daftarTugas.filter((t) => {
    if (filter === "selesai") return t.selesai;
    if (filter === "belum") return !t.selesai;
    return true;
  });

  tugasTersaring.forEach((tugas) => {
    const li = document.createElement("li");
    li.textContent = tugas.nama;
    li.classList.add("tugas-item");

    if (tugas.selesai) {
      li.classList.add("selesai");
    }

    li.dataset.id = tugas.id;

    li.addEventListener("dblclick", () => {
      const edit = document.createElement("input");
      const selesaiEdit = document.createElement("button");

      selesaiEdit.textContent = "Selesai";

      selesaiEdit.addEventListener("click", (e) => {
        e.preventDefault();
        if (validasiInput(edit.value)) {
          editTugas(daftarTugas, tugas.id, edit.value, list, filter);
        }
      });

      li.appendChild(edit);
      li.appendChild(selesaiEdit);
    });

    const tombolHapus = document.createElement("button");
    const tombolSelesai = document.createElement("button");

    tombolHapus.textContent = "Hapus";
    tombolSelesai.textContent = "Selesaikan";

    tombolHapus.addEventListener("click", (e) => {
      e.preventDefault();
      hapusTugas(daftarTugas, tugas.id, list, filter);
    });
    tombolSelesai.addEventListener("click", (e) => {
      e.preventDefault();
      toggleSelesai(daftarTugas, tugas.id, list, filter);
    });

    li.appendChild(tombolHapus);
    li.appendChild(tombolSelesai);
    list.appendChild(li);
  });

  aktifkanDragDrop(daftarTugas, list, filter);
}

function hapusTugas(daftarTugas, id, list, filter) {
  daftarTugas = daftarTugas.filter((t) => t.id !== id);
  simpanKeStorage(daftarTugas);
  renderTugas(list, daftarTugas, filter);
}

function editTugas(daftarTugas, id, namaBaru, list, filter) {
  daftarTugas = daftarTugas.map((t) =>
    t.id === id ? { ...t, nama: namaBaru } : t,
  );
  simpanKeStorage(daftarTugas);
  renderTugas(list, daftarTugas, filter);
}

function aktifkanDragDrop(daftarTugas, list, filter) {
  const items = document.querySelectorAll(".tugas-item");

  items.forEach((item) => {
    item.setAttribute("draggable", true);
    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", item.dataset.id);
    });
  });

  list.addEventListener("dragover", (e) => e.preventDefault());

  list.addEventListener("drop", (e) => {
    e.preventDefault();

    const draggedId = Number(e.dataTransfer.getData("text/plain"));
    const targetElement = e.target.closest(".tugas-item");

    if (draggedId && targetElement) {
      const targetId = Number(targetElement.dataset.id);

      if (draggedId !== targetId) {
        const draggedIndex = daftarTugas.findIndex((t) => t.id === draggedId);
        const targetIndex = daftarTugas.findIndex((t) => t.id === targetId);

        const [draggedItem] = daftarTugas.splice(draggedIndex, 1);

        daftarTugas.splice(targetIndex, 0, draggedItem);

        simpanKeStorage(daftarTugas);
        renderTugas(list, daftarTugas, filter);
      }
    }
  });
}

export const cariTugasDebounce = debounce(
  (list, daftarTugas, kataKunci, filter) => {
    const hasil = daftarTugas.filter((t) =>
      t.nama.toLowerCase().includes(kataKunci.toLowerCase()),
    );

    renderTugas(list, hasil, filter);
  },
  300,
);
