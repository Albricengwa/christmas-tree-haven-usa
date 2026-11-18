/* =========================================================================
   Christmas Tree Haven USA — Product catalogue
   -------------------------------------------------------------------------
   HOW TO ADD A NEW TREE
   1. Add an object to the PRODUCTS array below.
   2. Put the photographs in assets/img/.
   3. Copy one file in /products/ and update its details to match
      (this keeps each tree on its own SEO-friendly page).

   Only the three heights below have confirmed pricing. Do not add a
   price you have not agreed — leave it out and customers will be quoted
   through Messenger instead.
   ========================================================================= */

const PRODUCTS = [
  {
    id: "evergreen-classic-6ft",
    name: "The Evergreen Classic",
    slug: "products/evergreen-classic-6ft.html",
    style: "Red, ivory & gold",
    heightFt: 6,
    heightM: 1.8,
    price: 400,
    availability: "Available to order",
    featured: true,
    badge: "Most loved",
    images: [
      {
        src: "assets/img/hero-evergreen.jpg",
        alt: "The Evergreen Classic 6 ft artificial Christmas tree decorated with red, ivory and gold ornaments in a bright living room"
      },
      {
        src: "assets/img/tree-classic.jpg",
        alt: "Close view of the Evergreen Classic artificial Christmas tree with warm white lights and gold baubles"
      }
    ],
    summary:
      "A warm, traditional evergreen dressed in red, ivory and gold — the tree that makes a house feel like Christmas.",
    description:
      "The Evergreen Classic is our most versatile tree. A full evergreen silhouette is finished with deep red and soft ivory ornaments, warm gold baubles and warm-white lights, then crowned with a gold star. At six feet it suits a living room, entryway or dining room, and it arrives fully decorated exactly as photographed.",
    details: [
      "Decorations included, styled as shown",
      "Warm-white lights and gold tree topper",
      "Height 6 ft (1.80 m)",
      "Artificial evergreen — reusable year after year"
    ]
  },

  {
    id: "golden-hour-75ft",
    name: "The Golden Hour",
    slug: "products/golden-hour-75ft.html",
    style: "Champagne, white & gold",
    heightFt: 7.5,
    heightM: 2.28,
    price: 700,
    availability: "Available to order",
    featured: true,
    badge: "Signature",
    images: [
      {
        src: "assets/img/collection-ornament.jpg",
        alt: "The Golden Hour 7.5 ft artificial Christmas tree styled in champagne, white and gold with a gold star topper"
      },
      {
        src: "assets/img/tree-frosted.jpg",
        alt: "Detail of the Golden Hour artificial tree showing champagne ribbon, white florals and gold accents"
      }
    ],
    summary:
      "Our signature tree. Champagne ribbons, white florals and gold ornaments on a tall, full evergreen.",
    description:
      "The Golden Hour is the centrepiece of the collection. Layered champagne ribbon, hand-tied white florals and gold ornaments sit over a full, softly lit evergreen, crowned with a sculpted gold star and finished with beaded garland. At seven and a half feet it is made for double-height rooms, stairwells and grand entrances.",
    details: [
      "Decorations included, styled as shown",
      "Champagne ribbon, white florals and gold ornaments",
      "Warm-white lights and gold star topper",
      "Height 7.5 ft (2.28 m)",
      "Artificial evergreen — reusable year after year"
    ]
  },

  {
    id: "grand-noel-9ft",
    name: "The Grand Noel",
    slug: "products/grand-noel-9ft.html",
    style: "White, gold & black",
    heightFt: 9,
    heightM: 2.74,
    price: 1300,
    availability: "Available to order",
    featured: true,
    badge: "Statement",
    images: [
      {
        src: "assets/img/tree-grand.jpg",
        alt: "The Grand Noel 9 ft artificial Christmas tree in white, gold and black decorations in a two-storey foyer"
      },
      {
        src: "assets/img/hero-evergreen.jpg",
        alt: "The Grand Noel artificial Christmas tree styled with white florals and gold accents"
      }
    ],
    summary:
      "A nine-foot statement tree in white, gold and black — designed for foyers, stairwells and open living spaces.",
    description:
      "The Grand Noel is built for scale. A tall, full evergreen carries large white florals, gilded ornaments, black and white ribbon and a gold star, with warm-white lights throughout. At nine feet it fills a two-storey foyer, a staircase landing or a double-height living room, and it arrives fully decorated as photographed.",
    details: [
      "Decorations included, styled as shown",
      "Oversized florals, gilded ornaments and ribbon",
      "Warm-white lights and gold star topper",
      "Height 9 ft (2.74 m)",
      "Artificial evergreen — reusable year after year"
    ]
  }
];

/* Height range carried across the collection (approximately). */
const SIZE_RANGE = { minM: 1.5, maxM: 2.8 };
