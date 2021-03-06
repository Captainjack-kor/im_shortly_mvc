const fs = require('fs');
const Sequelize = require('sequelize');
const { expect } = require('chai');
const { sequelize } = require('../models');

describe('π (1-1) ORM μ€μ ', () => {
  it('cliλ₯Ό ν΅ν΄ νμν νμΌμ΄ μλμΌλ‘ λ§λ€μ΄μ‘λμ§ νμΈν©λλ€', () => {
    const hasModelIndex = fs.existsSync('./models/index.js');
    const hasConfig = fs.existsSync('./config/config.json');
    const hasMigrations = fs.existsSync('./migrations');
    expect(hasModelIndex).to.be.true;
    expect(hasConfig).to.be.true;
    expect(hasMigrations).to.be.true;
  });

  it('model/index.js νμΌμ΄ μ ν¨νμ§ νμΈν©λλ€', () => {
    expect(sequelize).to.be.instanceof(Sequelize);
  });

  it('mysqlμ μ μν  μ μλμ§ νμΈν©λλ€', async () => {
    try {
      await sequelize.authenticate();
      expect(true).to.be.true;
    } catch (error) {
      console.error(`
  --------------------------------------------------------------------------------
  MySQLμ μ μν  μ μμ΅λλ€. λ‘κ·Έλ₯Ό ν΅ν΄ μμΈμ λΆμνκ³ , μ μν  μ μλλ‘ config.jsonμ μ€μ νμΈμ.
  --------------------------------------------------------------------------------
  `, error);
      expect().to.throw(Error);
    }
  })

  after(() => {
    console.log('\n' + '='.repeat(80))
  })
});

describe('π (1-2) λͺ¨λΈ μμ±', () => {
  let urlModel;

  before(() => {
    urlModel = require('../models').url;
  })

  it('url λͺ¨λΈμ΄ μ‘΄μ¬ν΄μΌ ν©λλ€', () => {
    expect(urlModel).to.exist;
  })

  it('url λͺ¨λΈμ μκ΅¬νλ νλλ₯Ό κ°κ³  μμ΄μΌ ν©λλ€', () => {
    const keys = Object.keys(urlModel.tableAttributes);
    console.table(keys);
    expect(keys).to.include.members([
      'id',
      'url',
      'title',
      'visits',
      'createdAt',
      'updatedAt'
    ])
  })

  it('url λͺ¨λΈμ κ° νλλ μ ν΄μ§ νμμΌλ‘ μμ±λμ΄μΌ ν©λλ€', () => {
    const fieldTypeMap = {
      id: 'INTEGER',
      url: 'STRING',
      title: 'STRING',
      visits: 'INTEGER',
      createdAt: 'DATE',
      updatedAt: 'DATE'
    }
    for (let key in urlModel.tableAttributes) {
      if (key !== 'userId') {
        expect(urlModel.tableAttributes[key].type.constructor.name).to.be.eql(fieldTypeMap[key])
      }
    }
  })

  it('url λͺ¨λΈμ visits νλλ κΈ°λ³Έκ°μ΄ 0μ΄μ΄μΌ ν©λλ€', () => {
    expect(urlModel.tableAttributes.visits.defaultValue).to.be.eql(0)
  })

  after(() => {
    console.log('\n' + '='.repeat(80))
  })
});


describe('π (1-3) λ§μ΄κ·Έλ μ΄μ', () => {
  let urlModel;

  before(() => {
    urlModel = require('../models').url;
  })

  it('λ§μ΄κ·Έλ μ΄μμ νλ€λ©΄, urls νμ΄λΈμ΄ μ‘΄μ¬ν΄μΌ ν©λλ€', async () => {
    const [results] = await sequelize.query('describe urls');
    const fieldTypeMap = results.map(r => [r.Field, r.Type])
    console.table(fieldTypeMap)

    expect(fieldTypeMap).to.deep.include.members([
      ['id', 'int'],
      ['url', 'varchar(255)'],
      ['title', 'varchar(255)'],
      ['visits', 'int'],
      ['createdAt', 'datetime'],
      ['updatedAt', 'datetime']
    ])
  });

  after(() => {
    console.log('\n' + '='.repeat(80))
  })
});
