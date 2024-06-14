
module.exports=(sequelize,DataTypes)=>{
    const patient=sequelize.define("patient",{
        email:{
            type:DataTypes.STRING,
            primaryKey: true

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
            type:DataTypes.STRING,
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
        FilePath:{
            type:DataTypes.STRING,
            unique:true
        },
        refreshToken:{
            type:DataTypes.STRING(2000)

        },
        profileImagePath:{
            type:DataTypes.STRING,
            unique:true

        }


    },{
        timestamps:false
    });
    patient.associate=models=>{
        patient.belongsTo(models.docteur)
        patient.hasMany(models.appointement,{
            onUpdate:"CASCADE",
            onDelete:"CASCADE"
        })
    }
   
    return patient;
}