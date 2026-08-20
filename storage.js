export function simpanKeStorage(daftarTugas) {
  localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}

export function muatDariStorage() {
  const data = localStorage.getItem("daftarTugas");
  return data ? JSON.parse(data) : [];
}

export function simpanCatatanKeStorage(daftarCatatan) {
  localStorage.setItem("daftar-catatan", JSON.stringify(daftarCatatan));
}

export function muatCatatanDariStorage() {
  const data = localStorage.getItem("daftar-catatan");
  return data ? JSON.parse(data) : [];
}
