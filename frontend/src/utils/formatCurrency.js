export default function formatCurrency(value) {
  if (value == null || isNaN(value)) return "0đ";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
}
