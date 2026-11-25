export const normalizarImagen = (src) => {
  if (!src) return null;
  return typeof src === "string" ? { uri: src } : src;
};

// Agrega transparencia solo si el color es #RRGGBB; si no, lo deja intacto
export const conAlpha = (color, alpha = "cc") =>
  typeof color === "string" && /^#[0-9a-f]{6}$/i.test(color)
    ? `${color}${alpha}`
    : color;

// Solo permite enlaces http(s) que vengan del backend
export const esUrlSegura = (url) =>
  typeof url === "string" && /^https?:\/\//i.test(url.trim());

export const limpiarTelefono = (numero) =>
  String(numero ?? "").replace(/[^\d+]/g, "");

// true si el color de fondo (#RRGGBB) es claro y necesita íconos oscuros
export const esColorClaro = (color) => {
  if (typeof color !== "string" || !/^#[0-9a-f]{6}$/i.test(color)) return false;
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.65;
};