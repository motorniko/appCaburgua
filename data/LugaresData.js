export const lugaresData = [
 
    //---------------------------------------------------------------------
    // TURISMO
    //---------------------------------------------------------------------
  {
    id: 1,
    title: 'Turismo',
    icon: 'hiking',
    color: '#00008B',
    order: 1,
    enable: true,

    items: [

        //MIRADOR DE PECES
      {
        id: 1,
        slug: "mirador-de-peces",
        title: "Mirador de peces",
        description: "Punto turistico",
        enable: true,
        icon: "fish",
        imagenLogo: require("../assets/miradorDePeces/Logo.jpg"),
        colorFondo: "#00008B",
        colorPrincipal: "#00008B",
        colorLogo:"white",
        coordenadas: { lat: -39.226741, lng: -71.8197409 },
        servicios: [
          { icon: "forest", text: "Senderos naturales por orilla del rio" },
          { icon: "camera", text: "Miradores a piscinas de peces" },
          { icon: "fish", text: "Trucha arcoiris" },
          { icon: "car", text: "Estacionamiento gratuito" },
          { icon: "food", text: "servicios de comida"},
        ],
        galeria: [
          require("../assets/miradorDePeces/img1.png"),
          require("../assets/miradorDePeces/img2.png"),
          require("../assets/miradorDePeces/img3.jpg"),
          require("../assets/miradorDePeces/img4.jpg"),
          require("../assets/miradorDePeces/img5.jpg"),
          require("../assets/miradorDePeces/img6.jpg"),
        ],
        horario: [
          "Lunes a Viernes: 09:00 - 18:00",
          "Sábado: 09:00 - 18:00",
        ],

        valores: [
         "Adultos: 2000.",
         "Adulto Mayor: 1500.",
         "Menores de 6 años: Gratis.",
         "Todo medio de pago."
        ],

        contacto: {
          telefono: "+5690489372",
          instagram: "Instagram@miradordepeces",
        },
        instagramUrl: "https://www.instagram.com/miradordepeces",
      },

      //Ojos de caburgua

      {
        id: 2,
        slug: "ojos-de-caburgua",
        title: "ojos de caburgua",
        description: "Punto turistico",
        enable: true,
        icon: "waterfall",
        imagenLogo: require("../assets/servicios.png"),
        colorFondo: "#00008B",
        colorPrincipal: "#00008B",
        colorLogo:"white",
        coordenadas: { lat: -39.226741, lng: -71.8197409 },
        servicios: [
          { icon: "forest", text: "Senderos naturales y pasarelas con miradores" },
          { icon: "camera", text: "Saltos de agua" },
          { icon: "fish", text: "Mirador a ojos de caburgua" },
          { icon: "car", text: "Mirador a  laguna azul" },
          { icon: "food", text: "servicios de comida"},
        ],
        galeria: [
          require("../assets/miradorDePeces/img1.png"),
          require("../assets/miradorDePeces/img2.png"),
          require("../assets/miradorDePeces/img3.jpg"),
          require("../assets/miradorDePeces/img4.jpg"),
          require("../assets/miradorDePeces/img5.jpg"),
          require("../assets/miradorDePeces/img6.png"),
        ],
        horario: [
          "Lunes a Viernes: 09:00 hrs - 18:00 hrs.", 
          "Sábado y Domingo: 09:00 hrs - 18:00 hrs.",
        ],

        valores: [
         "Adultos: 2000.",
         "Niños:   3000.",
         " ",
         "Todo medio de pago"
        ],

        contacto: {
          telefono: "+56 9 3896 4430",
          instagram: "Instagram@miradordepeces",
        },
        instagramUrl: "https://www.instagram.com/miradordepeces",
      },
    ],
    },

   //---------------------------------------------------------------------
    // TRANSPORTE
    //---------------------------------------------------------------------

    {
      id: 2,
      title: 'Transporte',
      icon: 'bus',
      color: '#093703',
      order: 2,
      enable: true,
  
      items: [
  
        {
          id: 1,
          slug: "buses-caburgua",
          title: "Buses Caburgua",
          description: "Punto turistico",
          enable: true,
          icon: "fish",
          imagenLogo: require("../assets/servicios.png"),
          colorFondo: "#093703",
          colorPrincipal: "#093703",
          colorLogo:"green",

          coordenadas: { lat: -39.226741, lng: -71.8197409 },
          servicios: [
            { icon: "forest", text: "Senderos naturales por orilla del rio" },
            { icon: "camera", text: "Miradores a piscinas de peces" },
            { icon: "fish", text: "Trucha arcoiris" },
            { icon: "car", text: "Estacionamiento gratuito" },
            { icon: "food", text: "servicios de comida"},
          ],
          galeria: [
            require("../assets/miradorDePeces/img1.png"),
            require("../assets/miradorDePeces/img2.png"),
            require("../assets/miradorDePeces/img3.jpg"),
            require("../assets/miradorDePeces/img4.jpg"),
            require("../assets/miradorDePeces/img5.jpg"),
            require("../assets/miradorDePeces/img6.jpg"),
          ],
          horario: [
            "Lunes a Viernes: 09:00 - 18:00",
            "Sábado: 09:00 - 18:00",
          ],

          valores: [
            
          ],

          contacto: {
            telefono: "+56 9 9351 2606",
            instagram: "Instagram@miradordepeces",
          },
          instagramUrl: "https://www.instagram.com/miradordepeces",
        },
      ],
      },

   //---------------------------------------------------------------------
   // NEGOCIOS
   //---------------------------------------------------------------------

   {
    id: 3,
    title: 'Negocios',
    icon: 'storefront',
    color: '#FFA500',
    order: 3,
    enable: true,

    items: [

      {
        id: 1,
          slug: "el-refugio",
          title: "El refugio",
          description: "Negocio local",
          enable: true,
          icon: "storenfront",
          imagenLogo: require("../assets/servicios.png"),
          colorFondo: "#00008B",
          colorPrincipal: "#00008B",
          coordenadas: { lat: -39.226741, lng: -71.8197409 },
          servicios: [
            { icon: "forest", text: "Senderos naturales por orilla del rio" },
            { icon: "camera", text: "Miradores a piscinas de peces" },
            { icon: "fish", text: "Trucha arcoiris" },
            { icon: "car", text: "Estacionamiento gratuito" },
            { icon: "food", text: "servicios de comida"},
          ],
          galeria: [
            require("../assets/miradorDePeces/img1.png"),
            require("../assets/miradorDePeces/img2.png"),
            require("../assets/miradorDePeces/img3.jpg"),
            require("../assets/miradorDePeces/img4.jpg"),
            require("../assets/miradorDePeces/img5.jpg"),
            require("../assets/miradorDePeces/img6.jpg"),
          ],
          horario: [
            "Lunes a Viernes: 09:00 - 18:00",
            "Sábado: 09:00 - 18:00",
          ],

          valores: [
            
          ],

          contacto: {
            telefono: "+56 9 9351 2606",
            instagram: "Instagram@miradordepeces",
          },
          instagramUrl: "https://www.instagram.com/miradordepeces",
      },
    ],
    },


   //---------------------------------------------------------------------
   // CABAÑAS
   //---------------------------------------------------------------------

   {
    id: 4,
    title: 'Cabañas',
    icon: 'home-group',
    color: '#FFA500',
    order: 4,
    enable: true,

    items: [

      {

        id: 1,
          slug: "jardines-de-caburgua",
          title: "Jardines de caburgua",
          description: "Complejo de cabañas",
          enable: true,
          icon: "home-group",
          imagenLogo: require("../assets/servicios.png"),
          colorFondo: "#00008B",
          colorPrincipal: "#00008B",
          coordenadas: { lat: -39.226741, lng: -71.8197409 },
          servicios: [
            { icon: "forest", text: "Senderos naturales por orilla del rio" },
            { icon: "camera", text: "Miradores a piscinas de peces" },
            { icon: "fish", text: "Trucha arcoiris" },
            { icon: "car", text: "Estacionamiento gratuito" },
            { icon: "food", text: "servicios de comida"},
          ],
          galeria: [
            require("../assets/miradorDePeces/img1.png"),
            require("../assets/miradorDePeces/img2.png"),
            require("../assets/miradorDePeces/img3.jpg"),
            require("../assets/miradorDePeces/img4.jpg"),
            require("../assets/miradorDePeces/img5.jpg"),
            require("../assets/miradorDePeces/img6.jpg"),
          ],
          horario: [
            "Lunes a Viernes: 09:00 - 18:00",
            "Sábado: 09:00 - 18:00",
          ],

          valores: [
            
          ],

          contacto: {
            telefono: "+56 9 9351 2606",
            instagram: "Instagram@miradordepeces",
          },
          instagramUrl: "https://www.instagram.com/miradordepeces",
        
      },
    ],
    },


   //---------------------------------------------------------------------
   // CAMPING
   //---------------------------------------------------------------------

   {
    id: 5,
    title: 'Camping',
    icon: 'campfire',
    color: '#00008B',
    order: 5,
    enable: true,

    items: [

      {

        id: 1,
        slug: "el-buen-amigo",
        title: "El buen amigo",
        description: "Camping",
        enable: true,
        icon: "storenfront",
        imagenLogo: require("../assets/servicios.png"),
        colorFondo: "#00008B",
        colorPrincipal: "#00008B",
        coordenadas: { lat: -39.226741, lng: -71.8197409 },
        servicios: [
          { icon: "forest", text: "Senderos naturales por orilla del rio" },
          { icon: "camera", text: "Miradores a piscinas de peces" },
          { icon: "fish", text: "Trucha arcoiris" },
          { icon: "car", text: "Estacionamiento gratuito" },
          { icon: "food", text: "servicios de comida"},
        ],
        galeria: [
          require("../assets/miradorDePeces/img1.png"),
          require("../assets/miradorDePeces/img2.png"),
          require("../assets/miradorDePeces/img3.jpg"),
          require("../assets/miradorDePeces/img4.jpg"),
          require("../assets/miradorDePeces/img5.jpg"),
          require("../assets/miradorDePeces/img6.jpg"),
        ],
        horario: [
          "Lunes a Viernes: 09:00 - 18:00",
          "Sábado: 09:00 - 18:00",
        ],

        valores: [
          
        ],

        contacto: {
          telefono: "+56 9 9351 2606",
          instagram: "Instagram@miradordepeces",
        },
        instagramUrl: "https://www.instagram.com/miradordepeces",
        
      },
    ],
    },


   //---------------------------------------------------------------------
   // CULTURA
   //---------------------------------------------------------------------

   {
    id: 6,
    title: 'Cultura',
    icon: 'theater',
    color: '#093703',
    order: 6,
    enable: true,

    items: [

      {
        id: 1,
        slug: "brotes-de-paillaco",
        title: "Brotes de Paillaco",
        description: "Club folclorico local",
        enable: true,
        icon: "dance-ballroom",
        imagenLogo: require("../assets/Cultura/Brotes de paillaco/Logo.jpg"),
        colorFondo: "#093703",
        colorPrincipal: "#093703",
        coordenadas: { lat: -39.226741, lng: -71.8197409 },
        servicios: [
          { icon: "forest", text: "Senderos naturales por orilla del rio" },
          { icon: "camera", text: "Miradores a piscinas de peces" },
          { icon: "fish", text: "Trucha arcoiris" },
          { icon: "car", text: "Estacionamiento gratuito" },
          { icon: "food", text: "servicios de comida"},
        ],
        galeria: [
          require("../assets/miradorDePeces/img1.png"),
          require("../assets/miradorDePeces/img2.png"),
          require("../assets/miradorDePeces/img3.jpg"),
          require("../assets/miradorDePeces/img4.jpg"),
          require("../assets/miradorDePeces/img5.jpg"),
          require("../assets/miradorDePeces/img6.jpg"),
        ],
        horario: [
          "Lunes a Viernes: 09:00 - 18:00",
          "Sábado: 09:00 - 18:00",
        ],

        valores: [
          
        ],

        contacto: {
          telefono: "+56 9 9351 2606",
          instagram: "Instagram@miradordepeces",
        },
        instagramUrl: "https://www.instagram.com/miradordepeces",
        
      },
    ],
    },


   //---------------------------------------------------------------------
   // SERVICIOS
   //---------------------------------------------------------------------

   {
    id: 7,
    title: 'Servicios',
    icon: 'tools',
    color: '#00008B',
    order: 7,
    enable: true,

    items: [

      {

        id: 1,
        slug: "jq-servicios",
        title: "Jq servicios",
        description: "Servicios automotrices",
        enable: true,
        icon: "storenfront",
        imagenLogo: require("../assets/servicios.png"),
        colorFondo: "#00008B",
        colorPrincipal: "#00008B",
        coordenadas: { lat: -39.226741, lng: -71.8197409 },
        servicios: [
          { icon: "forest", text: "Senderos naturales por orilla del rio" },
          { icon: "camera", text: "Miradores a piscinas de peces" },
          { icon: "fish", text: "Trucha arcoiris" },
          { icon: "car", text: "Estacionamiento gratuito" },
          { icon: "food", text: "servicios de comida"},
        ],
        galeria: [
          require("../assets/miradorDePeces/img1.png"),
          require("../assets/miradorDePeces/img2.png"),
          require("../assets/miradorDePeces/img3.jpg"),
          require("../assets/miradorDePeces/img4.jpg"),
          require("../assets/miradorDePeces/img5.jpg"),
          require("../assets/miradorDePeces/img6.jpg"),
        ],
        horario: [
          "Lunes a Viernes: 09:00 - 18:00",
          "Sábado: 09:00 - 18:00",
        ],

        valores: [
          
        ],

        contacto: {
          telefono: "+56 9 9351 2606",
          instagram: "Instagram@miradordepeces",
        },
        instagramUrl: "https://www.instagram.com/miradordepeces",
        
      },
    ],
    },

   //---------------------------------------------------------------------
   // GASTRONOMIA
   //---------------------------------------------------------------------
   
   {
    id: 8,
    title: 'Gastronomia',
    icon: 'food',
    color: '#093703',
    order: 8,
    enable: true,

    items: [

      {

        id: 1,
        slug: "la-fogata",
        title: "La fogata",
        description: "Pub restaurant",
        enable: true,
        icon: "storenfront",
        imagenLogo: require("../assets/servicios.png"),
        colorFondo: "#00008B",
        colorPrincipal: "#00008B",
        coordenadas: { lat: -39.226741, lng: -71.8197409 },
        servicios: [
          { icon: "forest", text: "Senderos naturales por orilla del rio" },
          { icon: "camera", text: "Miradores a piscinas de peces" },
          { icon: "fish", text: "Trucha arcoiris" },
          { icon: "car", text: "Estacionamiento gratuito" },
          { icon: "food", text: "servicios de comida"},
        ],
        galeria: [
          require("../assets/miradorDePeces/img1.png"),
          require("../assets/miradorDePeces/img2.png"),
          require("../assets/miradorDePeces/img3.jpg"),
          require("../assets/miradorDePeces/img4.jpg"),
          require("../assets/miradorDePeces/img5.jpg"),
          require("../assets/miradorDePeces/img6.jpg"),
        ],
        horario: [
          "Lunes a Viernes: 09:00 - 18:00",
          "Sábado: 09:00 - 18:00",
        ],

        valores: [
          
        ],

        contacto: {
          telefono: "+56 9 9351 2606",
          instagram: "Instagram@miradordepeces",
        },
        instagramUrl: "https://www.instagram.com/miradordepeces",
        
      },
    ],
    },

   //---------------------------------------------------------------------
   // PASEOS Y TOURS
   //---------------------------------------------------------------------

   {
    id: 9,
    title: 'Paseos y Tours',
    icon: 'map-marker-radius',
    color: '#FFA500',
    order: 9,
    enable: true,

    items: [

      {

        id: 1,
        slug: "trail-motorcicle",
        title: "Trail motorcicle",
        description: "Tur en motoclitas",
        enable: true,
        icon: "storenfront",
        imagenLogo: require("../assets/servicios.png"),
        colorFondo: "#00008B",
        colorPrincipal: "#00008B",
        coordenadas: { lat: -39.226741, lng: -71.8197409 },
        servicios: [
          { icon: "forest", text: "Senderos naturales por orilla del rio" },
          { icon: "camera", text: "Miradores a piscinas de peces" },
          { icon: "fish", text: "Trucha arcoiris" },
          { icon: "car", text: "Estacionamiento gratuito" },
          { icon: "food", text: "servicios de comida"},
        ],
        galeria: [
          require("../assets/miradorDePeces/img1.png"),
          require("../assets/miradorDePeces/img2.png"),
          require("../assets/miradorDePeces/img3.jpg"),
          require("../assets/miradorDePeces/img4.jpg"),
          require("../assets/miradorDePeces/img5.jpg"),
          require("../assets/miradorDePeces/img6.jpg"),
        ],
        horario: [
          "Lunes a Viernes: 09:00 - 18:00",
          "Sábado: 09:00 - 18:00",
        ],

        valores: [
          
        ],
        contacto: {
          telefono: "+56 9 9351 2606",
          instagram: "Instagram@miradordepeces",
        },
        instagramUrl: "https://www.instagram.com/miradordepeces",
        
      },
    ],
    },


   //---------------------------------------------------------------------
   // SALUD
   //---------------------------------------------------------------------

  {
    id: 10,
    title: 'Salud',
    icon: 'hospital-box',
    color: '#FF0000',
    order: 10,
    enable: true,

    items: [

      {

        id: 1,
        slug: "cecof-caburgua",
        title: "Cecof Caburgua",
        description: "Centro de salud local",
        enable: true,
        icon: "storenfront",
        imagenLogo: require("../assets/servicios.png"),
        colorFondo: "#00008B",
        colorPrincipal: "#00008B",
        coordenadas: { lat: -39.226741, lng: -71.8197409 },
        servicios: [
          { icon: "forest", text: "Senderos naturales por orilla del rio" },
          { icon: "camera", text: "Miradores a piscinas de peces" },
          { icon: "fish", text: "Trucha arcoiris" },
          { icon: "car", text: "Estacionamiento gratuito" },
          { icon: "food", text: "servicios de comida"},
        ],
        galeria: [
          require("../assets/miradorDePeces/img1.png"),
          require("../assets/miradorDePeces/img2.png"),
          require("../assets/miradorDePeces/img3.jpg"),
          require("../assets/miradorDePeces/img4.jpg"),
          require("../assets/miradorDePeces/img5.jpg"),
          require("../assets/miradorDePeces/img6.jpg"),
        ],
        horario: [
          "Lunes a Viernes: 09:00 - 18:00",
          "Sábado: 09:00 - 18:00",
        ],

        valores: [
          
        ],

        contacto: {
          telefono: "+56 9 9351 2606",
          instagram: "Instagram@miradordepeces",
        },
        instagramUrl: "https://www.instagram.com/miradordepeces",
        
      },
    ],
    },


   //---------------------------------------------------------------------
   // ESTACIONAMIENTO
   //---------------------------------------------------------------------

   {
    id: 11,
    title: 'Estacionamientos',
    icon: 'car',
    color: '#FFA500',
    order: 11,
    enable: true,

    items: [

      {
        
      },
    ],
    },


   //---------------------------------------------------------------------
   // EMERGENCIAS
   //---------------------------------------------------------------------

   {
    id: 12,
    title: "Emergencias",
    icon: "alarm-light",
    color: '#FF0000',
    order: 12,
    enable: true,

    // 👇 Esto indica que se abre directamente un componente
    screen: "EmergenciasScreen",
  },
]
