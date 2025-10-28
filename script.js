// script.js (versi premium hijau-hitam)
// Fitur:
// - UI modern dark green/black
// - Input angka besar auto pakai titik pemisah ribuan (1.000.000)
// - Semua hasil ditampilkan rapi

// ===== Utility Input & Format =====

// bikin blok input (label + input)
function inputField(id, label, placeholder, thousand) {
  return `
    <div class="field-group">
      <label for="${id}">${label}</label>
      <input
        id="${id}"
        class="num-input ${thousand ? 'format-thousand' : ''}"
        placeholder="${placeholder}"
        inputmode="decimal"
      />
    </div>
  `;
}

// format angka ribuan langsung (misal ketik 1000000 -> 1.000.000)
function formatThousandInstant(value) {
  const cleaned = value.replace(/\D/g, ""); // hanya digit
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// pasang auto-format ribuan untuk input yang butuh
function attachFormatListeners() {
  const els = document.querySelectorAll(".format-thousand");
  els.forEach((el) => {
    el.addEventListener("input", () => {
      el.value = formatThousandInstant(el.value);
    });
  });
}

// ambil angka murni dari input
// - kalau input kelas 'format-thousand', kita buang titik ribuan
// - kalau bukan, boleh pakai koma jadi desimal
function getNum(id) {
  const el = document.getElementById(id);
  if (!el) return NaN;
  let v = el.value.trim();

  if (el.classList.contains("format-thousand")) {
    // "1.200.000" -> "1200000"
    v = v.replace(/\./g, "");
  } else {
    // "12,5" -> "12.5"
    v = v.replace(/,/g, ".");
  }

  return parseFloat(v);
}

// format angka output biasa (1.234.567,89)
function fmtID(num, maxDigits = 2) {
  if (isNaN(num)) return "-";
  return num.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDigits,
  });
}

// format rupiah (Rp1.234.567,89)
function fmtRupiah(num) {
  if (isNaN(num)) return "-";
  return (
    "Rp" +
    num.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
  );
}

// ====== Render Fitur ======

function showFeature(feature) {
  const output = document.getElementById("featureOutput");

  switch (feature) {
    case "nilaiRasio":
      output.innerHTML = `
        <div class="feature-card">
          <h3><i class="fa-solid fa-percent"></i><span>Nilai Rasio</span></h3>
          ${inputField("part", "Bagian", "contoh: 25.000", true)}
          ${inputField("whole", "Keseluruhan", "contoh: 100.000", true)}
          <button class="action-btn" onclick="hitungNilaiRasio()">
            <i class="fa-solid fa-calculator"></i>
            <span>Hitung</span>
          </button>
          <div id="hasil" class="hasil-box"></div>
        </div>
      `;
      break;

    case "cariRasio":
      output.innerHTML = `
        <div class="feature-card">
          <h3><i class="fa-solid fa-chart-pie"></i><span>Cari Rasionya</span></h3>
          ${inputField("persen", "Persentase (%)", "contoh: 15", false)}
          ${inputField("whole2", "Keseluruhan", "contoh: 1.000.000", true)}
          <button class="action-btn" onclick="cariRasio()">
            <i class="fa-solid fa-calculator"></i>
            <span>Hitung</span>
          </button>
          <div id="hasil" class="hasil-box"></div>
        </div>
      `;
      break;

    case "peningkatan":
      output.innerHTML = `
        <div class="feature-card">
          <h3><i class="fa-solid fa-chart-line"></i><span>Peningkatan %</span></h3>
          ${inputField("awal", "Nilai Awal", "contoh: 500.000", true)}
          ${inputField("akhir", "Nilai Akhir", "contoh: 750.000", true)}
          <button class="action-btn" onclick="hitungPeningkatan()">
            <i class="fa-solid fa-calculator"></i>
            <span>Hitung</span>
          </button>
          <div id="hasil" class="hasil-box"></div>
        </div>
      `;
      break;

    case "diskon":
      output.innerHTML = `
        <div class="feature-card">
          <h3><i class="fa-solid fa-tags"></i><span>Hitung Diskon</span></h3>
          ${inputField("hargaAwal", "Harga Awal (Rp)", "contoh: 120.000", true)}
          ${inputField("persenDiskon", "Diskon (%)", "contoh: 25", false)}
          <button class="action-btn" onclick="hitungDiskon()">
            <i class="fa-solid fa-calculator"></i>
            <span>Hitung</span>
          </button>
          <div id="hasil" class="hasil-box"></div>
        </div>
      `;
      break;

    case "perubahan":
      output.innerHTML = `
        <div class="feature-card">
          <h3><i class="fa-solid fa-right-left"></i><span>Perubahan Nilai</span></h3>
          ${inputField("nilaiAwal", "Nilai Awal", "contoh: 1.000.000", true)}
          ${inputField("nilaiBaru", "Nilai Baru", "contoh: 800.000", true)}
          <button class="action-btn" onclick="hitungPerubahan()">
            <i class="fa-solid fa-calculator"></i>
            <span>Hitung</span>
          </button>
          <div id="hasil" class="hasil-box"></div>
        </div>
      `;
      break;

    case "pecahanKeRasio":
      output.innerHTML = `
        <div class="feature-card">
          <h3><i class="fa-solid fa-calculator"></i><span>Pecahan ke Persentase</span></h3>
          ${inputField("pembilang", "Pembilang (a)", "contoh: 2", false)}
          ${inputField("penyebut", "Penyebut (b)", "contoh: 5", false)}
          <button class="action-btn" onclick="hitungPecahanKeRasio()">
            <i class="fa-solid fa-calculator"></i>
            <span>Hitung</span>
          </button>
          <div id="hasil" class="hasil-box"></div>
        </div>
      `;
      break;

    case "ipk":
      output.innerHTML = `
        <div class="feature-card">
          <h3><i class="fa-solid fa-graduation-cap"></i><span>Hitung IPK</span></h3>
          ${inputField("totalNilai", "Total Nilai x SKS", "contoh: 320", false)}
          ${inputField("totalSKS", "Total SKS", "contoh: 144", false)}
          <button class="action-btn" onclick="hitungIPK()">
            <i class="fa-solid fa-calculator"></i>
            <span>Hitung</span>
          </button>
          <div id="hasil" class="hasil-box"></div>
        </div>
      `;
      break;

    case "lagi":
      output.innerHTML = `
        <div class="feature-card">
          <h3><i class="fa-solid fa-plus"></i><span>Fitur Tambahan</span></h3>
          <div class="hasil-box">
            Fitur tambahan akan segera tersedia.
          </div>
        </div>
      `;
      break;

    default:
      output.innerHTML = `
        <div class="feature-card">
          <div class="hasil-box">Fitur tidak ditemukan.</div>
        </div>
      `;
  }

  // aktifkan auto-format ribuan untuk input uang setelah render
  attachFormatListeners();

  // auto scroll biar form langsung kelihatan di HP
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

// ====== Fungsi Perhitungan ======

function hitungNilaiRasio() {
  const part = getNum("part");
  const whole = getNum("whole");
  if (!isNaN(part) && !isNaN(whole) && whole !== 0) {
    const result = (part / whole) * 100;
    tampilHasil(result.toFixed(2) + "%");
  } else tampilHasil("Masukkan angka yang valid.");
}

function cariRasio() {
  const persen = getNum("persen");
  const whole = getNum("whole2");
  if (!isNaN(persen) && !isNaN(whole)) {
    const result = (persen / 100) * whole;
    tampilHasil(fmtID(result, 2));
  } else tampilHasil("Masukkan angka yang valid.");
}

function hitungPeningkatan() {
  const awal = getNum("awal");
  const akhir = getNum("akhir");
  if (!isNaN(awal) && !isNaN(akhir) && awal !== 0) {
    const result = ((akhir - awal) / awal) * 100;
    tampilHasil(result.toFixed(2) + "%");
  } else tampilHasil("Masukkan angka yang valid.");
}

function hitungDiskon() {
  const hargaAwal = getNum("hargaAwal");
  const persen = getNum("persenDiskon");
  if (!isNaN(hargaAwal) && !isNaN(persen)) {
    const potongan = (persen / 100) * hargaAwal;
    const hargaAkhir = hargaAwal - potongan;
    tampilHasil(
      "Potongan: " +
        fmtRupiah(potongan) +
        "<br>Harga Akhir: " +
        fmtRupiah(hargaAkhir)
    );
  } else tampilHasil("Masukkan angka yang valid.");
}

function hitungPerubahan() {
  const awal = getNum("nilaiAwal");
  const baru = getNum("nilaiBaru");
  if (!isNaN(awal) && !isNaN(baru) && awal !== 0) {
    const perubahan = ((baru - awal) / awal) * 100;
    tampilHasil(perubahan.toFixed(2) + "%");
  } else tampilHasil("Masukkan angka yang valid.");
}

function hitungPecahanKeRasio() {
  const pembilang = getNum("pembilang");
  const penyebut = getNum("penyebut");
  if (!isNaN(pembilang) && !isNaN(penyebut) && penyebut !== 0) {
    const result = (pembilang / penyebut) * 100;
    tampilHasil(result.toFixed(2) + "%");
  } else tampilHasil("Masukkan angka yang valid.");
}

function hitungIPK() {
  const totalNilai = getNum("totalNilai");
  const totalSKS = getNum("totalSKS");
  if (!isNaN(totalNilai) && !isNaN(totalSKS) && totalSKS !== 0) {
    const ipk = totalNilai / totalSKS;
    tampilHasil("IPK: " + ipk.toFixed(2));
  } else tampilHasil("Masukkan angka yang valid.");
}

function tampilHasil(teks) {
  const box = document.getElementById("hasil");
  if (box) {
    box.innerHTML = teks;
  }
}
