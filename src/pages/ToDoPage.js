import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ToDoListContainer from 'containers/list/ToDoListContainer.js';

const ToDoPage = ({match})=>{
   return (
      <div className="container">
         <PageTemplate >
            <ToDoListContainer />
         </PageTemplate>
      </div>
   );
};

export default ToDoPage;