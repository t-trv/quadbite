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
  variants: item?.food_variants?.map((variant) => {
    return {
      id: variant.variants.id,
      name: variant.variants.name,
      price_adjust: variant.variants.price_adjust,
    };
  }),
});

export default foodSerializer;
