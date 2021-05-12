export default function validateInfo(values) {
    let errors = {};

    if (!values.firstName.trim()) {
        errors.firstName = 'Champ obligatoire';
    }
     else if (!/^[A-Za-z]+/.test(values.firstName.trim())) {
       errors.firstName = 'Entrer un nom valide';
     }
     if (!values.lastName.trim()) {
        errors.lastName = 'Champ obligatoire';
    }
     else if (!/^[A-Za-z]+/.test(values.lastName.trim())) {
       errors.lastName = 'Entrer un nom valide';
     }

    if (!values.email) {
        errors.email = 'Champ obligatoire';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Address email invalide';
    }
    if (!values.password) {
        errors.password = 'Champ obligatoire';
    } else if (values.password.length < 6) {
        errors.password = 'Mot de passe ou email invalide';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Champ obligatoire';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Les mots de passes ne sont pas identique';
    }
    if (!values.numTel) {
        errors.numTel = 'Champ obligatoire';
    } else if (values.numTel.length !== 8) {
        errors.numTel= 'Numero de telephoe doit etre composé de 8 chiffres ';
    }
    return errors;
}