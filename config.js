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
            name: "HUSH SECADOR IONICO PROFESIONAL RUNWAY 600",
            price: "99.99",
            discount: 15,
            currency: "€",
            image: "assets/products/3.jpg",
            description: "Secador de cabelo profissional com tecnologia avançada de íons negativos, para reduzir os tempos de secagem e eliminar o frizz do cabelo."
        },
        {
            id: 6,
            name: "Masa Lattafa Pride Eau de Parfum Unissex 100ml",
            price: "92,68",
            discount: 15,
            currency: "€",
            image: "assets/products/4.jpg",
            description: "Masa Lattafa Pride Eau de Parfum. Revele a sua elegância magnética com a fragrância Masa Eau de Parfum, de Lattafa Pride."
        },
    ]
};