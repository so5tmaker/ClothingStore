const xboxDescription = `
<div>
    <ul>
        <li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li>
        <li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li>
        <li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li>
        <li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li>
        <li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li>
        <li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li>
        <li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li>
        <li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li>
        <li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li>
        <li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li>
    </ul>
</div>`;

const airpodsDescription = `
<h3>Magic like you’ve never heard</h3>
<p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they’re ready to use right out of the case.

<h3>Active Noise Cancellation</h3>
<p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you’re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.

<h3>Transparency mode</h3>
<p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you’re talking to people around you.</p>

<h3>All-new design</h3>
<p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p>

<h3>Amazing audio quality</h3>
<p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p>

<h3>Even more magical</h3>
<p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>
`;

const airtagDescription = `
<h1>Lose your knack for losing things.</h1>
<p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.</p>
`;

const products = [
  {
    id: "apple-imac-2021",
    name: "iMac 2021",
    brand: "Apple",
    description: "<p>The new iMac!</p>",
    category: "tech",
    prices: [
      { amount: 1400, currency: { label: "USD", symbol: "$" } },
      { amount: 1600, currency: { label: "EUR", symbol: "€" } },
      { amount: 180000, currency: { label: "JPY", symbol: "¥" } },
    ],
    attributes: [
      {
        id: "Capacity",
        items: [{ displayValue: "256GB" }, { displayValue: "512GB" }],
      },
      {
        id: "With USB 3 ports",
        items: [{ displayValue: "Yes" }, { displayValue: "No" }],
      },
      {
        id: "Touch ID in keyboard",
        items: [{ displayValue: "Yes" }, { displayValue: "No" }],
      },
    ],
    gallery: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000",
    ],
  },
  {
    id: "apple-iphone-12-pro",
    name: "iPhone 12 Pro",
    brand: "Apple",
    description: "<p>This is iPhone 12. Nothing else to say.</p>",
    category: "tech",
    prices: [
      { amount: 830, currency: { label: "USD", symbol: "$" } },
      { amount: 1000, currency: { label: "EUR", symbol: "€" } },
      { amount: 100000, currency: { label: "JPY", symbol: "¥" } },
    ],
    attributes: [
      {
        id: "Capacity",
        items: [{ displayValue: "256GB" }, { displayValue: "512GB" }],
      },
      {
        id: "With USB 3 ports",
        items: [{ displayValue: "Yes" }, { displayValue: "No" }],
      },
      {
        id: "Touch ID in keyboard",
        items: [{ displayValue: "Yes" }, { displayValue: "No" }],
      },
    ],
    gallery: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000",
    ],
  },
  {
    id: "apple-airpods-pro",
    name: "AirPods Pro",
    brand: "Apple",
    description: airpodsDescription,
    category: "tech",
    prices: [
      { amount: 249, currency: { label: "USD", symbol: "$" } },
      { amount: 210, currency: { label: "EUR", symbol: "€" } },
      { amount: 30000, currency: { label: "JPY", symbol: "¥" } },
    ],
    attributes: [],
    gallery: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000",
    ],
    inStock: false,
  },
  {
    id: "apple-airtag",
    name: "AirTag",
    brand: "Apple",
    description: airtagDescription,
    category: "tech",
    prices: [
      { amount: 100, currency: { label: "USD", symbol: "$" } },
      { amount: 80, currency: { label: "EUR", symbol: "€" } },
      { amount: 13000, currency: { label: "JPY", symbol: "¥" } },
    ],
    attributes: [],
    gallery: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000",
    ],
    inStock: false,
  },
  {
    id: "ps-5",
    name: "PlayStation 5",
    brand: "Sony",
    description:
      "<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>",
    category: "tech",
    prices: [
      { amount: 700, currency: { label: "USD", symbol: "$" } },
      { amount: 550, currency: { label: "EUR", symbol: "€" } },
      { amount: 90000, currency: { label: "JPY", symbol: "¥" } },
    ],
    attributes: [
      {
        id: "Capacity",
        items: [{ displayValue: "256GB" }, { displayValue: "512GB" }],
      },
      {
        id: "Color",
        items: [
          { displayValue: "Green", value: "#44FF03" },
          { displayValue: "Cyan", value: "#03FFF7" },
        ],
      },
      {
        id: "Touch ID in keyboard",
        items: [{ displayValue: "Yes" }, { displayValue: "No" }],
      },
    ],
    gallery: [
      "https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg",
    ],
    inStock: false,
  },
  {
    id: "xbox-series-s",
    name: "Xbox Series S 512GB",
    brand: "Microsoft",
    description: xboxDescription,
    category: "tech",
    prices: [
      { amount: 277, currency: { label: "USD", symbol: "$" } },
      { amount: 1600, currency: { label: "EUR", symbol: "€" } },
      { amount: 180000, currency: { label: "JPY", symbol: "¥" } },
    ],
    attributes: [
      {
        id: "Capacity",
        items: [{ displayValue: "256GB" }, { displayValue: "512GB" }],
      },
      {
        id: "Color",
        items: [
          { displayValue: "Green", value: "#44FF03" },
          { displayValue: "Cyan", value: "#03FFF7" },
        ],
      },
      {
        id: "Touch ID in keyboard",
        items: [{ displayValue: "Yes" }, { displayValue: "No" }],
      },
    ],
    gallery: [
      "https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg",
    ],
    inStock: false,
  },
  {
    id: "huarache-x-stussy-le",
    name: "Nike Air Huarache Le",
    brand: "Nike x Stussy",
    description: "<p>Great sneakers for everyday use!</p>",
    category: "clothes",
    prices: [
      { amount: 120, currency: { label: "USD", symbol: "$" } },
      { amount: 100, currency: { label: "EUR", symbol: "€" } },
      { amount: 15000, currency: { label: "JPY", symbol: "¥" } },
    ],
    attributes: [
      {
        id: "Size",
        items: [
          { displayValue: "40" },
          { displayValue: "41" },
          { displayValue: "42" },
          { displayValue: "43" },
        ],
      },
    ],
    gallery: [
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087",
    ],
  },
  {
    id: "jacket-canada-goosee",
    name: "Jacket",
    brand: "Canada Goose",
    description: "<p>Awesome winter jacket</p>",
    category: "clothes",
    prices: [
      { amount: 430, currency: { label: "USD", symbol: "$" } },
      { amount: 350, currency: { label: "EUR", symbol: "€" } },
      { amount: 50000, currency: { label: "JPY", symbol: "¥" } },
    ],
    attributes: [
      {
        id: "Size",
        items: [
          { displayValue: "Small" },
          { displayValue: "Medium" },
          { displayValue: "Large" },
          { displayValue: "Extra Large" },
        ],
      },
    ],
    gallery: [
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg",
      "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png",
      "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png",
    ],
  },
];

export default products;
