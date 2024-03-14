'use client';

import { Apartment } from '@/types';
import { useRouter } from 'next/navigation';
import ApartmentCard from './apartment-card';

interface ListApartmentProps {
  apartments: Apartment[];
  onAction?: () => void;
}

const ListApartment = ({ apartments, onAction }: ListApartmentProps) => {
  const router = useRouter();
  return (
    <>
      <div className="w-full h-full mt-4 grid gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {apartments?.map((apartment, index) => (
          <div
            key={index}
            onClick={() => router.push(`/rooms?apartmentId=${apartment?.id}`)}
          >
            <ApartmentCard apartment={apartment} refresh={onAction} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ListApartment;
