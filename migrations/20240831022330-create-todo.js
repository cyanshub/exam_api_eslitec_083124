'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false // 必填
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false // 必填
      },
      remarks: {
        type: Sequelize.STRING,
        allowNull: true // 備註選填
      },
      time: {
        type: Sequelize.FLOAT, // Time 估計任務花費的時間, 假設單位為小時
        allowNull: false // 必填
      },
      date: {
        type: Sequelize.DATEONLY, // Date 預計任務的執行日期
        allowNull: false // 必填
      },
      location: {
        type: Sequelize.STRING, // Location 有時候任務會是會議，那就會有地點
        allowNull: true // 地點選填
      },
      creator: {
        type: Sequelize.STRING,
        allowNull: false // 必填
      },
      is_completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('todos')
  }
}
