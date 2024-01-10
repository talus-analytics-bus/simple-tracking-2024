import React from "react";

import CMS from "@talus-analytics/library.airtable-cms";
import Providers from "../components/layout/Providers";

import Main from "../components/layout/Main";

import useIndexPageData from "../cmsHooks/useIndexPageData";
import useCountries from "queryHooks/useCountries";
import { Link } from "gatsby";

const IndexPage = (): JSX.Element => {
  const data = useIndexPageData();
  const countries = useCountries();

  return (
    // all pages should be wrapped in the Providers component
    // all pages should start with CMS.SEO to set metadata.
    <Providers>
      <CMS.SEO />
      <Main>
        <h1>Tracking 2024</h1>
        <p>
          <CMS.Text name="H1" data={data} />
        </p>
        {countries.map((country) => (
          <p>
            <Link to={`/countries/${country.iso3?.toLowerCase()}/`}>
              {country.name}
            </Link>
          </p>
        ))}
      </Main>
    </Providers>
  );
};

export default IndexPage;
