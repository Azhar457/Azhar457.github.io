# Dokumentasi Penginstalan Nginx dan PHPMyAdmin dengan Ekstensi yang Dibutuhkan Untuk Ubuntu Sever

## Prasyarat

1. **Sistem Operasi**: Ubuntu Server (di VirtualBox).
2. **Akses Root**: Diperlukan untuk instalasi paket.
3. **Repository Paket**: Repository Ubuntu harus terkonfigurasi dengan baik.

## Langkah-Langkah Instalasi

### 1. Update dan Upgrade Sistem

Pastikan sistem up-to-date sebelum memulai:

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Instalasi Nginx

1. Instal paket Nginx:
   ```bash
   sudo apt install nginx -y
   ```
2. Verifikasi instalasi Nginx:
   ```bash
   nginx -v
   ```
3. Mulai dan aktifkan layanan Nginx:
   ```bash
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

### 3. Instalasi PHP dan Ekstensi yang Dibutuhkan

1. Instal PHP 8.4-FPM:
   ```bash
   sudo apt install php8.4-fpm php8.4-cli php8.4-mbstring php8.4-xml php8.4-mysql php8.4-curl php8.4-zip -y
   ```
2. Verifikasi versi PHP:
   ```bash
   php -v
   ```
3. Pastikan PHP-FPM berjalan:
   ```bash
   sudo systemctl start php8.4-fpm
   sudo systemctl enable php8.4-fpm
   ```

### 4. Konfigurasi Nginx untuk Mendukung PHP

1. Edit file konfigurasi Nginx default:
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
2. Ubah atau tambahkan konfigurasi berikut di dalam blok `server`:
   ```nginx
   location ~ \\.php$ {
       include snippets/fastcgi-php.conf;
       fastcgi_pass unix:/run/php/php8.4-fpm.sock;
   }
   ```
3. Tes konfigurasi Nginx:
   ```bash
   sudo nginx -t
   ```
4. Reload layanan Nginx:
   ```bash
   sudo systemctl reload nginx
   ```

### 5. Instalasi PHPMyAdmin

1. Unduh PHPMyAdmin:
   ```bash
   wget https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.tar.gz
   ```
2. Ekstrak file:
   ```bash
   tar -xvzf phpMyAdmin-latest-all-languages.tar.gz
   ```
3. Pindahkan direktori hasil ekstraksi ke direktori web:
   ```bash
   sudo mv phpMyAdmin-*-all-languages /var/www/html/phpmyadmin
   ```
4. Atur kepemilikan direktori:
   ```bash
   sudo chown -R www-data:www-data /var/www/html/phpmyadmin
   ```
5. Akses PHPMyAdmin di browser:
   ```
   http://<IP-Server>/phpmyadmin
   ```

### 6. Ekstensi dan Modul yang Dibutuhkan

Berikut adalah daftar ekstensi PHP yang telah diinstal dan dibutuhkan untuk menjalankan PHPMyAdmin:

- `php8.4-mbstring`: Mendukung string multibyte.
- `php8.4-xml`: Mendukung manipulasi XML.
- `php8.4-mysql`: Berinteraksi dengan MySQL.
- `php8.4-curl`: Untuk transfer data melalui URL.
- `php8.4-zip`: Mendukung kompresi file.

### 7. Keamanan (Opsional)

1. **Atur Akses ke Direktori PHPMyAdmin**: Edit konfigurasi Nginx:
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
   Tambahkan aturan akses di blok `location /phpmyadmin`:
   ```nginx
   location /phpmyadmin {
       allow localhost;
       deny all;
   }
   ```
2. Reload Nginx:
   ```bash
   sudo systemctl reload nginx
   ```
3. **Gunakan HTTPS**: Instal sertifikat SSL dengan `certbot` atau buat sertifikat self-signed untuk pengembangan lokal.

## Verifikasi

- Akses PHPMyAdmin melalui URL di browser.
- Login dengan kredensial MySQL yang valid.

---

**Catatan**: Dokumentasi ini ditujukan untuk lingkungan pengembangan lokal. Jangan gunakan konfigurasi ini untuk produksi tanpa penyesuaian keamanan tambahan.
![Gambar WhatsApp 2024-12-16 pukul 16 40 51_bd0898bb](https://github.com/user-attachments/assets/5965eca5-6fe8-4499-970e-79bbb17181c4)



