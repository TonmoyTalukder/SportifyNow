import { Input, InputRef } from "antd";
import React, { useState, useEffect, forwardRef } from "react";
import CountryCodeSelect from "./CountryCodeSelect";

interface CustomPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

const CustomPhoneInput = forwardRef<InputRef, CustomPhoneInputProps>(
  ({ value, onChange, id }, ref) => {
    const [countryCode, setCountryCode] = useState<string>("+91");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    useEffect(() => {
      // Split value into country code and phone number
      const [code, ...number] = value.split(" ");
      setCountryCode(code || "+91");
      setPhoneNumber(number.join(" ") || "");
    }, [value]);

    const handleCountryCodeChange = (code: string) => {
      setCountryCode(code);
      onChange(`${code} ${phoneNumber}`);
    };

    const handlePhoneNumberChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const newPhoneNumber = e.target.value;
      setPhoneNumber(newPhoneNumber);
      onChange(`${countryCode} ${newPhoneNumber}`);
    };

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <CountryCodeSelect
          value={countryCode}
          onChange={handleCountryCodeChange}
        />
        <Input
          id={id}
          ref={ref}
          style={{ marginLeft: "8px", flex: 1 }}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
    );
  },
);

export default CustomPhoneInput;
