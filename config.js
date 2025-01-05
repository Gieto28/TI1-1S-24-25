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
            name: "Barber Line Tesoura Corte 6,5' Profissional",
            price: "19,99",
            discount: 15,
            currency: "€",
            image: "assets/products/1.jpg",
            description: "Aço 440, Corte navalha, Acabamento manual, Grande dureza 59.61 HRC, Parafusos de ajuste, Estojo individual"
        },
        {
            id: 2,
            name: "Panasonic ER-HGP84 Máquina de corte profissional",
            price: "299,62",
            discount: 15,
            currency: "€",
            image: "assets/products/2.jpg",
            description: "Tecnologia de lâmina avançada para cortes de cabelo excepcionalmente eficazes."
        },
        {
            id: 3,
            name: "HUSH SECADOR IONICO PROFESIONAL RUNWAY 600",
            price: "99.99",
            discount: 15,
            currency: "€",
            image: "assets/products/3.jpg",
            description: "Secador de cabelo profissional com tecnologia avançada de íons negativos, para reduzir os tempos de secagem e eliminar o frizz do cabelo."
        },
        {
            id: 4,
            name: "Masa Lattafa Pride Eau de Parfum Unissex 100ml",
            price: "92,68",
            discount: 15,
            currency: "€",
            image: "assets/products/4.jpg",
            description: "Masa Lattafa Pride Eau de Parfum. Revele a sua elegância magnética com a fragrância Masa Eau de Parfum, de Lattafa Pride."
        },
        {
            id: 5,
            name: "Tondeo Contour Razor",
            price: "25,50",
            discount: 10,
            currency: "€",
            image: "assets/products/5.jpg",
            description: "A lâmina de contorno ideal para styling de precisão, especialmente projetada para profissionais."
        },
        {
            id: 6,
            name: "Gamma+ X-Ergo Clipper",
            price: "179,99",
            discount: 12,
            currency: "€",
            image: "assets/products/6.jpg",
            description: "Máquina de corte profissional com motor magnético turbo e ajuste de alavanca zero-gap."
        },
        {
            id: 7,
            name: "Barber Line Pente Antiestático",
            price: "9,99",
            discount: 5,
            currency: "€",
            image: "assets/products/7.jpg",
            description: "Pente antiestático de alta resistência para penteados perfeitos e sem frizz."
        },
        {
            id: 8,
            name: "Wahl Senior Cordless Máquina de Corte",
            price: "230,00",
            discount: 10,
            currency: "€",
            image: "assets/products/8.jpg",
            description: "Desempenho de corte de alto nível com design sem fio para máxima liberdade."
        },
        {
            id: 9,
            name: "Goldwell Dualsenses Serum Reparador",
            price: "29,95",
            discount: 15,
            currency: "€",
            image: "assets/products/9.jpg",
            description: "Soro reparador para cabelos danificados com tecnologia de microproteínas para reparação intensa."
        },
        {
            id: 10,
            name: "Jaguar White Line Tesoura Profissional",
            price: "79,99",
            discount: 20,
            currency: "€",
            image: "assets/products/10.jpg",
            description: "Tesoura profissional com lâminas afiadas à mão para cortes precisos e confiáveis."
        },
        {
            id: 11,
            name: "Revlon Professional Proyou The Lifter Shampoo 350ml",
            price: "12,99",
            discount: 10,
            currency: "€",
            image: "assets/products/11.jpg",
            description: "Shampoo volumizante para cabelos finos e sem vida. Fórmula rica em nutrientes."
        },
        {
            id: 12,
            name: "Babyliss Pro Skeleton Trimmer",
            price: "130,00",
            discount: 15,
            currency: "€",
            image: "assets/products/12.jpg",
            description: "Trimmer de alta precisão com design esqueleto para cortes perfeitos em qualquer ângulo."
        }
    ]    
};