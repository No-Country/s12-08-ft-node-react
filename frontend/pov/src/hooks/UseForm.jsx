import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  // Estado del formulario
  const [formState, setFormState] = useState(initialForm);

  // Estado de las validaciones del formulario
  const [formValidation, setformValidation] = useState({});

  
  // Efecto para crear validadores cuando cambia el estado del formulario
  useEffect(() => {
    createValidators();
  }, [formState]);

  // Efecto para restablecer el formulario cuando cambia el formulario inicial
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  // Manejador de cambios en los campos del formulario
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Restablecer el formulario a su estado inicial
  const onResetForm = () => {
    setFormState(initialForm);
  };

  // Determinar si el formulario es válido utilizando useMemo
  const isFormValid = useMemo(() => {

    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  // Crear validadores para los campos del formulario
  const createValidators = () => {

    const formCheckedValues = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }
    setformValidation(formCheckedValues);
  };
  

  // Devolver el estado del formulario, manejadores y validaciones
  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid,
  };
};
