import bcrypt from 'bcryptjs'

const users= [
    {
        firstName:'mayara',
        lastName:'farkh',
        numTel:987654321,
        email:'mayara@gmail.com',
        password:bcrypt.hashSync('test',10),
        isAdmin:true
    },
    {
        firstName:'ali',
        lastName:'khak',
        numTel:987654321,
        email:'ali@gmail.com',
        password:bcrypt.hashSync('test',10)
    },
    {
        firstName:'sonia',
        lastName:'karak',
        numTel:987654321,
        email:'sonia@gmail.com',
        password:bcrypt.hashSync('test',10),
        isSec:true
    }
]

export default users