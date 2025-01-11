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
  productList: [
    {
      id: 1, // Identificador único do produto
      name: "Barber Line 6.5' Professional Cutting Scissors", // Nome do produto
      price: "19.99", // Preço do produto
      discount: 15, // Percentagem de desconto
      currency: "€", // Moeda do preço (Euro)
      image: "assets/products/1.jpg", // Caminho para a imagem do produto
      // Descrição do produto
      description:
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
      description: "Toning shampoo, for normal hair, ideal for daily use.",
    },
    {
      id: 7,
      name: "Hot Towel Steamer Machine",
      price: "9.99",
      discount: 5,
      currency: "€",
      image: "assets/products/7.jpg",
      description: "Large capacity steam Jax Towel Warmer.",
    },
    {
      id: 8,
      name: "CK One Shock For Him",
      price: "230.14",
      discount: 10,
      currency: "€",
      image: "assets/products/8.jpg",
      description:
        "CK One Shock for Him by Calvin Klein is an 'Eau de Toilette' for men from the Oriental Spicy family.",
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
    {
      id: 13,
      name: "ZZMen TOP CUT hair clippers pack2 units",
      price: "94.10",
      discount: 15,
      currency: "€",
      image: "assets/products/13.jpg",
      description:
        "The Silver Pack includes a special Top Cut TC-00 professional cutting machine for precise cuts, and a special Top Cut Trimmer TCT-00 machine for finishing.",
    },
    {
      id: 14,
      name: "2-In-1 Shampoo and Conditioner Level 3",
      price: "14.15",
      discount: 15,
      currency: "€",
      image: "assets/products/14.jpg",
      description:
        "2-in-1 shampoo and conditioner enriched with keratin. Its formula cleans and conditions hair in a single step.",
    },
    {
      id: 15,
      name: "After Shave Amber Colony 400ML - Red One",
      price: "7.95",
      discount: 15,
      currency: "€",
      image: "assets/products/15.jpg",
      description:
        "Refreshing aftershave lotion with an amber scent, perfect for soothing and hydrating the skin after shaving.",
    },
    {
      id: 16,
      name: "Absolute Hitter Gammapiu Contouring Machine",
      price: "91.60",
      discount: 15,
      currency: "€",
      image: "assets/products/16.jpg",
      description:
        "40mm DLC black diamond carbon blade, made for a perfect and smooth cut.",
    },
    {
      id: 17,
      name: "Airbrush Rituals Hair Airbrush – Perfect Beauty",
      price: "78.97",
      discount: 10,
      currency: "€",
      image: "assets/products/17.jpg",
      description:
        "Professional hair brush, designed to ensure high precision in hair treatments and rituals such as oxygen therapy and application of active ingredients by spraying.",
    },
    {
      id: 18,
      name: "Aftershave Fresh 400ML Level 3",
      price: "10.82",
      discount: 12,
      currency: "€",
      image: "assets/products/18.jpg",
      description: "Instantly moisturizes and refreshes skin after shaving. Protects skin from scratches, cuts, irritations and rashes.",
    },
    {
      id: 19,
      name: "Aftershave Aqua 400ML Level 3",
      price: "10.82",
      discount: 5,
      currency: "€",
      image: "assets/products/19.jpg",
      description: "Instantly moisturizes and refreshes skin after shaving. Protects skin from scratches, cuts, irritations and rashes.",
    },
    {
      id: 20,
      name: "Andis Profoil Lithium Shaver",
      price: "145.76",
      discount: 10,
      currency: "€",
      image: "assets/products/20.jpg",
      description:
        "The Andis Profoil Lithium Shaver is suitable for beards and trims.",
    },
    {
      id: 21,
      name: "Al Nashama Lataffa Perfume Unisex 100ml",
      price: "6.99",
      discount: 15,
      currency: "€",
      image: "assets/products/21.jpg",
      description:
        "Immerse yourself in the exquisite elegance of Al Nashama Lataffa, a packaging that combines exclusive fragrance with elegant design.",
    },
    {
      id: 22,
      name: "Al Noble Safeer Lattafa Unissex 100ml (Original)",
      price: "44.39",
      discount: 20,
      currency: "€",
      image: "assets/products/22.jpg",
      description:
        "Let yourself be immersed by the distinction and elegance of Wazeer Al Noble Safeer, a 100 ml men's eau de parfum by Lattafa.",
    },
    {
      id: 23,
      name: "Hydroalcoholic Gel Alcohol 5 Liters",
      price: "11.00",
      discount: 10,
      currency: "€",
      image: "assets/products/23.jpg",
      description:
        "Effective hand sanitizer with high alcohol content, ideal for hygiene and disinfection in large-scale use.",
    },
    {
      id: 24,
      name: "All In – Bifull Multifunctional Barber Backpack",
      price: "148.83",
      discount: 15,
      currency: "€",
      image: "assets/products/24.jpg",
      description:
        "Versatile and spacious backpack designed for barbers, featuring compartments for tools and accessories, perfect for professional use and travel.",
    },
    {
      id: 25,
      name: "Al Noble Wazeer Lattafa Unissex 100ml (Original)",
      price: "38.13",
      discount: 15,
      currency: "€",
      image: "assets/products/25.jpg",
      description:
        "Top Notes Fresh and Vibrant: Top notes feature an enticing blend of mint, bitter orange, bergamot and juniper.",
    },
    {
      id: 26,
      name: "Ambre Bleu Lattafa Men 100ml (Original)",
      price: "34.44",
      discount: 15,
      currency: "€",
      image: "assets/products/26.jpg",
      description:
        "Discover the captivating allure of Lattafa Men's Rave Ambre Blue EDP Spray, a fragrance that embodies sophistication and strength.",
    },
    {
      id: 27,
      name: "Ana Abiyedh Rouge | Lattafa 60ml (Original)",
      price: "27.92",
      discount: 15,
      currency: "€",
      image: "assets/products/27.jpg",
      description:
        "Ana Abiyedh Rouge is a versatile and luxurious fragrance that combines freshness, sweetness and depth.",
    },
    {
      id: 28,
      name: "Andis Clipper Comb Black",
      price: "6.59",
      discount: 15,
      currency: "€",
      image: "assets/products/28.jpg",
      description:
        "The Andis Clipper Comb Black is the Andis comb specially designed for haircuts.",
    },
    {
      id: 29,
      name: "Andis Blade Zero Gapper",
      price: "57.99",
      discount: 15,
      currency: "€",
      image: "assets/products/29.jpg",
      description:
        "This convenient tool makes it easy to adjust your Andis blades to zero range, so you can get an even closer shave.",
    },
    {
      id: 30,
      name: "Ana Abiyedh White Lattafa Perfume Unissex 30ml (Original)",
      price: "21.22",
      discount: 15,
      currency: "€",
      image: "assets/products/30.jpg",
      description:
        "Immerse yourself in a universe of refinement and elegance with the captivating fragrance Ana Abiyedh by Lattafa.",
    },
    {
      id: 31,
      name: "Andis Premium 7-Comb Set",
      price: "60.84",
      discount: 15,
      currency: "€",
      image: "assets/products/31.jpg",
      description:
        "High-quality comb set with 7 attachments, designed for precise and versatile hair cutting with Andis clippers.",
    },
    {
      id: 32,
      name: "Andis Premium 9-Comb Set",
      price: "45.26",
      discount: 15,
      currency: "€",
      image: "assets/products/32.jpg",
      description:
        "Durable 9-piece comb set for Andis clippers, offering versatile and precise hair cutting options for professionals.",
    },
    {
      id: 33,
      name: "Andis Magnetic Comb Set",
      price: "52.32",
      discount: 15,
      currency: "€",
      image: "assets/products/33.jpg",
      description:
        "Premium magnetic attachment combs for Andis clippers, ensuring secure fit and precise cutting for professional styling.",
    },
    {
      id: 34,
      name: "Andis Cordless UsPro Li (Cutting Machine)",
      price: "174.29",
      discount: 15,
      currency: "€",
      image: "assets/products/34.jpg",
      description:
        "The Andis Cordless UsPro Li is a long-lasting cutting machine with a lithium battery, which can be used with or without a cord.",
    },
    {
      id: 35,
      name: "Andis Fade Brush",
      price: "6.77",
      discount: 15,
      currency: "€",
      image: "assets/products/35.jpg",
      description:
        "Soft bristle brush, perfect for cleaning gradient cutting areas while working.",
    },
    {
      id: 36,
      name: "Andis Cool Care - 5 in 1 Cooling Spray (439g)",
      price: "16.41",
      discount: 15,
      currency: "€",
      image: "assets/products/36.jpg",
      description:
        "The new 5 in 1 formula - cools, disinfects, lubricates, cleans and anti-rust",
    },
    {
      id: 37,
      name: "Andis Cordless Outliner Blade",
      price: "49.90",
      discount: 15,
      currency: "€",
      image: "assets/products/37.jpg",
      description:
        "High-performance replacement blade for Andis cordless trimmers, designed for precise outlining, detailing, and dry shaving.",
    },
    {
      id: 38,
      name: "Andis Blade In-Liner superliner rt1",
      price: "26.65",
      discount: 15,
      currency: "€",
      image: "assets/products/38.jpg",
      description:
        "Precision replacement blade for the Andis Superliner RT1 trimmer, ideal for clean outlining and detailed grooming.",
    },
    {
      id: 39,
      name: "Andis Master Cordless",
      price: "414.51",
      discount: 15,
      currency: "€",
      image: "assets/products/39.jpg",
      description:
        "Cordless cutting machine, adjustable precision blade 0.5 to 2.4mm, extremely powerful high-speed rotary motor.",
    },
    {
      id: 40,
      name: "Andis Fade",
      price: "115.19",
      discount: 15,
      currency: "€",
      image: "assets/products/40.jpg",
      description:
        "The Andis Fade is a powerful 7200 rpm magnetic motor machine with ergonomic design and excellent usability.",
    },
    {
      id: 41,
      name: "Andis Shaver Copper Blade Complete",
      price: "59.90",
      discount: 15,
      currency: "€",
      image: "assets/products/41.jpg",
      description:
        "Complete replacement copper blade for Andis shavers, designed for smooth and efficient shaving performance.",
    },
    {
      id: 42,
      name: "Andis Shaver Blade",
      price: "32.60",
      discount: 15,
      currency: "€",
      image: "assets/products/42.jpg",
      description:
        "High-quality replacement blade for Andis shavers, offering smooth, close shaving for a professional finish.",
    },
    {
      id: 43,
      name: "Andis Shaver Blade 2 Pack",
      price: "45.23",
      discount: 15,
      currency: "€",
      image: "assets/products/43.jpg",
      description:
        "Set of two high-quality replacement blades for Andis shavers, ensuring smooth, close shaves and long-lasting performance.",
    },
    {
      id: 44,
      name: "Andis Slimline Pro Li",
      price: "152.21",
      discount: 15,
      currency: "€",
      image: "assets/products/44.jpg",
      description:
        "Andis Slimline Pro Li is an extremely powerful machine, it offers a motor of 6,000 rpm.",
    },
    {
      id: 45,
      name: "Andis Slimline Pro Li Cutting Blade",
      price: "45.83",
      discount: 15,
      currency: "€",
      image: "assets/products/45.jpg",
      description:
        "Precision cutting blade designed for the Andis Slimline Pro Li trimmer, offering sharp, clean cuts for detailed grooming and outlining.",
    },
    {
      id: 46,
      name: "Andis Spray Blade care 7 in 1",
      price: "27.00",
      discount: 15,
      currency: "€",
      image: "assets/products/46.jpg",
      description:
        "This 7-in-1 product with vitamin E, enriched with cooling, deodorant, lubricant and cleaner formula prevents edge loss and decontamination.",
    },
    {
      id: 47,
      name: "Aplicador De Fibra Capilar Level 3",
      price: "20.79",
      discount: 15,
      currency: "€",
      image: "assets/products/47.jpg",
      description:
        "More control, less clutter. Hair Fiber Spray is the smart way to get great coverage.",
    },
    {
      id: 48,
      name: "Ansaam Silver Lattafa Unissex 100ml (Original)",
      price: "69.86",
      discount: 15,
      currency: "€",
      image: "assets/products/48.jpg",
      description:
        "Ansaam Silver by Lattafa Perfumes is a unisex fragrance from the Aromatic olfactory family launched in 2022.",
    },
    {
      id: 49,
      name: "Men Rock Matte High Hold Clay 30ML",
      price: "7.63",
      discount: 15,
      currency: "€",
      image: "assets/products/49.jpg",
      description:
        "Thick, fuller looking hairstyles, strong, long-lasting hold with a matte finish.",
    },
    {
      id: 50,
      name: "Fastsweep Jrl Hair Vacuum Cleaner",
      price: "210.95",
      discount: 15,
      currency: "€",
      image: "assets/products/50.jpg",
      description:
        "This powerful vacuum cleaner can tackle dirt with ease.",
    },
  ],
};
