export const latinCharacters = 'a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ';
export const fullNameRegex = new RegExp(
  `^([${latinCharacters}]{3,})+\\s+([${latinCharacters}\\s]{3,})+$`
);
export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!%()_=?;:.])[0-9a-zA-Z$*&@#!%()_?=;:.]{8,}$/;
