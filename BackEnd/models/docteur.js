const patient = require("./patient");

module.exports=(sequilize,DataTypes)=>{
    const docteur=sequilize.define("docteur",{
        email:{
            type:DataTypes.STRING,
            primaryKey: true,


        },
        firstName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        telNumber:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING(1000),
            allowNull:false
        },
        MetaMaskAddress:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        publicKey:{
            type:DataTypes.STRING(1000),
            allowNull:false,
            unique:true
        },
        refreshToken:{
            type:DataTypes.STRING(2000)

        },
        profileImagePath:{
            type:DataTypes.STRING(1000),
            unique:true

        }

    },{
        timestamps:false
    })
    docteur.associate=models=>{
        docteur.hasMany(models.patient,{
            onUpdate:"cascade"
        });
        docteur.hasOne(models.docteurKey);
        docteur.hasMany(models.appointement,{
            onUpdate:"CASCADE",
            onDelete:"CASCADE"
        });
        docteur.hasMany(models.schedule,{
            foreignKey: 'docteurEmail', 
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
    }
    
    return docteur;
}