import { getPublicProducts } from '@/lib/products/getPublicProducts';
import VehicleShowcaseClient from '@/components/vehicle-showcase/VehicleShowcaseClient';

export default async function VehicleShowcase() {
  const { ok, products, error } = await getPublicProducts();

  return (
    <VehicleShowcaseClient
      initialProducts={products}
      apiUnavailable={!ok}
      apiErrorMessage={error}
    />
  );
}
