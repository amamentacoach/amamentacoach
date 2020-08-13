import path from 'path'

module.exports = {

  client:'pg',
  connection:process.env.DATABASE_URL ||{
      host:'localhost',
      user:'joao',
      password:'joao',
      database:'amamentacoach'
  },
  
  migrations:{
    directory: path.resolve(__dirname,'src','database','migrations')
  }

};
