const isEqualTo = (input_1: string, input_2: string) => {
  if (input_1 !== input_2) return false;
  else return true;
};

const isEmpty = (value: string) => {
  if (value.trim().length === 0) return false;
  else return true;
};

const isWord = (value: string) => {
  const validInput = /^[A-ząćężźłóńĄĆĘŻŹŁÓŃ ]+$/.test(value);

  if (!validInput) return false;
  else return true;
};

const isUsername = (value: string) => {
  const validInput = /^[a-zA-Z0-9ąćężźłóńĄĆĘŻŹŁÓŃ]+$/.test(value);

  if (!validInput) return false;
  else return true;
};

const isPassword = (value: string) => {
  const validInput = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*ąćężźłóńĄĆĘŻŹŁÓŃ]+$/.test(
    value
  );

  if (!validInput) return false;
  else return true;
};

const isEmail = (value: string) => {
  const validEmail = value
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-ZąćężźłóńĄĆĘŻŹŁÓŃ\-0-9]+\.)+[a-zA-ZąćężźłóńĄĆĘŻŹŁÓŃ]{2,}))$/
    );

  if (!validEmail) return false;
  else return true;
};

interface validateOptions {
  isEqualTo?: string;
  isEmpty?: boolean;
  isWord?: boolean;
  isZipcode?: boolean;
  isPhone?: boolean;
  isStreet?: boolean;
  isEmail?: boolean;
  isUsername?: boolean;
  isPassword?: boolean;
}

export const validate = (input: string, options: validateOptions) => {
  let isEmptyValid = true;
  let isEmailValid = true;
  let isEqualToValid = true;
  let isWordValid = true;
  let isUsernameValid = true;
  let isPasswordValid = true;

  if (options.isEmpty) isEmptyValid = isEmpty(input);
  if (options.isEmail) isEmailValid = isEmail(input);
  if (options.isWord) isWordValid = isWord(input);
  if (options.isEqualTo) isEqualToValid = isEqualTo(input, options.isEqualTo);
  if (options.isUsername) isUsernameValid = isUsername(input);
  if (options.isPassword) isPasswordValid = isPassword(input);

  if (
    isEmptyValid &&
    isEmailValid &&
    isEqualToValid &&
    isWordValid &&
    isUsernameValid &&
    isPasswordValid
  ) {
    return true;
  } else {
    return false;
  }
};
