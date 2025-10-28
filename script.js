// script.js
function showFeature(feature) {
  const output = document.getElementById("featureOutput");

  const inputField = (id, placeholder) =>
    `<input type="number" id="${id}" placeholder="${placeholder}" />`;

  switch (feature) {
    case "nilaiRasio":
      output.innerHTML = `
        <h3>Nilai Rasio</h3>
        ${inputField("part", "Bagian")} ${inputField("whole", "Keseluruhan")}
        <button onclick="hitungNilaiRasio()">Hitung</button>
        <div id="hasil"></div>`;
      break;

    case "cariRasio":
      output.innerHTML = `
        <h3>Cari Rasionya</h3>
        ${inputField("persen", "Persentase")} ${inputField("whole2", "Keseluruhan")}
        <button onclick="cariRasio()">Hitung</button>
        <div id="hasil"></div>`;
      break;

    case "peningkatan":
      output.innerHTML = `
        <h3>Peningkatan %</h3>
        ${inputField("awal", "Nilai Awal")} ${inputField("akhir", "Nilai Akhir")}
        <button onclick="hitungPeningkatan()">Hitung</button>
        <div id="hasil"></div>`;
      break;

    case "diskon":
      output.innerHTML = `
        <h3>Hitung Diskon</h3>
        ${inputField("hargaAwal", "Harga Awal")} ${inputField("persenDiskon", "Diskon (%)")}
        <button onclick="hitungDiskon()">Hitung</button>
        <div id="hasil"></div>`;
      break;

    case "perubahan":
      output.innerHTML = `
        <h3>Perubahan Nilai</h3>
        ${inputField("nilaiAwal", "Nilai Awal")} ${inputField("nilaiBaru", "Nilai Baru")}
        <button onclick="hitungPerubahan()">Hitung</button>
        <div id="hasil"></div>`;
      break;

    case "pecahanKeRasio":
      output.innerHTML = `
        <h3>Pecahan ke Persentase</h3>
        ${inputField("pembilang", "Pembilang")} ${inputField("penyebut", "Penyebut")}
        <button onclick="hitungPecahanKeRasio()">Hitung</button>
        <div id="hasil"></div>`;
      break;

    case "ipk":
      output.innerHTML = `
        <h3>Hitung IPK</h3>
        ${inputField("totalNilai", "Total Nilai x SKS")} ${inputField("totalSKS", "Total SKS")}
        <button onclick="hitungIPK()">Hitung</button>
        <div id="hasil"></div>`;
      break;

    case "lagi":
      output.innerHTML = `<p>Fitur tambahan akan segera tersedia.</p>`;
      break;

    default:
      output.innerHTML = `<p>Fitur tidak ditemukan.</p>`;
  }
}

// Fungsi perhitungan
function hitungNilaiRasio() {
  const part = parseFloat(document.getElementById("part").value);
  const whole = parseFloat(document.getElementById("whole").value);
  if (!isNaN(part) && !isNaN(whole) && whole !== 0) {
    const result = (part / whole) * 100;
    tampilHasil(`${result.toFixed(2)}%`);
  } else tampilHasil("Masukkan angka yang valid.");
}

function cariRasio() {
  const persen = parseFloat(document.getElementById("persen").value);
  const whole = parseFloat(document.getElementById("whole2").value);
  if (!isNaN(persen) && !isNaN(whole)) {
    const result = (persen / 100) * whole;
    tampilHasil(result.toFixed(2));
  } else tampilHasil("Masukkan angka yang valid.");
}

function hitungPeningkatan() {
  const awal = parseFloat(document.getElementById("awal").value);
  const akhir = parseFloat(document.getElementById("akhir").value);
  if (!isNaN(awal) && !isNaN(akhir) && awal !== 0) {
    const result = ((akhir - awal) / awal) * 100;
    tampilHasil(`${result.toFixed(2)}%`);
  } else tampilHasil("Masukkan angka yang valid.");
}

function hitungDiskon() {
  const hargaAwal = parseFloat(document.getElementById("hargaAwal").value);
  const persen = parseFloat(document.getElementById("persenDiskon").value);
  if (!isNaN(hargaAwal) && !isNaN(persen)) {
    const potongan = (persen / 100) * hargaAwal;
    const hargaAkhir = hargaAwal - potongan;
    tampilHasil(`Potongan: Rp${potongan.toFixed(2)}<br>Harga Akhir: Rp${hargaAkhir.toFixed(2)}`);
  } else tampilHasil("Masukkan angka yang valid.");
}

function hitungPerubahan() {
  const awal = parseFloat(document.getElementById("nilaiAwal").value);
  const baru = parseFloat(document.getElementById("nilaiBaru").value);
  if (!isNaN(awal) && !isNaN(baru) && awal !== 0) {
    const perubahan = ((baru - awal) / awal) * 100;
    tampilHasil(`${perubahan.toFixed(2)}%`);
  } else tampilHasil("Masukkan angka yang valid.");
}

function hitungPecahanKeRasio() {
  const pembilang = parseFloat(document.getElementById("pembilang").value);
  const penyebut = parseFloat(document.getElementById("penyebut").value);
  if (!isNaN(pembilang) && !isNaN(penyebut) && penyebut !== 0) {
    const result = (pembilang / penyebut) * 100;
    tampilHasil(`${result.toFixed(2)}%`);
  } else tampilHasil("Masukkan angka yang valid.");
}

function hitungIPK() {
  const totalNilai = parseFloat(document.getElementById("totalNilai").value);
  const totalSKS = parseFloat(document.getElementById("totalSKS").value);
  if (!isNaN(totalNilai) && !isNaN(totalSKS) && totalSKS !== 0) {
    const ipk = totalNilai / totalSKS;
    tampilHasil(`IPK: ${ipk.toFixed(2)}`);
  } else tampilHasil("Masukkan angka yang valid.");
}

function tampilHasil(teks) {
  document.getElementById("hasil").innerHTML = teks;
}
