import ProductCard from "./ProductCard";
import EmptyState from "../ui/EmptyState";

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <EmptyState
        title="No products found"
        description="Try searching another product name or changing category."
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
