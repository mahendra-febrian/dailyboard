import { simpanCatatanKeStorage } from "./storage.js";
import { validasiInput } from "./api.js";

export function tambahCatatan(daftarCatatan, isi, container) {
  if (validasiInput(isi)) {
    daftarCatatan.push({
      id: Date.now(),
      isi,
      tanggal: new Date().toLocaleDateString(),
    });
    simpanCatatanKeStorage(daftarCatatan);
    renderCatatan(container, daftarCatatan);
  }
}

export function renderCatatan(container, daftarCatatan) {
  container.innerHTML = "";

  daftarCatatan.forEach((catatan) => {
    const div = document.createElement("div");
    div.className = "catatan-item";
    div.innerHTML = `<p>${catatan.isi}</p><small>${catatan.tanggal}</small>`;

    div.addEventListener("dblclick", () => {
      const edit = document.createElement("textarea");
      const selesaiEdit = document.createElement("button");

      selesaiEdit.textContent = "Selesai";

      selesaiEdit.addEventListener("click", (e) => {
        e.preventDefault();
        if (validasiInput(edit.value)) {
          editCatatan(daftarCatatan, catatan.id, edit.value, container);
        }
      });

      div.appendChild(edit);
      div.appendChild(selesaiEdit);
    });

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";

    tombolHapus.addEventListener("click", (e) => {
      e.preventDefault();
      hapusCatatan(daftarCatatan, catatan.id, container);
    });

    div.appendChild(tombolHapus);

    container.appendChild(div);
  });
}

function editCatatan(daftarCatatan, id, isiBaru, container) {
  daftarCatatan = daftarCatatan.map((c) =>
    c.id === id ? { ...c, isi: isiBaru } : c,
  );
  simpanCatatanKeStorage(daftarCatatan);
  renderCatatan(container, daftarCatatan);
}

function hapusCatatan(daftarCatatan, id, container) {
  daftarCatatan = daftarCatatan.filter((c) => c.id !== id);
  simpanCatatanKeStorage(daftarCatatan);
  renderCatatan(container, daftarCatatan);
}
