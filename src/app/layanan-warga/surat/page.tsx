"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ImageOff } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data types                                                        */
/* ------------------------------------------------------------------ */

type ListItem = string | { text: string; sub: string[] };

type Block =
  | { type: "law"; ref: string; text: string }
  | { type: "heading"; text: string }
  | { type: "section"; code: string; title: string; items: ListItem[] }
  | { type: "list"; items: ListItem[]; numbered?: boolean }
  | { type: "note"; title: string; items: string[] };

interface ProcedureItem {
  number: number;
  title: string;
  blocks: Block[];
}

/* ------------------------------------------------------------------ */
/*  Data — ditranskrip lengkap dari prosedur.md, tanpa pengurangan    */
/* ------------------------------------------------------------------ */

const PROCEDURES: ProcedureItem[] = [
  {
    number: 1,
    title: "Kartu Keluarga",
    blocks: [
      {
        type: "law",
        ref: "Peraturan Menteri Dalam Negeri Nomor 108 Tahun 2019 Pasal 1 Ayat (14)",
        text: 'Kartu Tanda Penduduk Elektronik yang selanjutnya disingkat KTP-el adalah Kartu Tanda Penduduk yang dilengkapi dengan cip yang merupakan identitas resmi penduduk sebagai bukti diri yang diterbitkan oleh "Disdukcapil" (Dinas Kependudukan dan Pencatatan Sipil) Kabupaten/Kota.',
      },
      { type: "heading", text: "Persyaratan Penerbitan" },
      {
        type: "section",
        code: "A",
        title: "Kartu Keluarga Baru bagi Penduduk karena Pindah Datang",
        items: [
          "Mengisi Form F1.01 Formulir Biodata Keluarga, Mengisi Form F1.02 Formulir Peristiwa Kependudukan",
          "Surat Keterangan Pindah Datang dari Daerah Asal/Surat Keterangan Pindah Datang (dalam wilayah NKRI)",
          "Foto Copy Surat Nikah / Kutipan Akta Perkawinan atau Kutipan Akta Perceraian",
          "SPTJM Kebenaran Perkawinan (apabila tidak bisa menunjukan dokumen Akta Perkawinan)",
        ],
      },
      {
        type: "section",
        code: "B",
        title: "Perubahan Kartu Keluarga karena Penambahan Anggota Keluarga bagi Penduduk yang Melahirkan",
        items: [
          "Mengisi Form F1.01 dan F1.02",
          "Kartu Keluarga Asli",
          "Surat Keterangan Lahir dari Rumah Sakit/Puskesmas/Bidan",
        ],
      },
      {
        type: "section",
        code: "C",
        title: "Perubahan Data Kartu Keluarga",
        items: [
          "Mengisi Form F1.01 dan F1.02",
          "Mengisi Form F-1.05",
          "Kartu Keluarga Asli",
          "Data Pendukung",
        ],
      },
      {
        type: "section",
        code: "D",
        title: "Perubahan Kartu Keluarga karena Pengurangan Anggota Keluarga",
        items: [
          "Mengisi Form F1.01 dan F1.02",
          "Kartu Keluarga Lama Asli",
          "Foto Copy Kutipan Kematian/Foto Copy Surat Pindah/Data Dukung Lainnya",
        ],
      },
      {
        type: "section",
        code: "E",
        title: "Perubahan Kartu Keluarga karena Hilang",
        items: [
          "Foto Copy KTP Elektronik yang masih berlaku",
          "Foto Copy Kartu Keluarga yang hilang",
          "Surat Keterangan Hilang dari Polsek Setempat",
          "Dokumen Pendukung Lainnya",
          "Foto Copy Kutipan Akta Kelahiran",
          "Foto Copy Kutipan Akta Perkawinan/Perceraian/Buku Nikah",
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Kartu Tanda Penduduk",
    blocks: [
      {
        type: "law",
        ref: "Peraturan Menteri Dalam Negeri Nomor 108 Tahun 2019 Pasal 1 Ayat (12)",
        text: "Kartu Keluarga yang selanjutnya disingkat Kartu Keluarga adalah kartu identitas keluarga yang memuat data tentang nama, susunan dan hubungan dalam keluarga, serta identitas anggota keluarga.",
      },
      { type: "heading", text: "Persyaratan Penerbitan" },
      {
        type: "section",
        code: "A",
        title: "KTP-el Baru Bagi Penduduk WNI",
        items: [
          "Mengisi Formulir Peristiwa Kependudukan (F1.02)",
          "Telah Berusia 17 (Tujuh Belas) Tahun, Sudah Kawin atau Pernah Kawin",
          "Foto Copy & Kartu Keluarga Asli",
          "SKDLN yang Diterbitkan oleh Instansi Pelaksana yang Datang dari LN Karena Pindah",
        ],
      },
      {
        type: "section",
        code: "B",
        title: "Bagi Orang Asing yang Memiliki Izin Tetap",
        items: [
          "Mengisi Formulir Peristiwa Kependudukan (F1.02)",
          "Telah Berusia 17 (Tujuh Belas) Tahun, Sudah Kawin atau Pernah Kawin",
          "Foto Copy Kartu Keluarga",
          "Kutipan Akta Nikah/Buku Nikah",
          "Bagi yang Sudah Berusia 17 Tahun Tetapi Belum Menikah, maka Melampirkan Kutipan Akta Kelahiran, Paspor dan Kartu Izin Tetap",
          "Surat Keterangan Catatan Kepolisian",
        ],
      },
      {
        type: "section",
        code: "C",
        title:
          "KTP-el Hilang/Rusak Bagi Penduduk WNI atau Orang Asing yang Memiliki Izin Tinggal Tetap",
        items: [
          "Mengisi Formulir Peristiwa Kependudukan (F1.02)",
          "Surat Keterangan Hilang dari Kepolisian",
          "KTP-el yang Rusak",
          "Foto Copy Kartu Keluarga",
          "Foto Copy Paspor, dan",
          "Kartu Izin Tinggal Tetap",
        ],
      },
      {
        type: "section",
        code: "D",
        title: "KTP-el Karena Pindah Datang bagi WNI",
        items: [
          "Mengisi Formulir Peristiwa Kependudukan (F1.02)",
          "SKPWNI",
          "SKDLN yang Diterbitkan oleh Instansi Pelaksana Bagi WNI yang Datang dari LN Karena Pindah",
          "Foto Copy Kartu Keluarga",
        ],
      },
      {
        type: "section",
        code: "E",
        title: "KTP-el karena Perubahan Data",
        items: [
          "Mengisi Formulir Peristiwa Kependudukan (F1.02)",
          "Foto Copy Kartu Keluarga Terbaru",
          "KTP-el Lama.",
        ],
      },
    ],
  },
  {
    number: 3,
    title: "Mutasi Penduduk Kabupaten Boyolali",
    blocks: [
      {
        type: "law",
        ref: "Peraturan Menteri Dalam Negeri Nomor 108 Tahun 2019 Pasal 1 Ayat (17)",
        text: '"Surat Keterangan Pindah yang selanjutnya disingkat SKP adalah surat keterangan yang wajib dimiliki oleh penduduk yang bermaksud pindah ke kabupaten/kota/provinsi lain, yang diterbitkan oleh Disdukcapil Kabupaten/Kota atau unit pelaksana Dinas Kependudukan dan Pencatatan Sipil dari daerah asal."',
      },
      {
        type: "heading",
        text: "I. Mutasi Kedatangan ke Kabupaten Boyolali — Persyaratan Penerbitan",
      },
      {
        type: "section",
        code: "A",
        title: "Dalam Kelurahan",
        items: ["Kartu Keluarga dan KTP-el"],
      },
      {
        type: "section",
        code: "B",
        title: "Antar Kelurahan dalam Satu Kecamatan",
        items: ["Surat Keterangan Pindah dari Kelurahan", "Kartu Keluarga dan KTP-el"],
      },
      {
        type: "section",
        code: "C",
        title: "Antar Kecamatan dalam Satu Kabupaten",
        items: [
          "Surat Keterangan Pindah dari Kelurahan",
          "Surat Keterangan Pindah dari Kecamatan",
          "Kartu Keluarga dan KTP-el",
        ],
      },
      {
        type: "section",
        code: "D",
        title: "Antar Kabupaten/Kota dalam Provinsi dan Luar Provinsi",
        items: [
          "Surat Keterangan Kehilangan dari Kepolisian Daerah Asal Bagi yang Hilang KTP-el",
          "Surat Keterangan Pindah dari Daerah Asal",
        ],
      },
      {
        type: "note",
        title: "NB",
        items: [
          "Mengisi Formulir Peristiwa Kependudukan (F1.02)",
          "Mengisi Formulir Pendaftaran Perpindahan Penduduk (F1.03)",
          "Foto Copy Surat Nikah / Akta Perkawinan",
          "Foto Copy Surat Cerai / Akta Cerai",
        ],
      },
      { type: "heading", text: "II. Mutasi Keluar Kabupaten Boyolali — Persyaratan Penerbitan" },
      {
        type: "section",
        code: "A",
        title: "Surat Keterangan Pindah Penduduk WNI Antar Desa",
        items: [
          "Mengisi Formulir F1.02 (Formulir Peristiwa Kependudukan) dan F1.03 (Formulir Pendaftaran Perpindahan Penduduk)",
          "Fotocopy Kartu Keluarga (Kartu Keluarga Asli dilampirkan apabila pengajuannya satu keluarga dalam satu Kartu Keluarga)",
          "KTP-el Asli dan Copy",
          "Foto Copy Buku Nikah/Akta Perkawinan",
          "Foto Copy Surat Cerai/Akta Cerai",
          "Akta Kelahiran (Apabila belum/tidak memiliki, maka melampirkan SPTJM Kelahiran)",
          "Bukti Dukung Lainnya yang Dibutuhkan",
        ],
      },
      {
        type: "section",
        code: "B",
        title: "Surat Keterangan Pindah Penduduk WNI Antar Kecamatan",
        items: [
          "Mengisi Formulir F1.02 dan F1.03",
          "Kartu Keluarga dan KTP-el",
          "Foto Copy Buku Nikah/Akta Perkawinan",
          "Foto Copy Surat Cerai/Akta Cerai",
          "Akta Kelahiran (Apabila belum/tidak memiliki, maka melampirkan SPTJM Kelahiran)",
        ],
      },
      {
        type: "section",
        code: "C",
        title: "Surat Keterangan Pindah Penduduk WNI Antar Kabupaten/Provinsi",
        items: [
          "Mengisi Formulir F1.02 dan F1.03",
          "Kartu Keluarga dan KTP-el",
          "Foto Copy Buku Nikah/Akta Perkawinan",
          "Foto Copy Surat Cerai/Akta Cerai",
          "Akta Kelahiran (Apabila belum/tidak memiliki, maka melampirkan SPTJM Kelahiran)",
        ],
      },
      {
        type: "section",
        code: "D",
        title: "Surat Keterangan Pindah Penduduk WNI Antar Negara",
        items: [
          "Mengisi Formulir F1.03 (Formulir Pendaftaran Perpindahan Penduduk)",
          "Kartu Keluarga dan KTP-el",
          "Pas Foto 3x4 Sebanyak 4 Lembar",
          "SKCK",
          "Foto Copy Buku Nikah/Akta Perkawinan",
          "Foto Copy Surat Cerai/Akta Cerai",
        ],
      },
      {
        type: "section",
        code: "E",
        title: "Pindah Datang Orang Asing yang Mempunyai Izin Tempat Tinggal Tetap",
        items: [
          "Mengisi Formulir F1.03",
          "Kartu Keluarga dan KTP-el",
          "Foto Copy Paspor",
          "Foto Copy Izin Tinggal Tetap",
          "Surat Keterangan Catatan Kepolisian",
        ],
      },
      {
        type: "section",
        code: "F",
        title: "Pindah Datang Orang Asing yang Mempunyai Izin Tempat Tinggal Sementara",
        items: [
          "Mengisi Formulir F1.03 (Formulir Pendaftaran Perpindahan Penduduk)",
          "Foto Copy Paspor",
          "Foto Copy Izin Tinggal Sementara",
          "Surat Keterangan Catatan Kepolisian",
        ],
      },
      {
        type: "section",
        code: "G",
        title: "Surat Pindah Datang (Kedatangan) Antar Kabupaten/Provinsi",
        items: [
          "Mengisi Formulir F1.02 dan F1.03",
          "SKPWNI Daerah Asal",
          "KTP-el",
        ],
      },
    ],
  },
  {
    number: 4,
    title: "Kartu Identitas Anak (KIA)",
    blocks: [
      {
        type: "law",
        ref: "Peraturan Menteri Dalam Negeri Nomor 02 Tahun 2016 Pasal 1 Ayat (7) Tentang Kartu Identitas Anak (KIA)",
        text: "Kartu Identitas Anak yang selanjutnya disingkat menjadi KIA adalah identitas resmi anak sebagai bukti diri anak yang berusia kurang dari 17 tahun, dan belum menikah, yang diterbitkan oleh Dinas Dukcapil Kabupaten/Kota.",
      },
      { type: "heading", text: "Persyaratan Penerbitan" },
      {
        type: "section",
        code: "A",
        title: "Syarat Penerbitan KIA WNI",
        items: [
          "Mengisi Formulir Peristiwa Kependudukan (F1.02)",
          "Foto Copy Kutipan Akta Kelahiran",
          "Foto Copy Kartu Keluarga Orang Tua/Wali",
          "Foto Copy KTP-el Kedua Orang Tua/Wali",
          "Foto Berwarna ukuran 4x6 sebanyak 2 lembar (bagi anak yang telah berusia 5 tahun s/d 17 tahun kurang 1 hari)",
        ],
      },
      {
        type: "section",
        code: "B",
        title: "KIA Baru bagi Anak WNI yang Baru Datang dari Luar Negeri",
        items: [
          "Mengisi Formulir Peristiwa Kependudukan (F1.02)",
          "Foto Copy Kutipan Akta Kelahiran",
          "Foto Copy Kartu Keluarga Orang Tua/Wali",
          "Foto Copy KTP-el Kedua Orang Tua/Wali",
          "Surat Keterangan Datang dari Luar Negeri",
          "Foto Berwarna ukuran 4x6 sebanyak 2 lembar (bagi anak yang telah berusia 5 th s/d 17 th kurang dari 1 hari)",
        ],
      },
      {
        type: "section",
        code: "C",
        title: "KIA yang Hilang",
        items: [
          "Mengisi Formulir Peristiwa Kependudukan (F1.02)",
          "Foto Copy Kutipan Akta Kelahiran",
          "Foto Copy Kartu Keluarga Orang Tua/Wali",
          "Foto Copy KTP-el Kedua Orang Tua/Wali",
          "Surat Keterangan dari Kepolisian",
          "Foto Berwarna ukuran 4x6 sebanyak 2 lembar (bagi anak yang telah berusia > 5 th s/d 17 th kurang 1 hari)",
        ],
      },
      {
        type: "section",
        code: "D",
        title: "KIA yang Rusak",
        items: [
          "Mengisi Formulir Peristiwa Kependudukan (F1.02)",
          "Foto Copy Kutipan Akta Kelahiran",
          "Foto Copy Kartu Keluarga Orang Tua/Wali",
          "Foto Copy KTP-el Kedua Orang Tua/Wali",
          "KIA yang Rusak",
          "Foto Berwarna ukuran 4x6 sebanyak 2 lembar (bagi anak yang telah berusia 5 th s/d 17 tahun kurang 1 hari)",
        ],
      },
      {
        type: "section",
        code: "E",
        title: "Menerbitkan KIA karena Pindah Datang",
        items: [
          "Mengisi Formulir Peristiwa Kependudukan (F1.02)",
          "KIA dari Daerah Asal (bila sudah memiliki)",
          "Foto Copy Kutipan Akta Kelahiran",
          "Foto Copy Kartu Keluarga Orang Tua/Wali",
          "Foto Copy KTP-el Kedua Orang Tua/Wali",
          "Surat Keterangan Pindah Datang",
          "Foto Berwarna ukuran 4x6 sebanyak 2 lembar (bagi anak yang telah berusia > 5 th s/d 17 th kurang 1 hari)",
        ],
      },
      {
        type: "section",
        code: "F",
        title: "Syarat Penerbitan KIA Orang Asing",
        items: [
          "Mengisi Formulir Peristiwa Kependudukan (F1.02)",
          "Foto Copy Paspor dan Izin Tetap",
          "Foto Copy Kartu Keluarga Orang Tua/Wali",
          "Foto Copy KTP-el Kedua Orang Tua/Wali",
          "Foto Copy Akta Kelahiran",
          "Foto Berwarna ukuran 4x6 sebanyak 2 lembar (bagi anak yang telah berusia > 5 th s/d 17 th kurang 1 hari)",
        ],
      },
    ],
  },
  {
    number: 5,
    title: "Akta Kelahiran",
    blocks: [
      {
        type: "law",
        ref: "Undang-Undang Nomor 24 Tahun 2013",
        text: "Setiap kelahiran wajib dilaporkan oleh penduduk kepada Dispendukcapil di tempat penduduk berdomisili paling lambat 60 hari sejak kelahirannya.",
      },
      { type: "heading", text: "Persyaratan Penerbitan" },
      {
        type: "section",
        code: "A",
        title: "Penerbitan Akta Kelahiran",
        items: [
          {
            text: "Mengisi Formulir Pelaporan Pencatatan Sipil di Wilayah NKRI (F2-01), persyaratan yang dilampirkan:",
            sub: [
              "Surat kelahiran dari penolong (Rumah Sakit/Puskesmas/Bidan). Apabila tidak dapat menunjukkan Surat Keterangan Kelahiran, maka harus melampirkan Formulir F2.03 Surat Pernyataan (SPTJM Kebenaran Data Kelahiran)",
              "Foto Copy Buku Nikah/Kutipan Akta Perkawinan dilegalisir, apabila tidak ada Buku Nikah, harus mengisi Formulir F2.04 Surat Pernyataan Kebenaran sebagai Pasangan Suami Istri (SPTJM Kebenaran Pasangan Suami Istri)",
              "Foto Copy KTP-el orang tua",
              "Foto Copy Kartu Keluarga",
              "Foto Copy KTP saksi 2 (dua) orang",
              "Foto Copy KTP-el Pelapor",
              "Foto Copy Ijazah (bagi yang memiliki, pemohon usia diatas 7 tahun)",
            ],
          },
          "Surat pernyataan bagi anak yang jarak kelahirannya lebih dari 10 tahun dari anak sebelumnya atau dari usia perkawinan",
        ],
      },
      {
        type: "note",
        title: "Informasi Penting",
        items: [
          "Akta kelahiran dibuat dimana penduduk berdomisili",
          "Tempat Tanggal Lahir ditulis nama kabupaten/kota sesuai dengan peristiwa yaitu dimana yang bersangkutan dilahirkan (Permendagri No. 109 Tahun 2019)",
          "Pencatatan kelahiran WNI bagi anak yang baru lahir atau baru ditemukan dan tidak diketahui asal-usulnya atau keberadaan orang tuanya harus memenuhi persyaratan berita acara dari kepolisian",
          "Pencatatan kelahiran WNI bagi anak yang tidak diketahui asal usulnya atau keberadaan orang tuanya selain yang dimaksud di atas harus memenuhi persyaratan Surat Pernyataan Tanggung Jawab Mutlak Kebenaran Data Kelahiran dengan 2 (dua) orang saksi",
        ],
      },
      {
        type: "note",
        title: "Permendagri RI No. 73 Tahun 2022 — Ketentuan Pencatatan Nama",
        items: [
          "Jumlah huruf maksimal 60 termasuk spasi",
          "Minimal terdiri dari 2 kata",
          "Mudah dibaca, tidak bermakna negatif dan tidak multitafsir",
          "Tidak menggunakan angka dan tanda baca",
          "Tidak disingkat, kecuali tidak diartikan lain",
          "Tidak mencantumkan gelar pendidikan dan keagamaan",
        ],
      },
      {
        type: "section",
        code: "B",
        title:
          "Pencatatan Kelahiran WNI yang Bertempat Tinggal di Luar NKRI yang Sedang Berkunjung ke Indonesia",
        items: [
          "Mengisi formulir permohonan Akta Kelahiran",
          "Surat Keterangan Kelahiran dari RS/Puskesmas/Bidan",
          "Buku Nikah/Kutipan Akta Perkawinan atau Bukti Nikah/Perkawinan lainnya",
          "Dokumen Perjalanan Republik Indonesia dan/atau Dokumen Perjalanan orang tua atau Surat Keterangan Pindah Luar Negeri",
        ],
      },
      {
        type: "section",
        code: "C",
        title: "Pencatatan Kelahiran Orang Asing Harus Memenuhi Persyaratan",
        items: [
          "Mengisi formulir permohonan Akta Kelahiran",
          "Surat Keterangan Kelahiran dari RS/Puskesmas/Bidan",
          "Dokumen Perjalanan",
          "KTP-el atau Izin Tinggal Tetap atau Kartu Izin Tinggal Terbatas atau Visa Kunjungan",
        ],
      },
      {
        type: "note",
        title: "Pencatatan Lahir Mati",
        items: [
          "Mengisi formulir Pelaporan Lahir Mati",
          "Surat Keterangan Lahir Mati dari Rumah Sakit/Puskesmas/Bidan, atau",
          "Pernyataan dari orang tua kandung atau wali bagi yang tidak memiliki",
        ],
      },
    ],
  },
  {
    number: 6,
    title: "Akta Perkawinan",
    blocks: [
      {
        type: "law",
        ref: "Undang-Undang No. 23 Tahun 2006 Pasal 34 Ayat (1) dan (2)",
        text: '"Perkawinan yang sah berdasarkan ketentuan Peraturan Perundang-undangan wajib dilaporkan oleh Penduduk kepada Instansi Pelaksana di tempat terjadinya perkawinan paling lambat 60 (enam puluh) hari sejak tanggal perkawinan."',
      },
      {
        type: "law",
        ref: "Undang-Undang No. 24 Tahun 2013 Pasal 102 (b)",
        text: 'Semua kalimat "wajib dilaporkan oleh Penduduk kepada Instansi Pelaksana di tempat terjadinya peristiwa" harus dimaknai "wajib dilaporkan oleh Penduduk di Instansi Pelaksana tempat Penduduk berdomisili."',
      },
      { type: "heading", text: "Persyaratan Penerbitan" },
      {
        type: "section",
        code: "A",
        title: "Pencatatan Perkawinan WNI dengan WNI di Wilayah NKRI",
        items: [
          "Mengisi Formulir Pelaporan Pencatatan Perkawinan",
          "Surat keterangan telah terjadinya perkawinan dari Pemuka Agama atau Penghayat Kepercayaan",
          "Foto Copy KTP-el & Foto Copy Kartu Keluarga Calon Suami dan Calon Istri",
          "Pas Foto Berwarna Berdampingan Uk. 4x6: 5 lembar",
          "Foto Copy Akta Kelahiran Calon Suami dan Calon Istri",
          "Foto Copy KTP-el 2 (dua) Orang Saksi dengan Usia Minimal 21 Tahun",
          "Foto Copy KTP-el dan Kartu Keluarga orang tua/wali",
          "Foto Copy Surat Kematian/Kutipan Akta Kematian orang tua apabila sudah meninggal dunia",
          "Kutipan Akta Cerai atau Akta Kematian apabila calon suami atau istri berstatus duda/janda",
          "Surat rekomendasi dari Dispendukcapil asal untuk calon suami/calon istri yang berasal dari luar daerah",
          "Surat Ijin dari komandan bagi calon suami/calon istri yang menjadi anggota TNI/Polri",
          "Foto Copy ijazah/STTB calon suami/calon istri",
          "Surat Keterangan sehat dari dokter dan surat keterangan telah diimunisasi bagi calon istri",
          "Mengisi Form (F.1 s/d F.7) atau formulir model N",
        ],
      },
      {
        type: "note",
        title: "Catatan Penting",
        items: [
          "Perkawinan dilangsungkan setelah hari kesepuluh sejak pengumuman kehendak perkawinan oleh Pegawai Pencatat (PP No. 9 Th. 1975 Pasal 10)",
          "Untuk melangsungkan perkawinan seseorang yang belum mencapai umur 21 tahun harus mendapat izin kedua orang tua (UU No. 1 Th. 1974 Pasal 10)",
          "Perkawinan harus diijinkan apabila pria dan wanita sudah mencapai umur 19 tahun. Penyimpangan terhadap ketentuan umur tersebut, orang tua pihak pria dan/atau wanita dapat meminta dispensasi kepada pengadilan dengan alasan sangat mendesak disertai bukti-bukti yang cukup (UU No. 16 Th. 2019 tentang Perubahan atas UU No. 1 Th. 1974)",
        ],
      },
      {
        type: "section",
        code: "B",
        title: "Pencatatan Perkawinan WNI dengan WNA dan/atau WNA dengan WNA di Wilayah NKRI",
        items: [
          "Mengisi formulir pelaporan pencatatan perkawinan. Semua dokumen persyaratan yang menggunakan bahasa asing wajib diterjemahkan ke bahasa Indonesia oleh penerjemah tersumpah",
          "Surat keterangan telah terjadinya perkawinan dari pemuka Agama atau penghayat kepercayaan",
          "Foto Copy KTP-el/Paspor/KITAS/KITAP & Foto Copy Kartu Keluarga calon suami dan calon istri",
          "Pas foto berwarna berdampingan ukuran 4×6 sebanyak 5 lembar",
          "Foto Copy Akta Kelahiran calon suami dan calon istri",
          "Foto Copy KTP-el dan Kartu Keluarga orang tua/wali",
          "Foto Copy KTP-el 2 (dua) orang saksi dengan usia minimal 21 tahun",
          "Foto Copy Surat Kematian/Kutipan Akta Kematian orang tua apabila sudah meninggal dunia",
          "Kutipan Akta Cerai atau Akta Kematian apabila calon suami atau istri berstatus duda/janda",
          "Surat ijin kawin dari perwakilan negara asal untuk calon pengantin WNA",
          "Surat keterangan tempat tinggal bagi pemegang Surat Izin Tinggal Terbatas",
          "Surat Ijin dari Komandan bagi calon suami/calon istri yang menjadi anggota TNI/Polri",
          "Foto Copy Ijazah/STTB calon suami/calon istri",
          "Surat keterangan sehat dari dokter dan surat keterangan telah diimunisasi bagi calon istri",
          "Mengisi Form (F.1 s/d F.7) dan formulir model N",
        ],
      },
      {
        type: "section",
        code: "C",
        title:
          "Pencatatan Perkawinan WNI dengan WNI dan/atau dengan WNA di Luar Wilayah NKRI (wajib dilaporkan ke Dispendukcapil sesuai alamat domisili)",
        items: [
          "Mengisi formulir pelaporan pencatatan perkawinan. Semua dokumen persyaratan yang menggunakan bahasa asing wajib diterjemahkan ke bahasa Indonesia oleh penerjemah tersumpah",
          "Bukti pelaporan perkawinan dari perwakilan RI di negara setempat",
          "Foto Copy Kutipan Akta Perkawinan",
          "Foto Copy KTP-el, Paspor dan Kartu Keluarga Pengantin",
          "Photo berwarna berdampingan uk. 4×6 sebanyak 4 lembar",
          "Foto Copy Kutipan Akta Kelahiran Pengantin",
          "Foto Copy Kutipan Akta Cerai atau Kutipan Akta Kematian apabila calon pengantin berstatus duda/janda",
        ],
      },
      {
        type: "section",
        code: "D",
        title: "Penerbitan Surat Keterangan Pembatalan Perkawinan",
        items: [
          "Mengisi formulir pelaporan pembatalan perkawinan",
          "Salinan putusan pengadilan yang telah mempunyai kekuatan hukum tetap",
          "Kutipan (asli) akta perkawinan",
          "KTP-el dan Kartu Keluarga para pihak",
        ],
      },
    ],
  },
  {
    number: 7,
    title: "Akta Kematian",
    blocks: [
      {
        type: "law",
        ref: "Undang-Undang Nomor 24 Tahun 2013 Pasal 44 Ayat (1)",
        text: '"Setiap kematian wajib dilaporkan oleh ketua rukun tetangga atau nama lainnya di domisili Penduduk kepada Instansi Pelaksana setempat paling lambat 30 (tiga puluh) hari sejak tanggal kematian."',
      },
      {
        type: "law",
        ref: "Undang-Undang Nomor 24 Tahun 2013 Pasal 44 Ayat (2)",
        text: "Pelapor kematian oleh rukun tetangga atau nama lain kepada Instansi Pelaksana dilaksanakan secara berjenjang kepada rukun warga atau nama lain, kelurahan/desa atau nama lain, dan kecamatan atau nama lain.",
      },
      { type: "heading", text: "Persyaratan Penerbitan" },
      {
        type: "section",
        code: "A",
        title: "Penerbitan Akta Kematian",
        items: [
          "Mengisi Formulir Pelaporan Pencatatan Sipil di Wilayah NKRI (F2-01)",
          "Asli Surat Keterangan Kematian dari Dokter/Rumah Sakit atau Surat Keterangan Kematian dari Desa/Kelurahan (diambil dari aplikasi Sisukma)",
          "Foto Copy KTP-el dan Kartu Keluarga yang meninggal (apabila Kartu Keluarga belum diubah)",
          "Foto Copy KTP-el 2 (dua) orang saksi (RT/tetangga atau perangkat, minimal berumur 21 tahun sudah menikah)",
          "Foto Copy KTP-el Pelapor (RT atau ahli waris)",
        ],
      },
      {
        type: "section",
        code: "B",
        title: "Orang Asing",
        items: [
          "Surat Kematian dari Rumah Sakit",
          "Foto Copy Paspor & Visa",
          "Foto Copy Akta Kelahiran yang meninggal",
          "Foto Copy Akta Perkawinan",
          "Foto Copy KTP-el Pelapor",
          "Foto Copy KITAS/KITAP 2 (dua) orang saksi",
          "Foto Copy KITAS/KITAP",
        ],
      },
      {
        type: "section",
        code: "C",
        title: "Persyaratan Khusus",
        items: [
          "Dalam hal terdapat ketidakjelasan keberadaan seseorang karena hilang/mati tetapi tidak ditemukan jenazahnya, pencatatan baru dilakukan setelah mendapat penetapan dari pengadilan",
          "Surat pernyataan kematian dari maskapai penerbangan bagi seseorang yang tidak jelas keberadaannya karena hilang atau mati tetapi tidak ditemukan jenazahnya, sesuai dengan ketentuan perundang-undangan",
          "Surat keterangan kematian dari perwakilan Republik Indonesia bagi penduduk yang kematiannya di luar wilayah NKRI",
          "Surat kuasa bermaterai khusus bagi yang dikuasakan",
        ],
      },
      {
        type: "section",
        code: "D",
        title:
          "Penerbitan Akta Kematian untuk Jenazah Tidak Terdaftar dalam Kartu Keluarga/Database Kependudukan",
        items: [
          {
            text: "Sesuai Permendagri RI No. 108 Tahun 2019 dan Surat Dirjen Dukcapil No. 472.12/5166/Dukcapil:",
            sub: [
              "Pencatatan kematian penduduk yang tidak terdaftar dalam Kartu Keluarga dan database kependudukan dilakukan melalui penetapan pengadilan, akan tetapi dapat dilakukan tanpa penetapan pengadilan dengan dokumen pendukung, misalnya buku nikah/akta perkawinan, KTP/KK lama, ijazah, dokumen perjalanan RI, dan dikuatkan dengan surat keterangan kematian dengan 2 orang saksi",
            ],
          },
        ],
      },
    ],
  },
  {
    number: 8,
    title: "Akta Perceraian",
    blocks: [
      {
        type: "law",
        ref: "Undang-Undang Nomor 23 Tahun 2006 Pasal 40 Ayat (1)",
        text: "Perceraian wajib dilaporkan oleh yang bersangkutan kepada instansi pelaksana paling lambat 60 (enam puluh) hari sejak putusan pengadilan tentang perceraian yang telah memperoleh kekuatan hukum tetap.",
      },
      {
        type: "law",
        ref: "Undang-Undang Nomor 24 Tahun 2013 Pasal 102 (b)",
        text: '"Semua kalimat \'wajib dilaporkan oleh Penduduk kepada Instansi Pelaksana di tempat terjadinya peristiwa\' harus dimaknai \'wajib dilaporkan oleh Penduduk di Instansi Pelaksana tempat Penduduk berdomisili\'."',
      },
      { type: "heading", text: "Persyaratan Penerbitan" },
      {
        type: "section",
        code: "A",
        title: "Penerbitan Akta Perceraian",
        items: [
          "Mengisi formulir pelaporan pencatatan perceraian",
          "Salinan putusan pengadilan yang telah mempunyai kekuatan hukum tetap",
          "Kutipan Akta Perkawinan (asli)",
          "Foto Copy KTP-el dan Kartu Keluarga para pihak",
        ],
      },
      {
        type: "section",
        code: "B",
        title: "Penerbitan Surat Keterangan Pembatalan Perceraian",
        items: [
          "Mengisi formulir pembatalan perceraian",
          "Salinan putusan pengadilan yang telah mempunyai kekuatan hukum tetap",
          "Kutipan (asli) Akta Perceraian",
          "KTP-el dan Kartu Keluarga para pihak",
        ],
      },
    ],
  },
  {
    number: 9,
    title: "Perubahan Nama",
    blocks: [
      {
        type: "law",
        ref: "Undang-Undang Nomor 23 Tahun 2006 Pasal 52 Ayat (1)",
        text: '"Pencatatan perubahan nama dilaksanakan berdasarkan penetapan Pengadilan Negeri tempat pemohon."',
      },
      {
        type: "law",
        ref: "Undang-Undang Nomor 23 Tahun 2006 Pasal 52 Ayat (2)",
        text: '"Pencatatan perubahan nama sebagaimana dimaksud pada ayat (1) wajib dilaporkan oleh Penduduk kepada Instansi Pelaksana yang menerbitkan Akta Pencatatan Sipil paling lambat 30 (tiga puluh) hari sejak diterimanya salinan penetapan Pengadilan Negeri oleh Penduduk."',
      },
      {
        type: "list",
        numbered: true,
        items: [
          "Mengisi Formulir Pelaporan Pencatatan Sipil di Wilayah NKRI (F-2.01)",
          "Kutipan Akta Kelahiran",
          "Kutipan akta-akta pencatatan sipil yang dipunyai (Akta Perkawinan/Akta Perceraian)",
          "Foto Copy KTP-el dan Kartu Keluarga",
          "Foto Copy penetapan pengadilan tentang perubahan nama",
          "Bagi orang asing, membawa dokumen imigrasi dan STDL serta surat keterangan dari perwakilan negara yang bersangkutan, dan SKTT bagi penduduk Orang Asing yang memiliki kartu tinggal tetap dengan melampirkan KTP dan Kartu Keluarga",
          "Surat kuasa bermaterai cukup bagi yang dikuasakan",
        ],
      },
      {
        type: "note",
        title: "Tambahan",
        items: [
          "Jika menghendaki dicetakkan KTP-el dan Kartu Keluarga, maka wajib mengisi Formulir F1.01 Formulir Biodata Keluarga",
          "F1.02 Formulir Peristiwa Kependudukan",
          "F1.06 Surat Pernyataan Perubahan Elemen Data Kependudukan",
        ],
      },
    ],
  },
  {
    number: 10,
    title: "Pengakuan Anak",
    blocks: [
      {
        type: "law",
        ref: "Undang-Undang No. 24 Tahun 2013 Pasal 49 Ayat (2)",
        text: '"Pengakuan anak hanya berlaku bagi anak yang orang tuanya telah melaksanakan perkawinan sah menurut hukum agama, tetapi belum sah menurut hukum negara."',
      },
      {
        type: "law",
        ref: "Undang-Undang No. 24 Tahun 2013 Pasal 102 Huruf (b)",
        text: '"Semua kalimat \'wajib dilaporkan oleh Penduduk kepada Instansi Pelaksana di tempat terjadinya peristiwa\' harus dimaknai \'wajib dilaporkan oleh Penduduk di Instansi Pelaksana tempat Penduduk berdomisili\'."',
      },
      {
        type: "list",
        items: [
          "Mengisi Formulir Pelaporan Pencatatan Sipil di Wilayah NKRI (F2.01)",
          "Kutipan Akta Kelahiran (asli)",
          "Foto Copy Kartu Keluarga dan KTP-el ibu kandung dan ayah dilegalisir yang mengakui",
          "Surat keterangan telah terjadinya perkawinan dari pemuka agama atau penghayat kepercayaan terhadap Tuhan Yang Maha Esa",
          "Surat pernyataan pengakuan anak dari ayah yang mengakui dan disetujui oleh ibu kandung bermaterai cukup, atau penetapan pengadilan mengenai pengakuan anak jika ibu kandung merupakan warga negara asing",
          "Bagi orang asing membawa dokumen imigrasi dan STLD serta buku keterangan dari perwakilan negara yang bersangkutan, dan KTT bagi penduduk Orang Asing yang memiliki izin tinggal tetap dengan membawa KTP dan Kartu Keluarga",
          "Penetapan/Putusan Pengadilan Agama mengenai bukti anak biologis dari ayah dan ibu",
          "Surat kuasa bermaterai cukup bagi yang dikuasakan",
        ],
      },
    ],
  },
  {
    number: 11,
    title: "Pengesahan Anak",
    blocks: [
      {
        type: "law",
        ref: "Undang-Undang Nomor 24 Tahun 2013 Pasal 50 Ayat (2)",
        text: '"Pengesahan anak hanya berlaku bagi anak yang orang tuanya telah melaksanakan perkawinan sah menurut hukum agama dan hukum negara."',
      },
      {
        type: "law",
        ref: "Undang-Undang Nomor 24 Tahun 2013 Pasal 102 (b)",
        text: '"Semua kalimat \'wajib dilaporkan oleh Penduduk kepada Instansi Pelaksana di tempat terjadinya peristiwa\' harus dimaknai \'wajib dilaporkan oleh Penduduk di Instansi Pelaksana tempat penduduk berdomisili\'."',
      },
      {
        type: "list",
        items: [
          "Mengisi Formulir Pelaporan Pencatatan Sipil di Wilayah NKRI (F2-01)",
          "Foto Copy Buku Nikah/Kutipan Akta Perkawinan Orang Tua yang dilegalisir",
          "Surat keterangan telah terjadinya perkawinan dari pemuka agama atau penghayat kepercayaan terhadap Tuhan YME",
          "Foto Copy KTP dan Kartu Keluarga orang tua",
          "Kutipan Akta Kelahiran Anak (asli)",
          {
            text: "Bagi Orang Asing membawa dokumen:",
            sub: [
              "Foto Copy Kartu Keluarga dan KTP orang tua bagi pemegang izin tempat tinggal tetap",
              "Foto Copy dilegalisir SKTT orang tua bagi pemegang izin tinggal terbatas",
              "Foto Copy dilegalisir Paspor bagi orang asing yang memiliki izin kunjungan",
            ],
          },
        ],
      },
    ],
  },
  {
    number: 12,
    title: "Pengangkatan Anak",
    blocks: [
      {
        type: "law",
        ref: "Undang-Undang Nomor 23 Tahun 2006 Pasal 47 Ayat (1)",
        text: '"Pencatatan Pengangkatan Anak dilaksanakan berdasarkan penetapan Pengadilan di tempat tinggal pemohon."',
      },
      {
        type: "list",
        items: [
          "Mengisi Formulir Pelaporan Pencatatan Sipil di Wilayah NKRI",
          "Keputusan/Penetapan Pengadilan Negeri/Agama yang mempunyai kekuatan hukum tentang pengangkatan anak",
          "Kutipan Akta Kelahiran Anak (asli)",
          "Foto Copy dilegalisir Kutipan Akta Perkawinan/Buku Nikah Orang Tua Kandung dan Calon Orang Tua Angkat",
          "Foto Copy KTP dan Kartu Keluarga Orang Tua Kandung dan Calon Orang Tua Angkat",
          "Bagi orang asing membawa foto copy dilegalisir paspor, dokumen imigrasi dan STLD, serta buku keterangan dari perwakilan negara yang bersangkutan",
          "Surat Kuasa bermaterai cukup bagi yang dikuasakan",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Renderers                                                          */
/* ------------------------------------------------------------------ */

function ItemList({ items, numbered }: { items: ListItem[]; numbered?: boolean }) {
  return (
    <ol className={numbered ? "arsip-list-numbered" : "arsip-list"}>
      {items.map((it, i) => {
        const isObj = typeof it !== "string";
        const text = isObj ? (it as { text: string }).text : (it as string);
        const sub = isObj ? (it as { sub: string[] }).sub : null;
        return (
          <li key={i}>
            <span>{text}</span>
            {sub && (
              <ol className="arsip-list arsip-list-nested">
                {sub.map((s, j) => (
                  <li key={j}>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  if (block.type === "law") {
    return (
      <div className="arsip-law">
        <p className="arsip-law-ref">{block.ref}</p>
        <p className="arsip-law-text">{block.text}</p>
      </div>
    );
  }
  if (block.type === "heading") {
    return <h4 className="arsip-subheading">{block.text}</h4>;
  }
  if (block.type === "note") {
    return (
      <div className="arsip-note">
        <p className="arsip-note-title">{block.title}</p>
        <ItemList items={block.items} />
      </div>
    );
  }
  if (block.type === "list") {
    return (
      <div className="arsip-plain-section">
        <ItemList items={block.items} numbered={block.numbered} />
      </div>
    );
  }
  // section
  return (
    <div className="arsip-section">
      <p className="arsip-section-title">
        <span className="arsip-section-code">{block.code}.</span> {block.title}
      </p>
      <ItemList items={block.items} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Foto dokumentasi per nomor                                         */
/* ------------------------------------------------------------------ */

/**
 * Taruh foto kamu (format .webp) di /public/images/prosedur/ dengan nama
 * 01.webp, 02.webp, ... 12.webp — sesuai nomor urut prosedur di bawah.
 * Kalau file belum ada, kartu akan otomatis menampilkan placeholder rapi
 * (tidak akan error / merusak layout).
 */
function ProcedurePhoto({ number, title }: { number: number; title: string }) {
  const [failed, setFailed] = useState(false);
  const src = `/images/prosedur/${String(number).padStart(2, "0")}.webp`;
  const tilt = number % 2 === 0 ? "-1.4deg" : "1.4deg";

  return (
    <figure className="arsip-photo-card" style={{ transform: `rotate(${tilt})` }}>
      <div className="arsip-photo-frame">
        {!failed ? (
          <Image
            src={src}
            alt={`Dokumentasi ${title}`}
            fill
            sizes="220px"
            style={{ objectFit: "cover" }}
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="arsip-photo-placeholder">
            <ImageOff size={22} strokeWidth={1.5} />
            <span>Foto belum tersedia</span>
          </div>
        )}
      </div>
      <figcaption className="arsip-photo-caption">Dokumentasi — {title}</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Accordion item                                                     */
/* ------------------------------------------------------------------ */

function ProcedureRow({
  item,
  open,
  onToggle,
}: {
  item: ProcedureItem;
  open: boolean;
  onToggle: () => void;
}) {
  const lawBlocks = item.blocks.filter((b) => b.type === "law");
  const restBlocks = item.blocks.filter((b) => b.type !== "law");

  return (
    <div className="arsip-proc-row">
      <button className="arsip-proc-trigger" onClick={onToggle} aria-expanded={open}>
        <span className="arsip-proc-number">{String(item.number).padStart(2, "0")}</span>
        <span className="arsip-proc-title">{item.title}</span>
        <ChevronDown
          size={20}
          className="arsip-proc-chevron"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div className="arsip-proc-body">
          <div className="arsip-proc-top">
            <div className="arsip-proc-top-text">
              {lawBlocks.map((b, i) => (
                <BlockRenderer key={i} block={b} />
              ))}
            </div>
            <ProcedurePhoto number={item.number} title={item.title} />
          </div>
          <div className="arsip-proc-rest">
            {restBlocks.map((b, i) => (
              <BlockRenderer key={i} block={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function ProsedurHukum() {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const toggle = (n: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  };

  return (
    <main className="pb-5 bg-white min-vh-100 pt-5">
      <div className="container mt-5 pt-4" style={{ maxWidth: "880px" }}>
        {/* Kop halaman */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4">
          <p className="arsip-letterhead">PEMERINTAH DESA BOJONG</p>
          <h6
            className="fw-bold text-uppercase"
            style={{ color: "var(--accent)", letterSpacing: "2px" }}
          >
            LAYANAN WARGA
          </h6>
          <h1
            className="display-4 fw-bold mt-2"
            style={{ color: "var(--primary-dark)", fontFamily: "serif" }}
          >
            Prosedur Hukum
          </h1>
          <p className="text-muted mx-auto mt-3" style={{ maxWidth: "620px" }}>
            Dasar hukum, syarat, dan tata cara pengurusan dokumen kependudukan dan pencatatan
            sipil di Desa Bojong. Pilih salah satu topik di bawah untuk melihat rincian lengkap.
          </p>
        </div>

        {/* Daftar prosedur — dropdown list */}
        <div className="arsip-proc-list">
          {PROCEDURES.map((item) => (
            <ProcedureRow
              key={item.number}
              item={item}
              open={openIds.has(item.number)}
              onToggle={() => toggle(item.number)}
            />
          ))}
        </div>
      </div>

      {/* Styling — formal, kaku, sudut tegas, tanpa shadow/gradient */}
      <style>{`
        .arsip-letterhead {
          font-size: 0.7rem;
          letter-spacing: 3px;
          color: #6b6355;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .arsip-proc-list {
          border-top: 1px solid #c7c1b4;
        }
        .arsip-proc-row {
          border-bottom: 1px solid #c7c1b4;
        }
        .arsip-proc-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: transparent;
          border: none;
          padding: 1.1rem 0.25rem;
          text-align: left;
          cursor: pointer;
        }
        .arsip-proc-trigger:hover {
          background: #f7f5f0;
        }
        .arsip-proc-number {
          font-family: var(--font-inter), sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--primary-dark);
          border: 1px solid var(--primary-dark);
          width: 34px;
          height: 34px;
          min-width: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0;
        }
        .arsip-proc-title {
          flex: 1;
          font-family: serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--text-main, #1e293b);
        }
        .arsip-proc-chevron {
          color: var(--accent);
          transition: transform 0.15s ease;
          flex-shrink: 0;
        }
        .arsip-proc-body {
          padding: 0 0.25rem 2rem 3.25rem;
        }
        .arsip-proc-top {
          display: flex;
          gap: 1.75rem;
          align-items: flex-start;
          flex-wrap: wrap-reverse;
        }
        .arsip-proc-top-text {
          flex: 1 1 260px;
          min-width: 240px;
        }
        .arsip-proc-rest {
          margin-top: 0.5rem;
        }
        .arsip-photo-card {
          flex: 0 0 200px;
          margin: 0.25rem 0.5rem 0.5rem;
        }
        .arsip-photo-frame {
          position: relative;
          width: 200px;
          height: 240px;
          background: #f1efe9;
          border: 1px solid #d8d2c2;
          box-shadow: 0 8px 18px rgba(22, 35, 63, 0.12);
        }
        .arsip-photo-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          color: #a39d8c;
          font-size: 0.75rem;
          text-align: center;
          padding: 0 1rem;
        }
        .arsip-photo-caption {
          font-family: serif;
          font-style: italic;
          font-size: 0.78rem;
          color: #6b6355;
          text-align: center;
          margin-top: 0.6rem;
        }
        .arsip-subheading {
          font-family: var(--font-inter), sans-serif;
          font-weight: 700;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: #9c2963;
          margin: 1.9rem 0 0.9rem;
        }
        .arsip-subheading::after {
          content: "";
          display: block;
          width: 26px;
          height: 2px;
          background: #9c2963;
          margin-top: 0.4rem;
        }
        .arsip-law {
          border-left: 3px solid var(--primary-dark);
          background: #f7f5f0;
          padding: 0.9rem 1.1rem;
          margin-top: 1.25rem;
        }
        .arsip-law-ref {
          font-family: var(--font-inter), sans-serif;
          font-weight: 700;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--primary-dark);
          margin-bottom: 0.35rem;
        }
        .arsip-law-text {
          font-family: serif;
          font-style: italic;
          color: #2a2a26;
          margin-bottom: 0;
          line-height: 1.7;
        }
        .arsip-section {
          margin-top: 1.5rem;
        }
        .arsip-section-title {
          font-weight: 700;
          color: var(--text-main, #1e293b);
          margin-bottom: 0.6rem;
        }
        .arsip-section-code {
          color: var(--accent);
        }
        .arsip-plain-section {
          margin-top: 1rem;
        }
        .arsip-note {
          border: 1px solid #c7c1b4;
          padding: 1rem 1.1rem;
          margin-top: 1.5rem;
        }
        .arsip-note-title {
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 0.8rem;
          color: #6e2a2a;
          margin-bottom: 0.6rem;
        }
        .arsip-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .arsip-list > li {
          position: relative;
          padding-left: 1.1rem;
          margin-bottom: 0.55rem;
          line-height: 1.65;
          color: #2a2a26;
        }
        .arsip-list > li::before {
          content: "\\2013";
          position: absolute;
          left: 0;
          color: var(--accent);
        }
        .arsip-list-nested {
          margin-top: 0.5rem;
          margin-left: 0.2rem;
        }
        .arsip-list-nested > li::before {
          content: "\\00B7";
        }
        .arsip-list-numbered {
          list-style: decimal;
          padding-left: 1.25rem;
        }
        .arsip-list-numbered > li {
          padding-left: 0.35rem;
          margin-bottom: 0.55rem;
          line-height: 1.65;
          color: #2a2a26;
        }
      `}</style>
    </main>
  );
}