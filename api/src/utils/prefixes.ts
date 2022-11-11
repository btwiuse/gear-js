const encoder = new TextEncoder();
export const GPROG = 'g::prog::';
export const GPAGES = 'g::pages::';
export const GPROG_HEX = encoder.encode(GPROG).toString('hex');
export const GPAGES_HEX = encoder.encode('g::pages::').toString('hex');
