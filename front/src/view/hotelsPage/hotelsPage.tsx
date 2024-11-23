import React, { Suspense } from 'react';
import Filters from '@/components/filters/filters';
import SearchResults from '@/components/searchBar/SearchResults';

const HotelsPage = () => {
  return (
    <div>

      <Suspense fallback={<div>Cargando filtros...</div>}>
        <Filters />
      </Suspense>

      <Suspense fallback={<div>Cargando resultados de búsqueda...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
};

export default HotelsPage;

