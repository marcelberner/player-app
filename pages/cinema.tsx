import React from "react";

import Layout from "@/components/Layout/Layout";
import Cinema from "@/components/pages/Cinema";
import MessageModal from "@/components/modals/MessageModal";

const LiveCinema = () => {
  return (
    <>
      <Layout>
        <Cinema />
      </Layout>
      <MessageModal />
    </>
  );
};

export default LiveCinema;
