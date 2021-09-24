import { commerce } from "../../../lib/commerce";

export const fetchShippingCountries = async (checkoutTokenId) => {
  const countries = await commerce.services.localeListShippingCountries(
    checkoutTokenId
  );
  console.log("COUNTRIES :=", countries);
  return countries.countries;
};

export const fetchShippingSubdivisions = async (countryCode) => {
  const { subdivisions } = await commerce.services.localeListSubdivisions(
    countryCode
  );
  console.log("SUBDIVISIONS :=", subdivisions);
  return subdivisions;
};

export const fetchShippingOptions = async (
  checkoutTokenId,
  country,
  region = null
) => {
  const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {
    country,
    region,
  });
  console.log("OPTIONS :=", options);
  return options;
};
