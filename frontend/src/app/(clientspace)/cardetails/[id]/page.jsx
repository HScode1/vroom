// cardetails/[id]/page.jsx
import CarDetailContent from '@/components/carDetails/carDetailContent';

export default async function CarDetailPage({ params }) {
  // Marquer le composant comme async résout l'erreur
  const id = params.id;
  return (
    <div className="">
      <CarDetailContent carId={id} />
    </div>
  );
}




