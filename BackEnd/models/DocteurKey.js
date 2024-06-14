
module.exports=(sequelize,DataTypes)=>{
    const docteurKey=sequelize.define("docteurKey",{
        identifier:{
            type:DataTypes.STRING,
            primaryKey: true
        }

    },
    {
        timestamps:false
    })
    docteurKey.associate=models=>{
        docteurKey.belongsTo(models.docteur)
    }
  return docteurKey;
}