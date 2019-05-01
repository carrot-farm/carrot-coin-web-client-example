import React from "react";
import { Helmet } from "react-helmet";

const Head = ({ headTitle, headDescription }) => {
  return (
    <>
      <Helmet>
        <title>{headTitle}</title>
        <meta name="description" content={headDescription} />
      </Helmet>
    </>
  );
};

export default Head;
