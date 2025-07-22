# Setup Google Form untuk Input Data Barang

## 1. Buat Google Form Baru

1. Buka [Google Forms](https://forms.google.com)
2. Klik **"Blank Form"** atau **"+ Create"**
3. Ubah judul form menjadi: **"Input Data Barang Rongsokan"**
4. Ubah deskripsi: **"Form untuk menambah data barang rongsokan baru"**

## 2. Tambah Fields Berikut (Sesuai Urutan):

### Field 1: Email Address

- **Type**: Short answer
- **Required**: ✅ Yes
- **Question**: "Email Address"
- **Description**: "Email untuk keperluan update data"

### Field 2: Nama Barang

- **Type**: Short answer
- **Required**: ✅ Yes
- **Question**: "Nama Barang"
- **Description**: "Masukkan nama barang rongsokan"

### Field 3: Kategori

- **Type**: Short answer
- **Required**: ✅ Yes
- **Question**: "Kategori"
- **Description**: "Contoh: Elektronik, Furniture, Kendaraan, dll"

### Field 4: Jumlah Kondisi Bagus

- **Type**: Short answer
- **Required**: ❌ No
- **Question**: "Jumlah Kondisi Bagus"
- **Description**: "Berapa unit barang dalam kondisi bagus"
- **Response validation**: Number, Greater than or equal to 0

### Field 5: Jumlah Kondisi Kurang

- **Type**: Short answer
- **Required**: ❌ No
- **Question**: "Jumlah Kondisi Kurang"
- **Description**: "Berapa unit barang dalam kondisi kurang baik"
- **Response validation**: Number, Greater than or equal to 0

### Field 6: Jumlah Kondisi Rusak

- **Type**: Short answer
- **Required**: ❌ No
- **Question**: "Jumlah Kondisi Rusak"
- **Description**: "Berapa unit barang dalam kondisi rusak"
- **Response validation**: Number, Greater than or equal to 0

### Field 7: Foto Barang

- **Type**: File upload
- **Required**: ✅ Yes
- **Question**: "Foto Barang"
- **Description**: "Upload foto barang (bisa multiple)"
- **Settings**:
  - Allow only specific file types: ✅
  - Images: ✅ (JPG, PNG, GIF)
  - Maximum number of files: 5
  - Maximum file size: 10 MB

### Field 8: Harga Taksir

- **Type**: Short answer
- **Required**: ❌ No
- **Question**: "Harga Taksir (Rp)"
- **Description**: "Contoh: 25000 ✅ Bukan 25.000 ❌ (Harga taksir minimal)"
- **Response validation**: Number, Greater than 0

### Field 9: Harga (Opsional)

- **Type**: Short answer
- **Required**: ❌ No
- **Question**: "Harga (Opsional)"
- **Description**: "Harga final jika sudah ditentukan"
- **Response validation**: Number, Greater than 0

## 3. Settings Form

1. **Klik Settings (⚙️) di bagian atas**
2. **General tab**:

   - ✅ Collect email addresses
   - ✅ Limit to 1 response (jika ingin batasi)
   - ❌ Edit after submit (untuk keamanan)

3. **Presentation tab**:
   - ✅ Show progress bar
   - ✅ Shuffle question order: ❌
   - Confirmation message: "Terima kasih! Data barang telah tersimpan. Tim kami akan memproses segera."

## 4. Connect ke Spreadsheet

1. **Klik tab "Responses"**
2. **Klik tombol hijau "Create Spreadsheet"**
3. **Pilih**: "Create a new spreadsheet"
4. **Name**: "Data Barang Rongsokan - Responses"
5. **Klik "Create"**

⚠️ **PENTING**: Pastikan spreadsheet yang dibuat memiliki ID yang sama dengan yang ada di `Code.gs`:
`1DGkbjItvUBa6gGnwe16W4z_PcQMwAAdK8HB6pHgtxF4`

Jika berbeda, update ID di file `Code.gs`.

## 5. Dapatkan Link Form

1. **Klik tombol "Send" di pojok kanan atas**
2. **Pilih tab "Link" (🔗)**
3. **✅ Shorten URL** (untuk link yang lebih pendek)
4. **Copy link** dan bagikan ke user

## 6. Test Form

1. **Buka link form yang sudah dibuat**
2. **Isi semua field test**
3. **Upload foto test**
4. **Submit form**
5. **Cek data masuk ke spreadsheet**
6. **Cek apakah muncul di website inventory**

## 7. Link Form ke Website (Opsional)

Tambahkan tombol di `index.html` untuk akses mudah:

```html
<a
  href="LINK_GOOGLE_FORM_ANDA"
  target="_blank"
  class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
>
  ➕ Tambah Barang (Google Form)
</a>
```

## Troubleshooting

**Q: Foto tidak muncul di website**
A: Pastikan file upload setting di form sudah benar dan file yang diupload adalah image

**Q: Data tidak muncul di website**  
A: Cek spreadsheet ID di Code.gs, pastikan sama dengan spreadsheet form

**Q: Edit tidak berfungsi**
A: Pastikan kolom di spreadsheet sesuai dengan yang diharapkan Code.gs

**Q: Format harga salah**
A: Pastikan user input angka saja tanpa titik/koma (contoh: 25000 bukan 25.000)
