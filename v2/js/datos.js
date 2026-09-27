/* ==========================================================
   Datos editables del sitio
   Para agregar o quitar una unidad o una entrega, editá estas
   listas. Las fotos van en img/unidades/ e img/entregas/ con
   dos tamaños: nombre-480.jpg / nombre-800.jpg (unidades) y
   nombre-600.jpg / nombre-1000.jpg (entregas).
   ========================================================== */
window.MAGUS = {
  whatsapp: '5493456521595',

  // Fotos del fondo en movimiento del inicio (cuadradas)
  unidades: [
    { marca: 'Ford',       modelo: 'Ranger',        tipo: 'camioneta', foto: 'ford-ranger',          alt: 'Ford Ranger gris al atardecer frente a la pared con el logo de Magus Vehículos' },
    { marca: 'Audi',       modelo: 'A5',            tipo: 'auto',      foto: 'audi-a5',              alt: 'Audi A5 coupé blanco frente a la pared con el logo de Magus Vehículos' },
    { marca: 'Honda',      modelo: 'CB300F Twister', tipo: 'moto',     foto: 'honda-cb300f-twister', alt: 'Moto Honda CB300F Twister gris con horquilla dorada frente al logo de Magus' },
    { marca: 'Toyota',     modelo: 'Corolla',       tipo: 'auto',      foto: 'toyota-corolla',       alt: 'Toyota Corolla blanco frente a la pared con el logo de Magus Vehículos' },
    { marca: 'Benelli',    modelo: '302S',          tipo: 'moto',      foto: 'benelli-302s',         alt: 'Moto Benelli 302S verde frente al logo iluminado de Magus' },
    { marca: 'Volkswagen', modelo: 'Saveiro',       tipo: 'camioneta', foto: 'volkswagen-saveiro',   alt: 'Volkswagen Saveiro blanca cabina extendida frente al logo de Magus' },
    { marca: 'Honda',      modelo: 'CBR 300R',      tipo: 'moto',      foto: 'honda-cbr-300r',       alt: 'Moto Honda CBR 300R negra frente al logo iluminado de Magus' },
    { marca: 'Chevrolet',  modelo: 'Prisma',        tipo: 'auto',      foto: 'chevrolet-prisma',     alt: 'Chevrolet Prisma gris plata frente a la pared con el logo de Magus' },
    { marca: 'Bajaj',      modelo: 'Rouser NS 200', tipo: 'moto',      foto: 'bajaj-rouser-ns200',   alt: 'Moto Bajaj Rouser NS 200 roja frente al logo iluminado de Magus' }
  ],

  entregas: [
    { vehiculo: 'Toyota Hilux',          foto: 'toyota-hilux',                alt: 'Entrega de una Toyota Hilux negra frente a la pared de Magus Vehículos' },
    { vehiculo: 'Benelli TRK 502X',      foto: 'benelli-trk-502x',            alt: 'Cliente recibiendo su moto Benelli TRK 502X roja con baúl' },
    { vehiculo: 'Ford Ranger',           foto: 'ford-ranger',                 alt: 'Entrega de una Ford Ranger blanca al atardecer, con el logo iluminado de fondo' },
    { vehiculo: 'Honda XR 300L Tornado', foto: 'honda-xr-300l-tornado',       alt: 'Cliente recibiendo su moto Honda XR 300L Tornado roja bajo el logo iluminado' },
    { vehiculo: 'Ford Focus',            foto: 'ford-focus',                  alt: 'Entrega de un Ford Focus gris frente a la pared de Magus Vehículos' },
    { vehiculo: 'Bajaj Dominar',         foto: 'bajaj-dominar',               alt: 'Cliente junto a su moto Bajaj Dominar negra con parabrisas' },
    { vehiculo: 'Toyota Corolla y Honda CB300F', foto: 'toyota-corolla-honda-cb300f', alt: 'Entrega de un Toyota Corolla blanco y una moto Honda CB300F' }
  ]
};
