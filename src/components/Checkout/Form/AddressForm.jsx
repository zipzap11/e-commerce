import {
  Grid,
  Select,
  InputLabel,
  Typography,
  MenuItem,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FormControl from "./FormControl";
import {
  fetchShippingCountries,
  fetchShippingSubdivisions,
  fetchShippingOptions,
} from "../api/fetchApi";

const AddressForm = ({ token, onSubmit }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");

  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");

  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const cityRef = useRef();
  const zipRef = useRef();

  console.log("TOKEN :", token);
  useEffect(() => {
    if (token) {
      console.log("useEffect countries", token);
      const getCountries = async () => {
        console.log("FETCHING COUNTRY");
        console.log(token.id);
        const countries = await fetchShippingCountries(token.id);
        setShippingCountries(countries);
        console.log("FINISHED FETCHING COUNTRY");
        console.log(countries);
        if (countries.length > 0) setShippingCountry(Object.keys(countries)[0]);
      };
      getCountries();
    }
  }, [token]);

  useEffect(() => {
    if (shippingCountry) {
      console.log("useEffect subdivisions");
      const getSubdivisions = async () => {
        const subdivisions = await fetchShippingSubdivisions(shippingCountry);
        setShippingSubdivisions(subdivisions);
        console.log(Object.keys(subdivisions)[0]);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
      };
      getSubdivisions();
    }
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) {
      console.log("useEffect Options");
      const getOptions = async () => {
        const options = await fetchShippingOptions(
          token.id,
          shippingCountry,
          shippingSubdivision
        );

        setShippingOptions(options);
        setShippingOption(options[0].id);
      };
      getOptions();
    }
  }, [shippingSubdivision, shippingCountry, token.id]);

  const countries = Object.entries(shippingCountries).map(
    ([code, country]) => ({ code: code, name: country })
  );
  const subDivisions = Object.entries(shippingSubdivisions).map(
    ([code, country]) => ({ code: code, name: country })
  );

  const options = shippingOptions.map((op) => ({
    id: op.id,
    label: `${op.description} - ${op.price.formatted_with_code}`,
  }));

  const addressFormSubmitHandler = () => {
    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      address: addressRef.current.value,
      email: emailRef.current.value,
      city: cityRef.current.value,
      zip: zipRef.current.value,
      shippingCountry,
      shippingSubdivision,
      shippingOption,
    };
    onSubmit(data);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <form onSubmit={addressFormSubmitHandler}>
        <Grid container spacing={3}>
          <FormControl ref={firstNameRef} required label="First Name" />
          <FormControl ref={lastNameRef} required label="Last Name" />
          <FormControl ref={addressRef} required label="Address" />
          <FormControl ref={emailRef} required label="Email" />
          <FormControl ref={cityRef} required label="City" />
          <FormControl ref={zipRef} required label="ZIP / Postal Code" />
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Country</InputLabel>
            <Select
              value={shippingCountry ? shippingCountry : "Country"}
              fullWidth
              onChange={(e) => setShippingCountry(e.target.value)}
            >
              {countries.length > 0 ? (
                countries.map((country) => (
                  <MenuItem
                    key={country && country.code}
                    value={country ? country.code : "Country"}
                  >
                    {country.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem key="Country" value="Country">
                  Country
                </MenuItem>
              )}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Subdivision</InputLabel>
            <Select
              value={shippingSubdivision ? shippingSubdivision : "Subdivision"}
              fullWidth
              onChange={(e) => setShippingSubdivision(e.target.value)}
            >
              {subDivisions.map((subdivision) => (
                <MenuItem key={subdivision.code} value={subdivision.code}>
                  {subdivision.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Option</InputLabel>
            <Select
              value={shippingOption ? shippingOption : "Option"}
              fullWidth
              onChange={(e) => setShippingOption(e.target.value)}
            >
              {options.map((opt) => (
                <MenuItem key={opt.id} value={opt.id}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" component={Link} to="/cart">
            Back to Cart
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddressForm;
