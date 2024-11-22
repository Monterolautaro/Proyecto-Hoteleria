import Filters from '@/components/filters/filters';
import SearchResults from '@/components/searchBar/SearchResults';
import React from 'react';

const HotelsPage = () => {
  return (
    <div>
      <Filters />
      <SearchResults/>
    </div>
  );
};

export default HotelsPage;
