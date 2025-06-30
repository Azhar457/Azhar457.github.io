-- Tabel KK
CREATE TABLE kk (
  kk_id INT PRIMARY KEY AUTO_INCREMENT,
  no_kk VARCHAR(20) NOT NULL,
  alamat TEXT NOT NULL,
  rt VARCHAR(5),
  rw VARCHAR(5),
  kelurahan VARCHAR(50),
  kecamatan VARCHAR(50),
  kabupaten VARCHAR(50),
  provinsi VARCHAR(50),
  kode_pos VARCHAR(10),
  dikeluarkan_tanggal DATE
);
-- Tabel Warga
CREATE TABLE warga (
  nik VARCHAR(20) PRIMARY KEY,
  no_kk VARCHAR(20) NOT NULL,
  nama VARCHAR(100),
  jenis_kelamin ENUM('L','P'),
  tempat_lahir VARCHAR(50),
  tanggal_lahir DATE,
  agama VARCHAR(20),
  pendidikan VARCHAR(50),
  pekerjaan VARCHAR(50),
  status_perkawinan VARCHAR(20),
  kewarganegaraan VARCHAR(30),
  no_paspor VARCHAR(20),
  no_kitap VARCHAR(20),
  hubungan_dalam_keluarga VARCHAR(20),
  nama_ayah VARCHAR(100),
  nama_ibu VARCHAR(100),
  FOREIGN KEY (no_kk) REFERENCES kk(no_kk)
);

