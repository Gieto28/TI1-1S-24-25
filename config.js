export const config = {
  // Configurações de recursos e aparência
  featureFlags: {
    formPage: true, // Flag que habilita/desabilita a funcionalidade da página de formulário
  },
  isLightMode: true, // Define se o tema padrão é o modo claro
  language: "en", // Idioma padrão da aplicação
  languages: ["en", "es", "pt"], // Idiomas suportados

  // Lista de produtos disponíveis na aplicação, com id, nome, preço, desconto, tipo de moeda, imagem e descrição de cada produto
  products: [
    {
      id: 1,
      name: "Barber Line 6.5' Professional Cutting Scissors",
      price: "19.99",
      discount: 15,
      currency: "€",
      image: "assets/products/1.jpg",
      description:
        "440 Steel, Razor cut, Hand finish, High hardness 59.61 HRC, Adjustment screws, Individual case",
    },
    {
      id: 2,
      name: "Panasonic ER-HGP84 Professional Hair Clipper",
      price: "299.62",
      discount: 15,
      currency: "€",
      image: "assets/products/2.jpg",
      description:
        "Advanced blade technology for exceptionally efficient haircuts.",
    },
    {
      id: 3,
      name: "HUSH IONIC PROFESSIONAL RUNWAY 600 Hair Dryer",
      price: "99.99",
      discount: 15,
      currency: "€",
      image: "assets/products/3.jpg",
      description:
        "Professional hair dryer with advanced negative ion technology to reduce drying time and eliminate hair frizz.",
    },
    {
      id: 4,
      name: "Masa Lattafa Pride Eau de Parfum Unisex 100ml",
      price: "92.68",
      discount: 15,
      currency: "€",
      image: "assets/products/4.jpg",
      description:
        "Masa Lattafa Pride Eau de Parfum. Reveal your magnetic elegance with the Masa Eau de Parfum by Lattafa Pride.",
    },
    {
      id: 5,
      name: "Tondeo Contour Razor",
      price: "25.50",
      discount: 10,
      currency: "€",
      image: "assets/products/5.jpg",
      description:
        "The ideal contour blade for precision styling, specially designed for professionals.",
    },
    {
      id: 6,
      name: "Gamma+ X-Ergo Clipper",
      price: "179.99",
      discount: 12,
      currency: "€",
      image: "assets/products/6.jpg",
      description:
        "Professional hair clipper with turbo magnetic motor and zero-gap lever adjustment.",
    },
    {
      id: 7,
      name: "Barber Line Anti-Static Comb",
      price: "9.99",
      discount: 5,
      currency: "€",
      image: "assets/products/7.jpg",
      description:
        "High-resistance anti-static comb for perfect, frizz-free hairstyles.",
    },
    {
      id: 8,
      name: "Wahl Senior Cordless Hair Clipper",
      price: "230.14",
      discount: 10,
      currency: "€",
      image: "assets/products/8.jpg",
      description: "High-performance cordless clipper for maximum freedom.",
    },
    {
      id: 9,
      name: "Goldwell Dualsenses Repair Serum",
      price: "29.95",
      discount: 15,
      currency: "€",
      image: "assets/products/9.jpg",
      description:
        "Repair serum for damaged hair with microprotein technology for intense repair.",
    },
    {
      id: 10,
      name: "Jaguar White Line Professional Scissors",
      price: "79.99",
      discount: 20,
      currency: "€",
      image: "assets/products/10.jpg",
      description:
        "Professional scissors with hand-sharpened blades for precise and reliable cuts.",
    },
    {
      id: 11,
      name: "Revlon Professional Proyou The Lifter Shampoo 350ml",
      price: "12.99",
      discount: 10,
      currency: "€",
      image: "assets/products/11.jpg",
      description:
        "Volumizing shampoo for fine and lifeless hair. Nutrient-rich formula.",
    },
    {
      id: 12,
      name: "Babyliss Pro Skeleton Trimmer",
      price: "130.11",
      discount: 15,
      currency: "€",
      image: "assets/products/12.jpg",
      description:
        "High-precision trimmer with skeleton design for perfect cuts from any angle.",
    },
  ],
};
