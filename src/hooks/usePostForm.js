import { useState } from 'react';

export default function usePostForm(initialValue) {
  const [formValue, setFormValue] = useState(initialValue);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return {
    formValue,
    setFormValue,
    handleInputChange,
  };
}
