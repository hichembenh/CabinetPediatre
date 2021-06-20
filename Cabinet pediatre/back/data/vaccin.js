
const vaccin = [
    {
        ref:'BCG',
        title:'Vaccin contre tuberculose',
        ageDedie:'0',
        duree:'',
        dosage:'Une seule dose',
        description:'1 seule dose le plus tôt possible après la naissance.\n Ne sont plus ' +
            'indiquées dans la suite de cette 1ère injection ni la ' +
            'pratique de l’IDR à la tuberculine ni le rappel par le ' +
            'BCG'
    },
    {
        ref:'HBV-0',
        title:'Vaccin contre l’hépatite B',
        ageDedie:'0',
        duree:'',
        dosage:'Une seule dose',
        description:'cette prise est à ' +
            'administrer durant les 24 heures qui suivent la ' +
            'naissance quel que soit le résultat de la sérologie de ' +
            'l’hépatite B chez la mère'
    },
    {
        ref:'Pentavalent-1',
        title:'Vaccin contre la difterie-tétanos- poliomyélite- coqueluche et l’hémophile influenza b',
        ageDedie:'2',
        duree:'',
        dosage:'Une seule dose',
        description:'La première injection de vaccin Pentavalent' +
            ' qui inclut le vaccin de l’hépatite B, ' +
            'le DTC (vaccin contre la diphtérie, le tétanos, ' +
            'la coqueluche) et le vaccin Hib ' +
            '(contre l’haemophilus type b) se fait à 2 mois.' +
            ' Durant la même visite est administrée la prise du vaccin oral contre la poliomyélite.'
    },
    {
        ref:'VPI',
        title:'vaccin contre la poliomyélite',
        ageDedie:'2',
        duree:'',
        dosage:'Une seule dose',
        description:'1ère prise du vaccin contre la poliomyélite\n' +
            '(injectable)'
    },
    {
        ref:'PCV1',
        title:'vaccin contre la pneumococcique',
        ageDedie:'2',
        duree:'',
        dosage:'Une seule dose',
        description:'1ère prise du vaccin pneumococcique'
    },
    {
        ref:'Pentavalent-2',
        title:'Vaccin contre la difterie-tétanos- poliomyélite- coqueluche et l’hémophile influenza b',
        ageDedie:'3',
        duree:'',
        dosage:'Une seule dose',
        description:'2eme prise du vaccin pentavalent'+
            ' qui inclut le vaccin de l’hépatite B, ' +
            'le DTC (vaccin contre la diphtérie, le tétanos, ' +
            'la coqueluche) et le vaccin Hib ' +
            '(contre l’haemophilus type b) se fait à 2 mois.' +
            ' Durant la même visite est administrée la prise du vaccin oral contre la poliomyélite.'
    },
    {
        ref:'VPI',
        title:'vaccin contre la poliomyélite',
        ageDedie:'3',
        duree:'',
        dosage:'Une seule dose',
        description:'2eme prise du vaccin contre la poliomyélite\n' +
            '(injectable)'
    },
    {
        ref:'PCV2',
        title:'vaccin contre la pneumococcique',
        ageDedie:'4',
        duree:'',
        dosage:'Une seule dose',
        description:'2eme prise du vaccin pneumococcique'
    },
    {
        ref:'Pentavalent-3',
        title:'Vaccin contre la difterie-tétanos- poliomyélite- coqueluche et l’hémophile influenza b',
        ageDedie:'6',
        duree:'',
        dosage:'Une seule dose',
        description:'3eme prise du vaccin pentavalent'+
            ' qui inclut le vaccin de l’hépatite B, ' +
            'le DTC (vaccin contre la diphtérie, le tétanos, la coqueluche) et le vaccin Hib ' +
            '(contre l’haemophilus type b) se fait à 2 mois.' +
            ' Durant la même visite est administrée la prise du vaccin oral contre la poliomyélite.'
    },
    {
        ref:'VPO',
        title:'vaccin contre la poliomyélite',
        ageDedie:'6',
        duree:'',
        dosage:'Une seule dose',
        description:'2eme prise du vaccin contre la poliomyélite\n' +
            '(oral)'
    },
    {
        ref:'PCV3',
        title:'vaccin contre la pneumococcique',
        ageDedie:'11',
        duree:'',
        dosage:'Une seule dose',
        description:'2eme prise du vaccin pneumococcique'
    },
    {
        ref:'RR-1',
        title:'vaccin contre la rougeole et la rubéole',
        ageDedie:'12',
        duree:'',
        dosage:'Une seule dose',
        description:'1ère prise du vaccin combiné contre la rougeole et la rubéole'
    },
    {
        ref:'DTC4',
        title:'vaccin contre la diphtérie, le tétanos, la coqueluche',
        ageDedie:'18',
        duree:'',
        dosage:'Une seule dose',
        description:' Rappel par les vaccins DTC'
    },
    {
        ref:'VPO',
        title:'vaccin contre la poliomyélite',
        ageDedie:'18',
        duree:'',
        dosage:'Une seule dose',
        description:'Rappel par le vaccin contre la poliomyélite (oral)'
    },
    {
        ref:'RR-1',
        title:'vaccin contre la rougeole et la rubéole',
        ageDedie:'18',
        duree:'',
        dosage:'Une seule dose',
        description:'2eme prise du vaccin combiné contre la rougeole et la rubéole'
    },
    {
        ref:'VPO + VHA',
        title:'vaccin contre la poliomyélite + l’hépatite virale A',
        ageDedie:'72',
        duree:'',
        dosage:'Une seule dose',
        description:'- Rappel par le vaccin oral contre la poliomyélite\n' +
            '- Une prise du vaccin de l’hépatite virale A\n'
    },
    {
        ref:'dT',
        title:'vaccins contre la diphtérie et le tétanos',
        ageDedie:'84',
        duree:'',
        dosage:'Une seule dose',
        description:'- Rappel par les vaccins contre la diphtérie et le tétanos'
    },
    {
        ref:'dT + VPO',
        title:'vaccins contre la diphtérie et le tétanos',
        ageDedie:'144',
        duree:'',
        dosage:'Une seule dose',
        description:'- Rappel par les vaccins contre la diphtérie et le tétanos\n' +
            '- Rappel par le vaccin oral contre la poliomyélite'
    },
    {
        ref:'dT + VPO',
        title:'vaccins contre la diphtérie et le tétanos',
        ageDedie:'216',
        duree:'',
        dosage:'Une seule dose',
        description:'- Rappel par les vaccins contre la diphtérie et le tétanos\n' +
            '- Rappel par le vaccin oral contre la poliomyélite'
    },
]

export default vaccin