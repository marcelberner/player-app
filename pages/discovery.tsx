import React from "react";

import Layout from "@/components/Layout/Layout";
import MessageModal from "@/components/modals/MessageModal";

import DiscoveryComponent from "@/components/pages/Discovery";

const Discovery = () => {
  return (
    <>
      <Layout>
        <DiscoveryComponent />
      </Layout>
      <MessageModal />
    </>
  );
};

export default Discovery;
