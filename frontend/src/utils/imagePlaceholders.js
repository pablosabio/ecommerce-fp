const PLACEHOLDER_BASE = 'https://placehold.co';

export const getPlaceholderImage = (
  width,
  height,
  text,
  bgColor = 'EEEEEE',
  textColor = '999999'
) => {
  const formattedText = text ? `?text=${encodeURIComponent(text)}` : '';
  return `${PLACEHOLDER_BASE}/${width}x${height}/${bgColor}/${textColor}${formattedText}`;
};

export const getCategoryBackground = (category) => {
  const colors = {
    audio: 'E6F7FF/0078D4',
    computers: 'E6F6E6/008000',
    smartphones: 'FFF1E6/D05A00',
    accessories: 'F5E6FF/5A00D0',
  };

  const colorPair = colors[category] || 'EEEEEE/999999';

  return `${PLACEHOLDER_BASE}/600x400/${colorPair}?text=${encodeURIComponent(category.toUpperCase())}`;
};

export const productImages = {
  // Audio
  'audio-001': getPlaceholderImage(600, 400, 'Wireless Headphones', 'E6F7FF', '0078D4'),
  'audio-002': getPlaceholderImage(600, 400, 'Wireless Earbuds', 'E6F7FF', '0078D4'),
  'audio-003': getPlaceholderImage(600, 400, 'Bluetooth Speaker', 'E6F7FF', '0078D4'),
  'audio-004': getPlaceholderImage(600, 400, 'Home Theater System', 'E6F7FF', '0078D4'),
  'audio-005': getPlaceholderImage(600, 400, 'Vinyl Turntable', 'E6F7FF', '0078D4'),

  // Computers
  'comp-001': getPlaceholderImage(600, 400, 'Ultrabook Laptop', 'E6F6E6', '008000'),
  'comp-002': getPlaceholderImage(600, 400, 'Gaming Desktop', 'E6F6E6', '008000'),
  'comp-003': getPlaceholderImage(600, 400, 'Mini PC', 'E6F6E6', '008000'),
  'comp-004': getPlaceholderImage(600, 400, '27" Monitor', 'E6F6E6', '008000'),
  'comp-005': getPlaceholderImage(600, 400, 'Mechanical Keyboard', 'E6F6E6', '008000'),

  // Smartphones
  'phone-001': getPlaceholderImage(600, 400, 'Flagship Smartphone', 'FFF1E6', 'D05A00'),
  'phone-002': getPlaceholderImage(600, 400, 'Budget Smartphone', 'FFF1E6', 'D05A00'),
  'phone-003': getPlaceholderImage(600, 400, 'Pro Tablet', 'FFF1E6', 'D05A00'),
  'phone-004': getPlaceholderImage(600, 400, 'Smartwatch', 'FFF1E6', 'D05A00'),
  'phone-005': getPlaceholderImage(600, 400, 'Pro Earbuds', 'FFF1E6', 'D05A00'),

  // Accessories
  'acc-001': getPlaceholderImage(600, 400, 'Power Bank', 'F5E6FF', '5A00D0'),
  'acc-002': getPlaceholderImage(600, 400, 'Laptop Bag', 'F5E6FF', '5A00D0'),
  'acc-003': getPlaceholderImage(600, 400, 'Screen Protector', 'F5E6FF', '5A00D0'),
  'acc-004': getPlaceholderImage(600, 400, 'Phone Stand', 'F5E6FF', '5A00D0'),
  'acc-005': getPlaceholderImage(600, 400, 'USB-C Hub', 'F5E6FF', '5A00D0'),
};

export const getProductImage = (productId) => {
  return productImages[productId] || getPlaceholderImage(600, 400, 'Product Image');
};
