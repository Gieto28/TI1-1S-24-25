/* 
Este ficheiro: Configuração de Produtos de E-commerce e Definições de Aparência

Descrição:
Este ficheiro JavaScript contém definições de configuração para a aplicação, incluindo detalhes de produtos, preferências de idioma, definições de tema e funcionalidades adicionais.
Armazena informações sobre produtos, como nome, preço, desconto, descrição e imagem. 
Também define o tema padrão (modo claro ou modo escuro) e suporta múltiplos idiomas.
*/

export const config = {
  // Configuração de funcionalidades e aparência
  featureFlags: {
    formPage: true, // Ativa ou desativa a funcionalidade da página de formulário
  },

  isLightMode: true, // Determina se o tema padrão é o modo claro (true para modo claro)

  language: "en", // Idioma padrão da aplicação (Inglês)
  languages: ["en", "es", "pt"], // Idiomas suportados (Inglês, Espanhol, Português)

  // Lista de produtos com detalhes como id, nome, preço, desconto, moeda, imagem e descrição
  products: [
    {
      id: 1, // Identificador único do produto
      name: "Barber Line 6.5' Professional Cutting Scissors", // Nome do produto
      price: "19.99", // Preço do produto
      discount: 15, // Percentagem de desconto
      currency: "€", // Moeda do preço (Euro)
      image: "assets/products/1.jpg", // Caminho para a imagem do produto
      description: // Descrição do produto
        "440 Steel, Razor cut, Hand finish, High hardness 59.61 HRC, Adjustment screws, Individual case", // Descrição do produto
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
      name: "Afrovida XXL Hydration Reconstruction Mask 1000ML",
      price: "25.50",
      discount: 10,
      currency: "€",
      image: "assets/products/5.jpg",
      description:
        "Progressive Brush / Extreme Volume Reduction, Repair and Shine - With Brazilian Keratin.",
    },
    {
      id: 6,
      name: "Depot - no. 101 Normalizing Daily Shampoo 250 ml",
      price: "179.99",
      discount: 12,
      currency: "€",
      image: "assets/products/6.jpg",
      description:
        "Toning shampoo, for normal hair, ideal for daily use.",
    },
    {
      id: 7,
      name: "Hot Towel Steamer Machine",
      price: "9.99",
      discount: 5,
      currency: "€",
      image: "assets/products/7.jpg",
      description:
        "Large capacity steam Jax Towel Warmer.",
    },
    {
      id: 8,
      name: "CK One Shock For Him",
      price: "230.14",
      discount: 10,
      currency: "€",
      image: "assets/products/8.jpg",
      description: "CK One Shock for Him by Calvin Klein is an 'Eau de Toilette' for men from the Oriental Spicy family.",
    },
    {
      id: 9,
      name: "Davidoff Cool Water",
      price: "29.95",
      discount: 15,
      currency: "€",
      image: "assets/products/9.jpg",
      description:
        "An experience that will not leave you indifferent if you are an adventurous, dynamic, vital and determined man.",
    },
    {
      id: 10,
      name: "Elegance Shaving Gel 2000 ml Jupiter",
      price: "79.99",
      discount: 20,
      currency: "€",
      image: "assets/products/10.jpg",
      description:
        "Upgrade your shaving routine with the best quality gel in the market.",
    },
    {
      id: 11,
      name: "Professional hair dryer",
      price: "149.99",
      discount: 10,
      currency: "€",
      image: "assets/products/11.jpg",
      description:
        "Ultra-lightweight professional hairdryer with anti-frizz negative ion technology for 2x faster blowouts and 50% more shine.",
    },
    {
      id: 12,
      name: "L'Oréal Professionnel Curl Expression Hair Rich Mask 250ml",
      price: "130.11",
      discount: 15,
      currency: "€",
      image: "assets/products/12.jpg",
      description:
        "A rich, buttery formula that melts into the curls for intense hydration, helps to leave the hair feeling nourished.",
    },
  ],
};
