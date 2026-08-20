export async function ambilKutipan(kutipanHarian) {
  try {
    kutipanHarian.textContent = "Memuat...";
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();
    kutipanHarian.textContent = data.quote;
  } catch (error) {
    kutipanHarian.textContent = `Gagal mengambil kutipan: ${error.message}`;
    console.error("Gagal mengambil kutipan", error);
  }
}

export async function ambilCuaca(kota, infoCuaca) {
  const apiKey = "a81e320c833e6cc5a3413dcb488398e6";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${apiKey}&units=metric`;

  try {
    infoCuaca.textContent = "Memuat...";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Kota tidak ditemukan");
    const data = await res.json();

    infoCuaca.innerHTML = `<p>${data.main.temp}℃</p>
        <p>${data.weather[0].description}`;
  } catch (error) {
    infoCuaca.innerHTML = error.message;
  }
}

export async function muatSemuaWidget(
  kutipanHarian,
  infoCuaca,
  kota = "Bandung",
) {
  document.getElementById("status").textContent = "Memuat data...";

  await Promise.all([ambilKutipan(kutipanHarian), ambilCuaca(kota, infoCuaca)]);

  document.getElementById("status").textContent = "Data berhasil dimuat";
}

export function validasiInput(nilai) {
  if (nilai.trim() === "") {
    alert("Input tidak boleh kosong!");
    return false;
  }
  if (nilai.length > 100) {
    alert("Input maksimal 100 karakter!");
    return false;
  }
  return true;
}

export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
