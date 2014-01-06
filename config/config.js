module.exports = function(){
  if (process.env.NODE_ENV == 'production'){
  	return {
      sinatra_app: 'http://ds-tools-api.herokuapp.com/titf'
    }
  } else {
    // local
    return {
      sinatra_app: 'http://localhost:4567/titf'
    }
  }
};