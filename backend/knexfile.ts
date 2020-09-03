import path from 'path'

module.exports = {

  client:'pg',
  connection:process.env.DATABASE_URL ||{
      host:'localhost',
      user:'postgres',
      password:'postgres',
      database:'amamentacoach'
  },
  
  migrations:{
    directory: path.resolve(__dirname,'src','database','migrations')
  }

};
