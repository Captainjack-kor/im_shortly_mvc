'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('urls', 'userId', Sequelize.INTEGER);

    await queryInterface.addConstraint('urls', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_name',
      reference: {
        table: 'users',
        fileds: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await removeConstraint('urls', 'custom_fkey_constraint_name')

    await removeColumn('urls', 'userId')
  }
};


/*
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      Add altering commands here.
     
      Example:
     await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     

    await queryInterface.addColunm('urls', 'userId', Sequelize.INTEGER);

    // userID를 FK로 지정

    await queryInterface.addConstraint('urls', {
      fields :['userId'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_name',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete : 'cascade',
      onUpdate : 'cascade'
    })


  },

  down: async (queryInterface, Sequelize) => {
    
      Add reverting commands here.
     
     *Example:
      await queryInterface.dropTable('users');
     

     await removeConstraint('urls', 'custom_fkey_constraint_name')

     await removeColunm('urls', 'userId')
  }
};
*/