import React from "react";
import PageTemplate from "components/common/PageTemplate";
import EditorContainer from "containers/editor/EditorContainer.js";

const EditorPage = ({ match }) => {
  return (
    <div className="container">
      <PageTemplate>
        <EditorContainer />
      </PageTemplate>
    </div>
  );
};

export default EditorPage;
