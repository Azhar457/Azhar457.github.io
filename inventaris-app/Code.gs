const SHEET_NAME = "Sheet1";
const SPREADSHEET_ID = "1DGkbjItvUBa6gGnwe16W4z_PcQMwAAdK8HB6pHgtxF4";
const DRIVE_FOLDER_ID = "1CkpRl_9PckxuwnB-_YfrNdh6_cqtKNx9";

function doGet(e) {
  // Handle JSONP callback
  const callback = e.parameter.callback;
  
  if (e.parameter.action === "getData") {
    try {
      const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
      const values = sheet.getDataRange().getValues();
      const headers = values[0];
      const data = values.slice(1).map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });
      
      if (callback) {
        // JSONP response
        return ContentService.createTextOutput(`${callback}(${JSON.stringify(data)})`)
          .setMimeType(ContentService.MimeType.JAVASCRIPT);
      }
      
      return ContentService.createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
      const errorResponse = {error: error.message};
      if (callback) {
        return ContentService.createTextOutput(`${callback}(${JSON.stringify(errorResponse)})`)
          .setMimeType(ContentService.MimeType.JAVASCRIPT);
      }
      
      return ContentService.createTextOutput(JSON.stringify(errorResponse))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({message: "GET OK"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = e.parameter;
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

    if (data.no) {
      // MODE: UPDATE
      const values = sheet.getDataRange().getValues();
      for (let i = 1; i < values.length; i++) {
        if (String(values[i][0]) === String(data.no)) {
          sheet.getRange(i + 1, 2, 1, 8).setValues([[
            data.namaBarang,
            data.kategori,
            parseInt(data.bagus) || 0,
            parseInt(data.kurang) || 0,
            parseInt(data.rusak) || 0,
            parseInt(data.total) || 0,
            data.fotoFolderLink || "",
            data.keterangan || "",
          ]]);
          
          // Return success page instead of plain text
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
              <div class="bg-white p-8 rounded shadow text-center">
                <h1 class="text-2xl font-bold text-green-600 mb-4">✅ Update Berhasil!</h1>
                <p class="mb-4">Data barang telah diperbarui.</p>
                <a href="../index.html" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Kembali ke Daftar</a>
              </div>
              <script>
                setTimeout(() => {
                  window.location.href = '../index.html';
                }, 3000);
              </script>
            </body>
            </html>
          `);
        }
      }
      
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
            <p>Data tidak ditemukan.</p>
          </div>
        </body>
        </html>
      `);
    } else {
      // MODE: TAMBAH
      const lastRow = sheet.getLastRow();
      const newNo = lastRow >= 2 ? Number(sheet.getRange(lastRow, 1).getValue()) + 1 : 1;

      // Buat folder di Google Drive
      let fotoFolderLink = "";
      try {
        const mainFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
        const barangFolder = mainFolder.createFolder(`${newNo}-${data.namaBarang}`);
        fotoFolderLink = barangFolder.getUrl();
      } catch (error) {
        console.log("Error creating folder:", error.message);
      }

      sheet.appendRow([
        newNo,
        data.namaBarang,
        data.kategori,
        parseInt(data.bagus) || 0,
        parseInt(data.kurang) || 0,
        parseInt(data.rusak) || 0,
        parseInt(data.total) || 0,
        fotoFolderLink,
        data.keterangan || "",
      ]);
      
      // Return success page with folder link
      return HtmlService.createHtmlOutput(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Input Berhasil</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-green-50 flex items-center justify-center min-h-screen p-4">
          <div class="bg-white p-8 rounded shadow text-center max-w-md">
            <h1 class="text-2xl font-bold text-green-600 mb-4">✅ Data Berhasil Disimpan!</h1>
            <p class="mb-4">No: ${newNo}<br>Nama: ${data.namaBarang}</p>
            <div class="space-y-2">
              <a href="${fotoFolderLink}" target="_blank" class="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                📁 Upload Foto ke Folder Google Drive
              </a>
              <a href="../input.html" class="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                ➕ Input Data Lagi
              </a>
              <a href="../index.html" class="block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                📋 Lihat Semua Data
              </a>
            </div>
          </div>
          <script>
            // Auto redirect setelah 10 detik
            setTimeout(() => {
              window.location.href = '../index.html';
            }, 10000);
          </script>
        </body>
        </html>
      `);
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
          <p class="text-red-600">ERROR: ${err.message}</p>
        </div>
      </body>
      </html>
    `);
  }
}