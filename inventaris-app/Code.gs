const SHEET_NAME = "Form Response 1";
const SPREADSHEET_ID = "1DGkbjItvUBa6gGnwe16W4z_PcQMwAAdK8HB6pHgtxF4";

function doGet(e) {
  // Handle JSONP callback
  const callback = e.parameter.callback;

  if (e.parameter.action === "getData") {
    try {
      const sheet =
        SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
      const values = sheet.getDataRange().getValues();
      const headers = values[0];

      // Create data with row numbers for edit functionality
      const data = values.slice(1).map((row, index) => {
        const obj = { No: index + 1 }; // Add row number
        headers.forEach((header, headerIndex) => {
          obj[header] = row[headerIndex];
        });
        return obj;
      });

      if (callback) {
        // JSONP response
        return ContentService.createTextOutput(
          `${callback}(${JSON.stringify(data)})`
        ).setMimeType(ContentService.MimeType.JAVASCRIPT);
      }

      return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
        ContentService.MimeType.JSON
      );
    } catch (error) {
      const errorResponse = { error: error.message };
      if (callback) {
        return ContentService.createTextOutput(
          `${callback}(${JSON.stringify(errorResponse)})`
        ).setMimeType(ContentService.MimeType.JAVASCRIPT);
      }

      return ContentService.createTextOutput(
        JSON.stringify(errorResponse)
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(
    JSON.stringify({ message: "GET OK" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = e.parameter;
    const sheet =
      SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

    // MODE: UPDATE ONLY (karena input via Google Form)
    if (data.email && data.namaBarang) {
      const values = sheet.getDataRange().getValues();
      const headers = values[0];

      // Find row index by nomor parameter from URL
      const rowIndex = parseInt(data.rowIndex) || null;

      if (rowIndex && rowIndex <= values.length - 1) {
        const targetRowNumber = rowIndex + 1; // +1 karena header

        // Update specific columns based on form structure
        // Struktur: Timestamp | Email Address | Nama Barang | Kategori | Jumlah Kondisi Bagus | Jumlah Kondisi Kurang | Jumlah Kondisi Rusak | Foto Barang | Harga Taksir | Harga

        // Find column indices
        const emailCol = headers.indexOf("Email Address") + 1;
        const namaBarangCol = headers.indexOf("Nama Barang") + 1;
        const kategoriCol = headers.indexOf("Kategori") + 1;
        const bagusCol = headers.indexOf("Jumlah Kondisi Bagus") + 1;
        const kurangCol = headers.indexOf("Jumlah Kondisi Kurang") + 1;
        const rusakCol = headers.indexOf("Jumlah Kondisi Rusak") + 1;
        const fotoCol = headers.indexOf("Foto Barang") + 1;
        const hargaTaksirCol = headers.indexOf("Harga Taksir") + 1;
        const hargaCol = headers.indexOf("Harga") + 1;

        // Update each field if column exists
        if (emailCol > 0)
          sheet.getRange(targetRowNumber, emailCol).setValue(data.email);
        if (namaBarangCol > 0)
          sheet
            .getRange(targetRowNumber, namaBarangCol)
            .setValue(data.namaBarang);
        if (kategoriCol > 0)
          sheet.getRange(targetRowNumber, kategoriCol).setValue(data.kategori);
        if (bagusCol > 0)
          sheet
            .getRange(targetRowNumber, bagusCol)
            .setValue(parseInt(data.bagus) || 0);
        if (kurangCol > 0)
          sheet
            .getRange(targetRowNumber, kurangCol)
            .setValue(parseInt(data.kurang) || 0);
        if (rusakCol > 0)
          sheet
            .getRange(targetRowNumber, rusakCol)
            .setValue(parseInt(data.rusak) || 0);
        if (hargaTaksirCol > 0)
          sheet
            .getRange(targetRowNumber, hargaTaksirCol)
            .setValue(parseInt(data.hargaTaksir) || "");
        if (hargaCol > 0)
          sheet
            .getRange(targetRowNumber, hargaCol)
            .setValue(parseInt(data.harga) || "");

        // Return success page
        return HtmlService.createHtmlOutput(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Update Berhasil</title>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body class="bg-green-50 flex items-center justify-center min-h-screen">
            <div class="bg-white p-8 rounded shadow text-center max-w-md">
              <h1 class="text-2xl font-bold text-green-600 mb-4">✅ Update Berhasil!</h1>
              <p class="mb-4">Data barang "${data.namaBarang}" telah diperbarui.</p>
              <div class="space-y-2">
                <a href="index.html" class="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  � Lihat Semua Data
                </a>
                <a href="edit.html?no=${rowIndex}" class="block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  ✏️ Edit Lagi
                </a>
              </div>
            </div>
            <script>
              setTimeout(() => {
                window.location.href = 'index.html';
              }, 3000);
            </script>
          </body>
          </html>
        `);
      } else {
        throw new Error("Row index tidak valid atau data tidak ditemukan");
      }
    } else {
      throw new Error("Email dan Nama Barang harus diisi");
    }
  } catch (err) {
    return HtmlService.createHtmlOutput(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Error</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-red-50 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded shadow text-center">
          <h1 class="text-2xl font-bold text-red-600 mb-4">❌ Error</h1>
          <p class="text-red-600 mb-4">ERROR: ${err.message}</p>
          <a href="index.html" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            ← Kembali ke Daftar
          </a>
        </div>
      </body>
      </html>
    `);
  }
}
