export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  includes?: string[];
  serves?: string;
  image?: string;
}

export interface MenuCategory {
  name: string;
  icon: string;
  note?: string;
  image?: string;
  items: MenuItem[];
}

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=600&h=400&fit=crop`;

export const menuData: MenuCategory[] = [
  {
    name: "Breakfast",
    icon: "🌅",
    image: IMG("photo-1533089860892-a7c6f0a38266"),
    items: [
      {
        name: "Full English Breakfast",
        price: 20000,
        image: IMG("photo-1533089860892-a7c6f0a38266"),
        includes: ["Sausage", "Bacon", "Baked Beans", "Egg", "Toast Bread", "Grilled Tomatoes", "Mushroom"],
      },
      {
        name: "Luxury Seapride",
        price: 25000,
        image: IMG("photo-1551218808-94e220e084d2"),
        includes: ["Potato Sauté", "Yam Chips", "Broccoli", "Mini Club Sandwich", "Sausage", "Smoked Titus Seafood Sauce", "Grilled Prawns"],
      },
      {
        name: "French Toast",
        price: 15000,
        includes: ["Spanish Omelette", "Sausage", "Baked Beans", "Bread Toast with Egg"],
      },
      {
        name: "Deluxe Breakfast",
        price: 25000,
        image: IMG("photo-1551218808-94e220e084d2"),
        includes: ["Pancake", "Waffle", "Scrambled Egg", "Hot Dog Sausage", "Baked Beans"],
      },
      {
        name: "Club Sandwich",
        price: 15000,
        includes: ["Grilled Fillet Chicken", "Sausage", "Bacon", "Lettuce", "Egg", "Bread"],
      },
    ],
  },
  {
    name: "Starters",
    icon: "🥗",
    image: IMG("photo-1546069901-ba9599a7e63c"),
    items: [
      {
        name: "Prawn Cocktail Salad",
        price: 20000,
        image: IMG("photo-1546069901-ba9599a7e63c"),
        includes: ["Grilled Prawns", "Lettuce", "Cucumber", "Fresh Tomatoes", "Cocktail Sauce"],
      },
      {
        name: "Salmon Fish Salad",
        price: 25000,
        image: IMG("photo-1546069901-ba9599a7e63c"),
        includes: ["Grilled Salmon Fish", "Lettuce", "Lime", "Fresh Tomatoes", "Runner Beans"],
      },
      {
        name: "Seafood Salad",
        price: 25000,
        includes: ["Calamari", "Shrimps", "Lettuce", "Cabbage", "Carrot", "Mushroom", "Lime", "Fresh Tomatoes", "Vinaigrette Sauce"],
      },
      {
        name: "Seapride Special Salad",
        price: 25000,
        includes: ["Prawns", "Shrimps", "Fish Fillet", "Lettuce", "Cabbage", "Carrot", "Tomatoes", "Cucumber", "Calamari"],
      },
    ],
  },
  {
    name: "Soups",
    icon: "🍜",
    image: IMG("photo-1547592166-23ac45744acd"),
    items: [
      {
        name: "Ministro Soup",
        price: 15000,
        image: IMG("photo-1547592166-23ac45744acd"),
        includes: ["Shrimps", "Carrot", "Baby Marrow", "Noodles", "Tomato Paste"],
      },
      {
        name: "Asian Sea Broth",
        price: 20000,
        image: IMG("photo-1547592166-23ac45744acd"),
        includes: ["Carrot", "Prawns", "Crabs", "Marrow", "Leeks", "Macaroni"],
      },
    ],
  },
  {
    name: "Seafood Platters",
    icon: "🦞",
    image: IMG("photo-1559737558-2f5a35f4523b"),
    items: [
      {
        name: "Catch of the Bite",
        price: 20000,
        image: IMG("photo-1559737558-2f5a35f4523b"),
        includes: ["Crabs", "Prawns", "Snails"],
        serves: "1–2 People",
      },
      {
        name: "Seaside Nibbles",
        price: 50000,
        image: IMG("photo-1604503468506-a8da13d82791"),
        includes: ["Crabs", "Prawns", "Snails", "Lobsters"],
        serves: "3–4 People",
      },
      {
        name: "Cajun Seafood Boil",
        price: 70000,
        image: IMG("photo-1559737558-2f5a35f4523b"),
        includes: ["Assorted Seafood", "Cajun Sauce"],
        serves: "3–4 People",
      },
      {
        name: "Sea's Bounty Platter",
        price: 100000,
        image: IMG("photo-1604503468506-a8da13d82791"),
        includes: ["Crabs", "Prawns", "Snails", "Calamari", "Lobster", "Potatoes", "Sweet Corn", "Free Drink"],
        serves: "4–6 People",
      },
      {
        name: "Seafarer's Feast",
        price: 200000,
        image: IMG("photo-1559737558-2f5a35f4523b"),
        includes: ["Crabs", "Prawns", "Snails", "Shrimps", "Lobster", "Sweet Corn", "Potatoes", "Egg", "2 Canned Drinks"],
        serves: "5–10 People",
      },
      {
        name: "The Seapride Luxury Platter",
        price: 450000,
        image: IMG("photo-1604503468506-a8da13d82791"),
        includes: ["King Crabs", "Jumbo Prawns", "Large Snails", "Lobsters", "Octopus", "Potatoes", "Sweet Corn", "Shrimps", "Calamari", "Basket of Fries", "Rice", "Pasta", "Singapore Noodles", "Grilled Fish", "Exotic Red Wine"],
        serves: "Up to 20 People",
      },
    ],
  },
  {
    name: "Finger Food",
    icon: "🍤",
    image: IMG("photo-1621996346565-e3dbc646d9a9"),
    items: [
      {
        name: "Mayo Spring Roll",
        price: 10000,
        includes: ["Prawns", "Mayonnaise", "Seasonings"],
      },
      {
        name: "Small Chops Platter",
        price: 25000,
        image: IMG("photo-1621996346565-e3dbc646d9a9"),
        includes: ["Puff Puff", "Samosa", "Mayo Spring Roll", "Snail", "Prawn (Grilled)"],
      },
      {
        name: "Spicy Mixed Seafood",
        price: 30000,
        image: IMG("photo-1551218808-94e220e084d2"),
        includes: ["Snail", "Crabs", "Prawns", "Fish", "Cream Fish", "Hot Chilli Sauce"],
      },
      {
        name: "Seafood Dodo Mix",
        price: 30000,
        includes: ["Shrimps", "Plantain", "Prawns", "Fish Fillet", "Calamari"],
      },
      {
        name: "Special Platter",
        price: 60000,
        image: IMG("photo-1621996346565-e3dbc646d9a9"),
        includes: ["Butterfly Prawns", "Prawn in Iakette", "Fish in Batter", "Pepper Snail", "Fries", "Chinese Rice"],
      },
    ],
  },
  {
    name: "Rice",
    icon: "🍚",
    image: IMG("photo-1512058564366-18510be2db19"),
    items: [
      {
        name: "Italian Risotto Rice",
        price: 20000,
        image: IMG("photo-1512058564366-18510be2db19"),
        includes: ["Shrimps", "Calamari", "Prawn", "Cream Fish Fillet", "Seasoning"],
      },
      {
        name: "Jambalaya Rice",
        price: 25000,
        image: IMG("photo-1563379926898-05f4575a45d8"),
        includes: ["Shredded Chicken", "Shredded Beef", "Sausage", "Shrimps", "Prawns", "Calamari"],
      },
      {
        name: "Seapride Special Rice",
        price: 15000,
        includes: ["Homemade Traditional Spices", "Seafood Mix"],
      },
      {
        name: "Pineapple Rice",
        price: 20000,
        includes: ["Tropical Pineapple Rice", "Grilled Prawns"],
      },
      {
        name: "Chinese Fried Rice",
        price: 15000,
        includes: ["Shrimps", "Calamari", "Soy Sauce", "Vegetables", "Aromatic Spices"],
      },
      {
        name: "White Rice",
        price: 15000,
        includes: ["Served with Seafood Sauce"],
      },
    ],
  },
  {
    name: "Pasta",
    icon: "🍝",
    image: IMG("photo-1563379926898-05f4575a45d8"),
    items: [
      { name: "Pesto Creamy Pasta", price: 20000, image: IMG("photo-1563379926898-05f4575a45d8") },
      { name: "Seafood Marinara Pasta", price: 20000, image: IMG("photo-1563379926898-05f4575a45d8") },
      { name: "Seafood Alfredo Pasta", price: 20000 },
      { name: "Italian Seafood Pasta", price: 20000 },
      { name: "Singapore Noodles", price: 15000 },
      { name: "Four-Cheese Pasta", price: 25000 },
      { name: "Seapride Stir Fry Pasta", price: 15000 },
    ],
  },
  {
    name: "African Soups",
    icon: "🥘",
    note: "Comes with free swallow",
    image: IMG("photo-1547592166-23ac45744acd"),
    items: [
      { name: "Fisherman Soup", price: 20000, image: IMG("photo-1547592166-23ac45744acd") },
      { name: "Seafood Okro", price: 15000 },
      { name: "Seafood Efo Riro", price: 15000 },
      { name: "Seafood Egusi", price: 15000 },
      { name: "Seafood Okro with Eba", price: 15000 },
      { name: "Seafood Okro with Semo", price: 16500 },
      { name: "Seafood Okro with Poundo", price: 17000 },
    ],
  },
  {
    name: "Special Grilled",
    icon: "🥩",
    image: IMG("photo-1544025162-d76694265947"),
    items: [
      { name: "T-Bone Steak", price: 20000, image: IMG("photo-1544025162-d76694265947") },
      { name: "BBQ Croaker Fish", price: 20000, image: IMG("photo-1519708227418-c8fd9a32b7a2") },
      { name: "Pillet Steak", price: 20000 },
      { name: "Butterfly Prawns with Mash Potatoes or Rice", price: 25000, image: IMG("photo-1551218808-94e220e084d2") },
      { name: "Tilapia Fish, BBQ & French Fries", price: 20000, image: IMG("photo-1519708227418-c8fd9a32b7a2") },
      { name: "BBQ Catfish", price: 20000 },
      { name: "Chicken Cordon Bleu", price: 20000 },
    ],
  },
  {
    name: "Wraps",
    icon: "🌯",
    image: IMG("photo-1615361200141-f45040a367be"),
    items: [
      { name: "Seafood Shawarma", price: 7000, image: IMG("photo-1615361200141-f45040a367be") },
      { name: "Tortilla Wrap", price: 8000 },
      { name: "Burger", price: 7000 },
      { name: "Pan Cake Wrap", price: 6000 },
    ],
  },
  {
    name: "Sauces & Dips",
    icon: "🧂",
    image: IMG("photo-1476124369491-e7addf5db371"),
    items: [
      { name: "Lip Smacking Sauce", price: 3000 },
      { name: "Tartar Sauce", price: 3000 },
      { name: "Creamy Garlic Butter", price: 3000 },
      { name: "Sweet Chilli Sauce", price: 2000 },
      { name: "Cajun Lemon Butter", price: 2000 },
      { name: "African Chilli Sauce", price: 2000 },
    ],
  },
  {
    name: "Extras",
    icon: "➕",
    image: IMG("photo-1504674900247-0877df9cc836"),
    items: [
      { name: "Potatoes (Fried)", price: 1000, image: IMG("photo-1504674900247-0877df9cc836") },
      { name: "Extra Prawns (3pcs)", price: 12000, image: IMG("photo-1551218808-94e220e084d2") },
      { name: "Plantain", price: 1000 },
      { name: "Extra Crabs (2pcs)", price: 8000, image: IMG("photo-1604503468506-a8da13d82791") },
      { name: "Sweet Corn", price: 1500 },
      { name: "Extra Snails (3pcs)", price: 12000 },
      { name: "Yam (Fried)", price: 1000 },
      { name: "Chinese Rice", price: 10000 },
      { name: "Egg (Boiled)", price: 1000 },
      { name: "Extra Swallow", price: 2000 },
    ],
  },
];

const WHATSAPP_NUMBER = "2347062270224";

export function getWhatsAppUrl(itemName: string): string {
  const text = encodeURIComponent(
    `Hello! I'd like to order the *${itemName}* from TheSeaPride.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function getWhatsAppGenericUrl(): string {
  const text = encodeURIComponent(
    "Hello! I'd like to place an order at TheSeaPride."
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function formatPrice(price: number): string {
  return `₦${price.toLocaleString("en-US")}`;
}
