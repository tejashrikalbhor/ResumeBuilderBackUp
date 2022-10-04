'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('position', [{
        name: "GET",
        createdBy: "1",
        updatedBy: "1",
        createdOn: new Date(),
        updatedOn: new Date()
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('position', null, {});
     
  }
};
