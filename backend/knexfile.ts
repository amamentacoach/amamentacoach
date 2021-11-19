import path from 'path'

module.exports = {

  client:'pg',
  connection:process.env.DATABASE_URL ||{
      host:'localhost',
      user:'postgres',
      password:'joao',
      database:'amamentacoach',
  },

  ssl: { rejectUnauthorized: false },

  
  migrations:{
    directory: path.resolve(__dirname,'src','database','migrations')
  },

  seeds:{
    directory: path.resolve(__dirname,'src','database','seeds')
  },

};
