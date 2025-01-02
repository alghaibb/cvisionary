export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File ? {
    name: value.name,
    size: value.size,
    type: value.type,
    lastModified: value.lastModified,
  } : value;
}