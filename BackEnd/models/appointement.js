module.exports=(sequilize,DataTypes)=>{
    const appointement=sequilize.define("appointement",{
        appointement_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        appointementDate: {
            type: DataTypes.DATE,
            allowNull: false
          },
          statue:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
        
    })
    appointement.associate=(models)=>{
        appointement.belongsTo(models.docteur);
        appointement.belongsTo(models.patient)

    }

    return appointement;
}
//hello