import { useState } from "react";

export default function useForm(defaults: any) {
  const [values, setValues] = useState(defaults);

  function updateValue(e: { target: { value: any; name: any; type: any } }) {
    // check if its a number and convert
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }

    setValues({
      // copy the existing values into it
      ...values,
      // update the new value that changed
      [name]: value,
    });
  }

  return [values, updateValue];
}
