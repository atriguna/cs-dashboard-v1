# Panduan Pencarian Agent di Dashboard

## Cara Mencari Agent Tertentu (misalnya: Nafida)

Dashboard sekarang menampilkan **300 evaluations terbaru** (sebelumnya hanya 50), sehingga semua agent termasuk yang lama akan muncul.

### Langkah-langkah:

1. **Scroll ke bagian "Recent Evaluations"** di bawah dashboard
2. **Klik dropdown "🔍 Filter by Agent"** (dropdown kedua di bagian filter)
3. **Pilih nama agent** yang ingin dilihat (contoh: "Nafida Nurhidayati")
4. Table akan otomatis filter dan menampilkan:
   - Badge biru dengan jumlah hasil yang ditemukan
   - Hanya evaluations dari agent tersebut
   - Border dropdown akan berubah jadi biru menandakan filter aktif

### Fitur Filter Lainnya:

- **Search by Ticket Number**: Ketik nomor ticket di search box pertama
- **Filter by Channel**: Pilih channel account di dropdown ketiga
- **Clear Filters**: Klik tombol "Clear Filters" untuk reset semua filter

### Catatan Penting:

- **Tidak ada agent bernama "Nadya"** di database
- Yang ada adalah **"Nafida Nurhidayati"** (24 evaluations, avg score: 3.58)
- Agent lain: **"Ridwan Alfaridzi"** (252 evaluations, avg score: 0.36)

### Perubahan yang Dilakukan:

1. ✅ Meningkatkan limit dari 50 → 300 records
2. ✅ Menambahkan badge "X results found" saat filter aktif
3. ✅ Highlight dropdown dengan border biru saat filter aktif
4. ✅ Menambahkan badge "Active" di dropdown yang sedang difilter
5. ✅ Menambahkan emoji 🔍 di placeholder untuk lebih jelas
6. ✅ Update stats API untuk konsistensi data
7. ✅ Menambahkan score di Top Performer card

### Screenshot Fitur:

Saat filter agent aktif, Anda akan melihat:
- Dropdown "Filter by Agent" dengan border biru
- Badge "Active" di dalam dropdown
- Badge "X results found" di header table
- Tombol "Clear Filters" untuk reset

---

**Update**: 2025-11-12
**By**: Cascade AI Assistant
