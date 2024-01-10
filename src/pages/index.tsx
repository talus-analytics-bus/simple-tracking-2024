import React from "react";

import CMS from "@talus-analytics/library.airtable-cms";
import Providers from "../components/layout/Providers";

import Main from "../components/layout/Main";

import useIndexPageData from "../cmsHooks/useIndexPageData";
import styled from "styled-components";

const ExampleBox = styled.div<{ mode: "funder" | "recipient" }>`
  background-color: ${({ theme, mode }) => theme[mode].colors.mapViz1};
`;

const IndexPage = (): JSX.Element => {
  const data = useIndexPageData();

  return (
    // all pages should be wrapped in the Providers component
    // all pages should start with CMS.SEO to set metadata.
    <Providers>
      <CMS.SEO />
      <Main>
        <ExampleBox mode={"funder"}>
          <h1>Simple Tracking 2024</h1>
          <p>
            <CMS.Text name="Example Text" data={data} />
            <a href={CMS.getText(data, "Airtable URL")}>
              <CMS.Text name="Airtable Link Text" data={data} />
            </a>
          </p>
        </ExampleBox>
      </Main>
    </Providers>
  );
};

export default IndexPage;
