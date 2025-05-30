import { PageLayout } from '@/layouts';
import { useProductStore } from '@/store/useProductStore';

export const Catalog = () => {
  const { products, loading, error } = useProductStore();

  if (loading) return <div className="text-center py-20">Завантаження продуктів...</div>;
  if (error) return <div className="text-center py-20 text-error">{error}</div>;

  return <PageLayout products={products} />;
};
