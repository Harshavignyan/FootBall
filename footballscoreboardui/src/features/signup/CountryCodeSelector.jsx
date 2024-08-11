import React from 'react';

const CountryCodeSelector = ({ countryCallingCode, selectedCountryCode, onCountryCodeChange }) => (
  <div className="input-group">
    <select
      className="form-select"
      onChange={(e) => onCountryCodeChange(e.target.value)}
      value={selectedCountryCode}
    >
      {countryCallingCode.map((country) => (
        <option key={country.countryCodes} value={country.countryCodes}>
          {country.isoCode3} (+{country.countryCodes})
        </option>
      ))}
    </select>
  </div>
);

export default CountryCodeSelector;
