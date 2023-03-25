# 3D-WebGL-Hollow-Object

> Disusun untuk memenuhi Tugas 2 IF3260 Grafika Komputer 3D WebGL Hollow Object

## Daftar Isi

- [Deskripsi Singkat](#deskripsi-singkat)
- [Struktur Program](#struktur-program)
- [Fitur Program](#fitur-program)
- [Cara Instalasi Program](#cara-instalasi-program)
- [Cara Menjalankan Program](#cara-menjalankan-program)

## Deskripsi Singkat

WebGL merupakan kakas dengan spesialisasi pada ranah grafika yang dapat dengan mudah diintegrasikan pada web. Dengan menggunakan WebGL, kita dapat mengimplementasikan web dengan fitur menggambar, mengedit, dan memvisualisasikan sejumlah model pada kanvas HTML. Selain itu, WebGL juga mengutilitasikan GPU untuk melakukan rendering dan transformasi geometri. Oleh karena itu, aplikasi 3D Web Based Hollow Object menggunakan WebGL sebagai tools untuk memodelkan berbagai bentuk geometri.

## Struktur Program

```
.
├── LICENSE
├── README.md
├── nodemon.json
├── package.json
├── public
│   ├── dist
│   │   └── index.js
│   ├── images
│   │   └── logo.svg
│   ├── index.html
│   └── styles
│       └── index.css
├── shapes
│   ├── cube.json
│   ├── pyramid.json
│   └── tube.json
├── src
│   ├── Constants
│   │   └── closest-to-zero.ts
│   ├── Factories
│   │   ├── color-factory.ts
│   │   ├── face-factory.ts
│   │   ├── point-factory.ts
│   │   ├── shape-factory.ts
│   │   └── vector-factory.ts
│   ├── Files
│   │   ├── file-handling.ts
│   │   └── file-system.ts
│   ├── Interfaces
│   │   ├── camera-interface.ts
│   │   ├── color-interface.ts
│   │   ├── coordinate-interface.ts
│   │   ├── face-interface.ts
│   │   ├── light-interface.ts
│   │   ├── matrix-interface.ts
│   │   ├── point-interface.ts
│   │   ├── shape-interface.ts
│   │   ├── transformation-interface.ts
│   │   └── vector-interface.ts
│   ├── Objects
│   │   ├── camera.ts
│   │   ├── face.ts
│   │   ├── light.ts
│   │   └── shape.ts
│   ├── Operations
│   │   ├── color.ts
│   │   ├── coordinate.ts
│   │   ├── matrix.ts
│   │   ├── point.ts
│   │   ├── projection.ts
│   │   ├── transformation.ts
│   │   └── vector.ts
│   ├── Types
│   │   ├── projection-params.ts
│   │   ├── projection-type.ts
│   │   └── shader-status.ts
│   ├── Utils
│   │   ├── angle.ts
│   │   ├── program.ts
│   │   ├── resize-canvas.ts
│   │   └── shader.ts
│   ├── default-ambient-color.ts
│   ├── default-camera.ts
│   ├── default-directional-light.ts
│   └── index.ts
├── tsconfig.json
├── webpack.config.js
└── yarn.lock
```

## Fitur Program

1. Pemodelan Hollow Object (Kubus, Piramida, dan Tabung)
2. Penyimpanan dan Pengunggahan Model Hollow Object dengan Format `.json`
3. Penerapan Teknik Transformasi Geometri (Translasi, Rotasi, Skala)
4. Penerapan Teknik Proyeksi _Orthographic_, _Perspective_, dan _Oblique_
5. Penerapan Teknik Transformasi Kamera (Translasi dan Rotasi)
6. Penerapan Teknik Pencahayaan (Ambient dan Directional)
7. Animasi Model Hollow Object

## Cara Instalasi Program

1. Lakukan `git clone` terhadap repository ini
2. Jalankan perintah `yarn install` pada terminal untuk menginstalasi _library_ pendukung bahasa TypeScript

## Cara Menjalankan Program

1. Jalankan perintah `yarn nodemon` untuk menjalankan kompilasi secara _hot reload_
2. Buka browser dan akses `localhost` untuk melihat hasil kompilasi
3. Dapat juga diakses menggunakan pranala berikut [ini](https://rayhankinan.github.io/3D-WebGL-Hollow-Object/public/)
