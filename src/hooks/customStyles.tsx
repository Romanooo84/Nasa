import { useMemo } from "react";
import { StylesConfig } from "react-select";

export const useCustomStyles = () => {
    type OptionType = { label: string; value: string };
    return useMemo<StylesConfig<OptionType, false>>(
      () => ({
        control: (provided) => ({
          ...provided,
             width: "250px",
            boxShadow: "0px 10px 30px -5px rgb(116 124 216 / 56%)",
            backgroundColor: "#4545db2b",
            border: "none",
            padding: "5px",
            borderBottom: "#4545db2b",
            transition: `border-color 1.25s, transform 1s`,
            textAlign: 'center',
            fontSize:'20px',
            "&:hover": {
            borderBottom: "3px solid blue",
            
          },
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#05052e",
            borderRadius: "8px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            marginTop: "5px",
            width:'250px',
            textAlign: 'center',
            fontSize:'20px',
          }),
          option: (base,state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#191976ba" : "transparent",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "white", 
            fontSize:'20px',
          }),
        indicatorSeparator: (provided) => ({
          ...provided,
          display: "none", // Ukrycie separatora
        }),
      }),
      []
    );
  };