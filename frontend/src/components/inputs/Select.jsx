import React, { useLayoutEffect, useRef, useState } from "react";

import { ReactComponent as ChevronDown } from "../../assets/chevron-down-sharp-regular.svg";
import { Option, Select as SelectMUI } from "@mui/base";

const Select = React.forwardRef(function Select(
  {
    placeholder = "Choose a Value",
    options = [],
    value,
    onChange = () => {},
    error,
    ...props
  },
  ref
) {
  const [selectWidth, setSelectWidth] = useState(0);
  const selectRef = useRef();

  useLayoutEffect(() => {
    if (selectRef.current) {
      setSelectWidth(selectRef.current.offsetWidth);
    }
  }, []);

  const renderValue = (value) => {
    if (!value) {
      return placeholder;
    }
    return value.label;
  };

  const handleChange = (event, value) => {
    onChange(value);
  };

  return (
    <div className="relative flex flex-col">
      <SelectMUI
        {...props}
        ref={ref}
        renderValue={renderValue}
        //   defaultListboxOpen
        slots={{
          root: Button,
        }}
        value={value}
        onChange={handleChange}
        slotProps={{
          root: {
            className: `w-full flex relative px-3 py-2 leading-tight border rounded shadow border-stone-600 text-stone-100 bg-stone-700 focus:outline-none focus:shadow-outline`,
            ref: selectRef,
          },
          listbox: {
            className:
              "bg-stone-500 rounded-md p-2 w-full outline-none overflow-auto mt-1 mx-3 scroll",
          },
          popper: {
            className: "z-50 flex min-w-[250px] max-h-48",
            style: { width: selectWidth },
          },
        }}
      >
        {options.map((option, index) => (
          <Option
            key={option + index}
            className="py-0.5 capitalize cursor-pointer text-stone-200 hover:text-stone-700"
            value={option}
          >
            {option}
          </Option>
        ))}
      </SelectMUI>
      {value && (
        <span className="absolute text-xs text-stone-300 -top-2.5 left-1">
          {placeholder}
        </span>
      )}
      <p className="text-xs italic text-red-500">{error}</p>
    </div>
  );
});

const Button = React.forwardRef(function Button(props, ref) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      <span className="capitalize">{other.children}</span>
      <ChevronDown className={`absolute h-5 right-3 fill-zinc-100`} />
    </button>
  );
});

export default Select;
