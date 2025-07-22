const SHEET_NAME = "Sheet1";
const SPREADSHEET_ID = "1DGkbjItvUBa6gGnwe16W4z_PcQMwAAdK8HB6pHgtxF4";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Data POST tidak ditemukan");
    }

    // Baca data dari x-www-form-urlencoded
    const contentType = e.postData.type;
    let payload = {};

    if (contentType === "application/x-www-form-urlencoded") {
      const params = e.postData.contents.split("&").reduce((acc, pair) => {
        const [key, val] = pair.split("=");
        acc[decodeURIComponent(key)] = decodeURIComponent(val || "");
        return acc;
      }, {});
      payload = JSON.parse(params.data);
    } else {
      payload = JSON.parse(e.postData.contents);
    }

    const sheet =
      SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

    if (payload.no) {
      // 🚨 MODE: UPDATE
      const values = sheet.getDataRange().getValues();
      for (let i = 1; i < values.length; i++) {
        if (String(values[i][0]) === payload.no) {
          sheet
            .getRange(i + 1, 2, 1, 7)
            .setValues([
              [
                payload.namaBarang,
                payload.kategori,
                payload.bagus,
                payload.kurang,
                payload.rusak,
                payload.total,
                payload.keterangan,
              ],
            ]);
          return ContentService.createTextOutput("UPDATE OK").setMimeType(
            ContentService.MimeType.TEXT
          );
        }
      }
      return ContentService.createTextOutput("NO NOT FOUND").setMimeType(
        ContentService.MimeType.TEXT
      );
    } else {
      // ✨ MODE: TAMBAH
      const lastRow = sheet.getLastRow();
      const newNo =
        lastRow >= 2 ? Number(sheet.getRange(lastRow, 1).getValue()) + 1 : 1;

      sheet.appendRow([
        newNo,
        payload.namaBarang,
        payload.kategori,
        payload.bagus,
        payload.kurang,
        payload.rusak,
        payload.total,
        "", // kolom foto folder link nanti dari script auto
        payload.keterangan,
      ]);
      return ContentService.createTextOutput("INSERT OK").setMimeType(
        ContentService.MimeType.TEXT
      );
    }
  } catch (err) {
    return ContentService.createTextOutput("ERROR: " + err.message).setMimeType(
      ContentService.MimeType.TEXT
    );
  }
}

// Untuk menangani preflight dari fetch (CORS safe)
function doOptions() {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
