const { getUrlTitle } = require('../../modules/utils');
const models = require('../../models');
const { sequelize } = require('../../models');
const {url,user} = sequelize.models;
url.belongsTo(user);
user.hasMany(url);

//console.log(models);
module.exports = {
    get: async (req, res) => { 
    // models의 url에서 모든 테이블 목록을 찾는 요청을 하여 모든 응답을 받는다.(검색)
	const data = await models.url.findAll();
    res.status(200).send(data);
	},

	findByPkValue: async (req, res) => { 
    // id를 PK로 하여 id를 요청하면 visits이 1씩 증가한다.
	const id = req.params.id;
    //console.log(id);
    //console.log('--------------');
	const url = await models.url.findByPk(id); 
    //console.log(url);
	await url.increment('visits',{by:1});
	res.redirect(url.url); 
    // visits이 증가한 url을 다시호출.
	},

	post: (req, res)=> { 
    // models의 url에서 url과 title을 따로 만들어서 응답한다.(생성) - 단축URL
		const url = req.body.url;
		getUrlTitle(url, async (err, title) => {
		const urlModel = await models.url.create({ url, title });
        res.status(201).send(urlModel);
		});
	},
}; 