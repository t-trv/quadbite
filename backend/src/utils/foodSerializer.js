const foodSerializer = (item) => ({
  id: item.id,
  name: item.name,
  slug: item.slug,
  image_url: item.image_url,
  preparation_time: item.preparation_time,
  description: item.description,
  short_description: item.short_description,
  price: Number(item.price),
  discount: Number(item.discount),
  is_active: item.is_active,
  created_at: item.created_at,
  updated_at: item.updated_at,
  deleted_at: item.deleted_at,
  side_category: {
    id: item.side_categories.id,
    name: item.side_categories.name,
  },
  variant_ids: item.food_variants.map((variant) => variant.variant_id),
});

export default foodSerializer;
