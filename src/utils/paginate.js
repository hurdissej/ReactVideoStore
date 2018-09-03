export function paginate(selectedPage, pageSize, items) {
  const start = (selectedPage - 1) * pageSize;
  return items.slice(start, start + 4);
}
