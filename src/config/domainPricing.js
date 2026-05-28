export const SUPPORTED_DOMAIN_EXTENSIONS = ['.com', '.my', '.com.my', '.net', '.co'];

export const DOMAIN_PRICING = {
  '.com': {
    extension: '.com',
    sellPrice: 125,
    label: 'Recommended',
    note: 'Paling universal dan renewal lebih rendah',
  },
  '.my': {
    extension: '.my',
    sellPrice: 179,
    label: 'Premium local',
    note: 'Brand Malaysia, renewal lebih tinggi',
  },
  '.com.my': {
    extension: '.com.my',
    sellPrice: 125,
    label: 'Local trust',
    note: 'Sesuai untuk bisnes Malaysia',
  },
  '.net': {
    extension: '.net',
    sellPrice: 125,
    label: 'Backup',
    note: 'Alternatif jika .com tidak available',
  },
  '.co': {
    extension: '.co',
    sellPrice: 229,
    label: 'Brandable',
    note: 'Nampak moden tapi lebih mahal',
  },
};

export function getDomainPricing(extension = '') {
  return DOMAIN_PRICING[extension] || null;
}

export function getDomainYearlyPrice(extension = '') {
  return getDomainPricing(extension)?.sellPrice || 0;
}

export function getDomainPriceLabel(extension = '') {
  const price = getDomainYearlyPrice(extension);
  return price ? `RM${price}/year` : '';
}
