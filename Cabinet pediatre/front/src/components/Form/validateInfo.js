import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getRdvs} from "../../actions/rdv";
import moment from "moment";


export default function validateInfo(values) {
    let errors = {};

    if (!values.firstName.trim()) {
        errors.firstName = 'Champ obligatoire';
    }
     else if (!/^[A-Za-z]+/.test(values.firstName.trim())) {
       errors.firstName = 'Veuillez entrez un nom valide';
     }
     if (!values.lastName.trim()) {
        errors.lastName = 'Champ obligatoire';
    }
     else if (!/^[A-Za-z]+/.test(values.lastName.trim())) {
       errors.lastName = 'Veuillez entrez un nom valide';
     }

    if (!values.email) {
        errors.email = 'Champ obligatoire'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Address email invalide';
    }
    if (!values.password) {
        errors.password = 'Champ obligatoire'
    } else if (values.password.length < 6) {
        errors.password = 'Mot de passe doit au moins contenir 6 caracteres';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Champ obligatoire';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Les mots de passes ne sont pas identique';
    }
    if (!values.numTel) {
        errors.numTel = 'Champ obligatoire';
    } else if (values.numTel.length !== 8) {
        errors.numTel = 'Numero de telephone doit ce composé de 8 chiffres';
    }
    return errors;
}

export function validateKid (values){

    let errors={}

    if (!values.name.trim()){
        errors.name = 'Champ obligatoire';
    }else if (!/^[A-Za-z]+/.test(values.name.trim()))
        {
        errors.name='Entrer un nom valide';
    }
    if (!values.lastName){
        errors.lastName = 'Champ obligatoire';
    }else if (!/^[A-Za-z]+/.test(values.lastName.trim()))
    {
        errors.lastName='Entrer un nom valide';
    }
    if (Date(values.dateDebut))
    return errors
}

export function validateRdv (values,reservedDates){
    let errors = {}
    reservedDates.map(dateR=>{
        if (dateR===values.dateDebut.getTime()){
            errors.dateDebut='Date reservé, vous pouvez consulter le calendrier';
        }
    })
    return errors
}

export function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
