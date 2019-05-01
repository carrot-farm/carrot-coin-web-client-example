import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import CategoryListContainer from 'containers/list/CategoryListContainer.js';

const CategoryListPage = ({match, classes})=>{
   return (
      <PageTemplate>
         <div className="container">
            <CategoryListContainer />
         </div>
      </PageTemplate>
   );
};

export default CategoryListPage;