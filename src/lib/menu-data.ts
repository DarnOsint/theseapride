export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  includes?: string[];
  serves?: string;
}

export interface MenuCategory {
  name: string;
  icon: string;
  note?: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    name: "Breakfast",
    icon: "🌅",
    items: [
      {
        name: "Full English Breakfast",
        price: 20000,
        includes: ["Sausage", "Bacon", "Baked Beans", "Egg", "Toast Bread", "Grilled Tomatoes", "Mushroom"],
      },
      {
        name: "Luxury Seapride",
        price: 25000,
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
    items: [
      {
        name: "Prawn Cocktail Salad",
        price: 20000,
        includes: ["Grilled Prawns", "Lettuce", "Cucumber", "Fresh Tomatoes", "Cocktail Sauce"],
      },
      {
        name: "Salmon Fish Salad",
        price: 25000,
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
    items: [
      {
        name: "Ministro Soup",
        price: 15000,
        includes: ["Shrimps", "Carrot", "Baby Marrow", "Noodles", "Tomato Paste"],
      },
      {
        name: "Asian Sea Broth",
        price: 20000,
        includes: ["Carrot", "Prawns", "Crabs", "Marrow", "Leeks", "Macaroni"],
      },
    ],
  },
  {
    name: "Seafood Platters",
    icon: "🦞",
    items: [
      {
        name: "Catch of the Bite",
        price: 20000,
        includes: ["Crabs", "Prawns", "Snails"],
        serves: "1–2 People",
      },
      {
        name: "Seaside Nibbles",
        price: 50000,
        includes: ["Crabs", "Prawns", "Snails", "Lobsters"],
        serves: "3–4 People",
      },
      {
        name: "Cajun Seafood Boil",
        price: 70000,
        includes: ["Assorted Seafood", "Cajun Sauce"],
        serves: "3–4 People",
      },
      {
        name: "Sea's Bounty Platter",
        price: 100000,
        includes: ["Crabs", "Prawns", "Snails", "Calamari", "Lobster", "Potatoes", "Sweet Corn", "Free Drink"],
        serves: "4–6 People",
      },
      {
        name: "Seafarer's Feast",
        price: 200000,
        includes: ["Crabs", "Prawns", "Snails", "Shrimps", "Lobster", "Sweet Corn", "Potatoes", "Egg", "2 Canned Drinks"],
        serves: "5–10 People",
      },
      {
        name: "The Seapride Luxury Platter",
        price: 450000,
        includes: ["King Crabs", "Jumbo Prawns", "Large Snails", "Lobsters", "Octopus", "Potatoes", "Sweet Corn", "Shrimps", "Calamari", "Basket of Fries", "Rice", "Pasta", "Singapore Noodles", "Grilled Fish", "Exotic Red Wine"],
        serves: "Up to 20 People",
      },
    ],
  },
  {
    name: "Finger Food",
    icon: "🍤",
    items: [
      {
        name: "Mayo Spring Roll",
        price: 10000,
        includes: ["Prawns", "Mayonnaise", "Seasonings"],
      },
      {
        name: "Small Chops Platter",
        price: 25000,
        includes: ["Puff Puff", "Samosa", "Mayo Spring Roll", "Snail", "Prawn (Grilled)"],
      },
      {
        name: "Spicy Mixed Seafood",
        price: 30000,
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
        includes: ["Butterfly Prawns", "Prawn in Iakette", "Fish in Batter", "Pepper Snail", "Fries", "Chinese Rice"],
      },
    ],
  },
  {
    name: "Rice",
    icon: "🍚",
    items: [
      {
        name: "Italian Risotto Rice",
        price: 20000,
        includes: ["Shrimps", "Calamari", "Prawn", "Cream Fish Fillet", "Seasoning"],
      },
      {
        name: "Jambalaya Rice",
        price: 25000,
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
    items: [
      { name: "Pesto Creamy Pasta", price: 20000 },
      { name: "Seafood Marinara Pasta", price: 20000 },
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
    items: [
      { name: "Fisherman Soup", price: 20000 },
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
    items: [
      { name: "T-Bone Steak", price: 20000 },
      { name: "BBQ Croaker Fish", price: 20000 },
      { name: "Pillet Steak", price: 20000 },
      { name: "Butterfly Prawns with Mash Potatoes or Rice", price: 25000 },
      { name: "Tilapia Fish, BBQ & French Fries", price: 20000 },
      { name: "BBQ Catfish", price: 20000 },
      { name: "Chicken Cordon Bleu", price: 20000 },
    ],
  },
  {
    name: "Wraps",
    icon: "🌯",
    items: [
      { name: "Seafood Shawarma", price: 7000 },
      { name: "Tortilla Wrap", price: 8000 },
      { name: "Burger", price: 7000 },
      { name: "Pan Cake Wrap", price: 6000 },
    ],
  },
  {
    name: "Sauces & Dips",
    icon: "🧂",
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
    items: [
      { name: "Potatoes (Fried)", price: 1000 },
      { name: "Extra Prawns (3pcs)", price: 12000 },
      { name: "Plantain", price: 1000 },
      { name: "Extra Crabs (2pcs)", price: 8000 },
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

export function formatPrice(price: number): string {
  return `₦${price.toLocaleString("en-US")}`;
}
