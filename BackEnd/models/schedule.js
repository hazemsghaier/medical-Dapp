module.exports=(sequelize,DataTypes)=>{
    const schedule=sequelize.define("schedule",{
        schedule_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        scheduleDate: {
            type: DataTypes.DATE,
            allowNull: false
          }

    })
    schedule.associate=(models)=>{
        schedule.belongsTo(models.docteur, {
            foreignKey: 'docteurEmail', 
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
    }
    return schedule;
}