// src/data/catalogData.js
const catalogData = [
    {
      name: 'Produce',
      subCategories: [
        {
          name: 'Fruits',
          subCategories: [
            {
              name: 'Citrus',
              products: [
                { id: 'citrus-001', name: 'Navel Oranges 2lb' },
                { id: 'citrus-002', name: 'Lemons 1lb' },
              ],
            },
            {
              name: 'Apples',
              products: [
                { id: 'apples-001', name: 'Gala Apples 2lb' },
                { id: 'apples-002', name: 'Fuji Apples 2lb' },
              ],
            },
          ],
        },
        {
          name: 'Vegetables',
          subCategories: [
            {
              name: 'Leafy Greens',
              products: [
                { id: 'greens-001', name: 'Spinach Bunch' },
                { id: 'greens-002', name: 'Kale Bunch' },
              ],
            },
            {
              name: 'Root Veggies',
              products: [
                { id: 'root-001', name: 'Carrots 1lb' },
                { id: 'root-002', name: 'Russet Potatoes 5lb' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Bakery',
      subCategories: [
        {
          name: 'Breads',
          products: [
            { id: 'bread-001', name: 'Whole Wheat Loaf' },
            { id: 'bread-002', name: 'Sourdough Loaf' },
          ],
        },
        {
          name: 'Pastries',
          products: [
            { id: 'pastry-001', name: 'Croissant 4-pack' },
            { id: 'pastry-002', name: 'Chocolate Muffins 4-pack' },
          ],
        },
      ],
    },
    {
      name: 'Beverages',
      subCategories: [
        {
          name: 'Sodas',
          products: [
            { id: 'soda-001', name: 'Coca-Cola 12-pack' },
            { id: 'soda-002', name: 'Sprite 12-pack' },
          ],
        },
        {
          name: 'Juices',
          products: [
            { id: 'juice-001', name: 'Orange Juice 64oz' },
            { id: 'juice-002', name: 'Apple Juice 64oz' },
          ],
        },
      ],
    },
    {
      name: 'Oils',
      subCategories: [
        {
          name: 'Olive Oils',
          products: [
            { id: 'oil-001', name: 'Bertoli Olive Oil 24oz' },
            { id: 'oil-002', name: 'Pompeian Extra Virgin 16oz' },
          ],
        },
        {
          name: 'Cooking Sprays',
          products: [
            { id: 'spray-001', name: 'PAM Original Spray' },
            { id: 'spray-002', name: 'Olive Oil Cooking Spray' },
          ],
        },
      ],
    },
    {
      name: 'Snacks',
      subCategories: [
        {
          name: 'Chips',
          products: [
            { id: 'chips-001', name: 'Potato Chips Classic 10oz' },
            { id: 'chips-002', name: 'Tortilla Chips 12oz' },
          ],
        },
        {
          name: 'Crackers',
          products: [
            { id: 'crack-001', name: 'Whole Wheat Crackers' },
            { id: 'crack-002', name: 'Saltine Crackers' },
          ],
        },
      ],
    },
  ];
  
  export default catalogData;