define({ "api": [
  {
    "type": "get",
    "url": "/bebes",
    "title": "Listagem",
    "description": "<p>Listagem dos bebes de uma determinada mãe</p>",
    "group": "Bebês",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n[\n  {\n      \"id_bebe\":7,\n      \"nome\":\"Enzo Gabriel\",\n      \"data_parto\":\"2020-08-28\",\n      \"semanas_gest\": 35,\n      \"dias_gest\":5,\n      \"peso\":2.5,\n      \"tipo_parto\":true, // false: parto normal | true: cesaria\n      \"local\":\"UCI\",\n  },\n  {\n      \"id_bebe\":8,\n      \"nome\":\"Valentina\",\n      \"data_parto\":\"2020-08-28\",\n      \"semanas_gest\": 35,\n      \"dias_gest\":5,\n      \"peso\":2.7,\n      \"tipo_parto\":true, // false: parto normal | true: cesaria\n      \"local\":\"UCI\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Bebês",
    "name": "GetBebes"
  },
  {
    "type": "get",
    "url": "/bebes/alta",
    "title": "Buscar bebes que podem receber alta",
    "description": "<p>Retorna a list“Motivacao”a de bebes da mae que podem receber alta</p>",
    "group": "Bebês",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n[\n  {\n      \"nome\": \"Joao\",\n      \"id\": 5,\n      \"local\": \"UTI Neonatal\",\n      \"data_parto\": \"2020-08-28T03:00:00.000Z\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Bebês",
    "name": "GetBebesAlta"
  },
  {
    "type": "post",
    "url": "/bebes",
    "title": "Cadastro",
    "group": "Bebês",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "{\n    \"nome\":\"Enzo Gabriel\",\n    \"data_parto\":\"2020-08-28\",\n    \"semanas_gest\": 35,\n    \"dias_gest\":5,\n    \"complicacoes\":true,\n    \"peso\":2.5,\n    \"apgar1\":8,\n    \"apgar2\":10,\n    \"tipo_parto\":true, // false: parto normal | true: cesaria\n    \"local\":\"UCI Neonatal\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n  {\n      \"id_bebe\":7,\n      \"nome\":\"Enzo Gabriel\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Bebês",
    "name": "PostBebes"
  },
  {
    "type": "post",
    "url": "/bebes/:id/alta",
    "title": "Informar Alta do bebe",
    "group": "Bebês",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "{\n    \"local\":\"Casa\" // locais de alta: \"UCI Neonatal\", \"Alojamento Conjunto\" e \"Casa\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Bebês",
    "name": "PostBebesIdAlta"
  },
  {
    "type": "get",
    "url": "/duvidas/frequentes",
    "title": "Listagem de Dúvidas",
    "description": "<p>Listagem de duvidas frequentes</p>",
    "group": "Canal_de_comunicacao",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n[\n  {\n      \"descricao\": \"Como cadastrar minhas ordenhas?\",\n      \"resposta\": \"Basta acessar o diário\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Canal_de_comunicacao",
    "name": "GetDuvidasFrequentes"
  },
  {
    "type": "post",
    "url": "/duvidas",
    "title": "Cadastro",
    "description": "<p>A mãe cadastra uma dúvida</p>",
    "group": "Canal_de_comunicacao",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "{\n    \"descricao\":\"Como informo minhas ordenhas?\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Canal_de_comunicacao",
    "name": "PostDuvidas"
  },
  {
    "type": "post",
    "url": "/acessos/app",
    "title": "Acessos App",
    "description": "<p>Informa se mae acessou app e retorna caso necessite uma acao a ser tomada</br></p>",
    "group": "Controle_de_Acessos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Retorno do primeiro acesso",
          "content": "{\n \"acao\":\"1D\",\n}",
          "type": "json"
        },
        {
          "title": "Retorno quando bebe completar 15 dias  ",
          "content": "{\n \"acao\":\"15D\",\n}",
          "type": "json"
        },
        {
          "title": "Retorno quando bebe completar 1 mes  ",
          "content": "{\n \"acao\":\"1M\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Controle_de_Acessos",
    "name": "PostAcessosApp"
  },
  {
    "type": "post",
    "url": "/acessos/diario",
    "title": "Acessos Diario",
    "description": "<p>Informa se mae acessou diario</p>",
    "group": "Controle_de_Acessos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Controle_de_Acessos",
    "name": "PostAcessosDiario"
  },
  {
    "type": "post",
    "url": "/acessos/mensagens",
    "title": "Acessos Mensagens",
    "description": "<p>Informa se mae acessou as mensagens</p>",
    "group": "Controle_de_Acessos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Controle_de_Acessos",
    "name": "PostAcessosMensagens"
  },
  {
    "type": "post",
    "url": "/acessos/ordenha",
    "title": "Acessos Ordenha",
    "description": "<p>Informa se mae acessou a ordenha</p>",
    "group": "Controle_de_Acessos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Controle_de_Acessos",
    "name": "PostAcessosOrdenha"
  },
  {
    "type": "post",
    "url": "/acessos/videos",
    "title": "Acessos Videos",
    "description": "<p>Informa se mae acessou videos</p>",
    "group": "Controle_de_Acessos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Controle_de_Acessos",
    "name": "PostAcessosVideos"
  },
  {
    "type": "post",
    "url": "/acessos/videos-inicio",
    "title": "Acessos Inicio dos Videos",
    "description": "<p>Informa se mae acessou o inicio dos videos</p>",
    "group": "Controle_de_Acessos",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Controle_de_Acessos",
    "name": "PostAcessosVideosInicio"
  },
  {
    "type": "get",
    "url": "/amamentacao/resultados",
    "title": "Resultado da enquete amamentacao",
    "description": "<p>Retorna todas as perguntas, alternativas e total de respostas da enquete</p>",
    "group": "Enquetes",
    "success": {
      "examples": [
        {
          "title": "Exemplo Resposta:",
          "content": "[\n  {\n    \"id\": 1,\n    \"pergunta\": \"Pra você, qual é a melhor parte de dedicar-se a amamentar um bebê prematuro?\",\n    \"alternativas\": [\n      {\n        \"descricao\": \"Sentimento de empoderamento (lidar com este desafio me faz acreditar que sou capaz de outras grandes coisas)\",\n        \"total\": \"1\"\n      },\n      {\n        \"descricao\": \"Gratidão pela oportunidade (penso que muitas mulheres, por muitas razões, não conseguem nem tentar)\",\n        \"total\": \"1\"\n      },\n      {\n        \"descricao\": \"Outro\",\n        \"total\": \"4\"\n      },\n      {\n        \"descricao\": \"A formação de um poderoso vínculo ao travar uma batalha em parceria com meu(a) pequeno(a)\",\n        \"total\": \"4\"\n      },\n      {\n        \"descricao\": \"Não consigo identificar nada de bom\",\n        \"total\": \"13\"\n      }\n    ]\n  },\n  {\n    \"id\": 2,\n    \"pergunta\": \"O que te motiva a continuar tentando amamentar?\",\n    \"alternativas\": [\n      {\n        \"descricao\": \"O incentivo que estou recebendo da minha família\",\n        \"total\": \"3\"\n      },\n      {\n        \"descricao\": \"Outras motivações\",\n        \"total\": \"9\"\n      },\n      {\n        \"descricao\": \"Não estou muito motivada a continuar\",\n        \"total\": \"10\"\n      }\n    ]\n  },\n  {\n    \"id\": 3,\n    \"pergunta\": \"Você sente que está recebendo toda a ajuda de que precisa para continuar tentando amamentar seu bebê?\",\n    \"alternativas\": [\n      {\n        \"descricao\": \"Parcialmente, tanto dos profissionais quanto da minha família\",\n        \"total\": \"7\"\n      },\n      {\n        \"descricao\": \"Apenas dos profissionais\",\n        \"total\": \"2\"\n      },\n      {\n        \"descricao\": \"Sim, tanto dos profissionais quanto da minha família\",\n        \"total\": \"1\"\n      },\n      {\n        \"descricao\": \"Não estou recebendo ajuda\",\n        \"total\": \"10\"\n      }\n    ]\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Enquetes",
    "name": "GetAmamentacaoResultados"
  },
  {
    "type": "get",
    "url": "/perguntas/:categoria",
    "title": "Listagem por categoria",
    "description": "<p>Perguntas quando<br/> Categoria das Enquetes:<br/> 1 - Amamentar um prematuro<br/> 2 - DIÁRIO: Sentimentos<br/> 3 - DIÁRIO: Metas<br/> 4 - DIÁRIO: Ajuda<br/> 5 - Participação do pai<br/> 6 - Acoes Realizadas com o bebe<br/> 7 - Escala<br/> 8 - Enquete Motivacao<br/> 9 - Enquete Sobre ajuda<br/> 10 - Enquete Meu bebe hoje<br/></p>",
    "group": "Enquetes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "[\n    {\n        \"id\": 1,\n        \"categoria\": 1,\n        \"descricao\": \"Pra você, qual é a melhor parte de dedicar-se a amamentar um bebê prematuro?\",\n        \"alternativas\": [\n        \"Sentimento de empoderamento (lidar com este desafio me faz acreditar que sou capaz de outras grandes coisas)\",\n        \"Gratidão pela oportunidade (penso que muitas mulheres, por muitas razões, não conseguem nem tentar)\",\n        \"A formação de um poderoso vínculo ao travar uma batalha em parceria com meu(a) pequeno(a)\",\n        \"Não consigo identificar nada de bom\"\n        ],\n        \"outro\": true, // Caso true ter um campo para preencher Outro\n        \"multiplas\": true,\n        \"alvo\": \"GERAL\" // Publico alvo da pergunta. Pode ser: \"GERAL\", \"AC\" ou \"UCI/UTI\"\n    },\n    {\n        \"id\": 2,\n        \"categoria\": 1,\n        \"descricao\": \"O que te motiva a continuar tentando amamentar?\",\n        \"alternativas\": [\n        \"Pensar que é o melhor para o meu bebê\",\n        \"O incentivo que estou recebendo dos profissionais\",\n        \"O incentivo que estou recebendo da minha família\",\n        \"Pensar no custo da fórmula\",\n        \"Outras motivações\",\n        \"Não estou muito motivada a continuar\"\n        ],\n        \"outro\": false,\n        \"multiplas\": true,\n        \"alvo\": \"GERAL\" // Publico alvo da pergunta. Pode ser: \"GERAL\", \"AC\" ou \"UCI/UTI\"\n    },\n    {\n        \"id\": 3,\n        \"categoria\": 1,\n        \"descricao\": \"Você sente que está recebendo toda a ajuda de que precisa para continuar tentando amamentar seu bebê?\",\n        \"alternativas\": [\n        \"Sim, tanto dos profissionais quanto da minha família\",\n        \"Apenas da minha família\",\n        \"Apenas dos profissionais\",\n        \"Parcialmente, tanto dos profissionais quanto da minha família\",\n        \"Não estou recebendo ajuda\"\n        ],\n        \"outro\": false,\n        \"multiplas\": false,\n         \"alvo\": \"GERAL\" // Publico alvo da pergunta. Pode ser: \"GERAL\", \"AC\" ou \"UCI/UTI\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Enquetes",
    "name": "GetPerguntasCategoria"
  },
  {
    "type": "get",
    "url": "/perguntas/escalaealimentacao",
    "title": "Perguntas da escala e da alimentacao",
    "description": "<p>Perguntas da escala e da amamentacao: Responder quandoa acessar o App<br/></p>",
    "group": "Enquetes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "{\n \"escala\": [\n   {\n     \"id\": 17,\n     \"categoria\": 7,\n     \"descricao\": \"Eu consigo retirar leite suficiente da mama para o meu bebê.\",\n     \"alternativas\": [\n       \"1\",\n       \"2\",\n       \"3\",\n       \"4\",\n       \"5\"\n     ],\n     \"outro\": false,\n     \"multiplas\": false,\n     \"alvo\": \"GERAL\"\n   },\n   {\n     \"id\": 18,\n     \"categoria\": 7,\n     \"descricao\": \"Eu consigo lidar com o fato de que retirar leite da mama e amamentar podem ser demorados.\",\n     \"alternativas\": [\n       \"1\",\n       \"2\",\n       \"3\",\n       \"4\",\n       \"5\"\n     ],\n     \"outro\": false,\n     \"multiplas\": false,\n     \"alvo\": \"GERAL\"\n   },\n   {\n     \"id\": 19,\n     \"categoria\": 7,\n     \"descricao\": \"Eu consigo lidar bem com qualquer situação da amamentação (retirada de leite da mama e a amamentação em si) da mesma forma que faço com outras tarefas difíceis.\",\n     \"alternativas\": [\n       \"1\",\n       \"2\",\n       \"3\",\n       \"4\",\n       \"5\"\n     ],\n     \"outro\": false,\n     \"multiplas\": false,\n     \"alvo\": \"GERAL\"\n   },\n   {\n     \"id\": 20,\n     \"categoria\": 7,\n     \"descricao\": \"Eu consigo lidar com a amamentação de forma que eu me sinta satisfeita.\",\n     \"alternativas\": [\n       \"1\",\n       \"2\",\n       \"3\",\n       \"4\",\n       \"5\"\n     ],\n     \"outro\": false,\n     \"multiplas\": false,\n     \"alvo\": \"GERAL\"\n   },\n   {\n     \"id\": 21,\n     \"categoria\": 7,\n     \"descricao\": \"Eu continuo querendo amamentar\",\n     \"alternativas\": [\n       \"1\",\n       \"2\",\n       \"3\",\n       \"4\",\n       \"5\"\n     ],\n     \"outro\": false,\n     \"multiplas\": false,\n     \"alvo\": \"GERAL\"\n   },\n   {\n     \"id\": 22,\n     \"categoria\": 7,\n     \"descricao\": \"Eu estou satisfeita com a minha experiência de amamentar.\",\n     \"alternativas\": [\n       \"1\",\n       \"2\",\n       \"3\",\n       \"4\",\n       \"5\"\n     ],\n     \"outro\": false,\n     \"multiplas\": false,\n     \"alvo\": \"GERAL\"\n   }\n ],\n \"alimentacao\": {\n   \"id\": 5,\n   \"categoria\": 2,\n   \"descricao\": \"Como meu bebê está se alimentando:\",\n   \"alternativas\": [\n     \"Apenas no meu peito\",\n     \"No meu peito, c/ complemento por copinho\",\n     \"Por relactação/ translactação\",\n     \"Apenas por copinho \",\n     \"Por chuca\",\n     \"Por sonda\"\n   ],\n   \"outro\": false,\n   \"multiplas\": false,\n   \"alvo\": \"GERAL\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Enquetes",
    "name": "GetPerguntasEscalaealimentacao"
  },
  {
    "type": "post",
    "url": "/responder/alimentacao",
    "title": "Responder Alimentacao",
    "description": "<p>Responde pergunta de alimentação <br> Parametro &quot;ocasiao&quot; pode conter os seguintes valores</br> &quot;ALTA&quot; : Quando o bebe recebeu alta.</br> &quot;15D&quot; : Quando completou 15 dias</br> &quot;1M&quot; : Quando completou 1 mes</p>",
    "group": "Enquetes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "{\n    \"ocasiao\": \"15D\", // Esta respondendo a alimentacao quando bebe completou 15 dias\n    \"descricao\":\"Por relactação/translactação\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Enquetes",
    "name": "PostResponderAlimentacao"
  },
  {
    "type": "post",
    "url": "/responder/escala",
    "title": "Responder Escala",
    "description": "<p>Responde a escala <br> Parametro &quot;ocasiao&quot; pode conter os seguintes valores</br> &quot;1&quot; : Caso esteja respondendo a escala no primeiro uso (primeira vez).</br> &quot;ALTA&quot; : Quando o bebe recebeu alta.</br> &quot;15D&quot; : Quando completou 15 dias</br> &quot;1M&quot; : Quando completou 1 mes</p>",
    "group": "Enquetes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "{\n    \"ocasiao\": \"15D\", // Esta respondendo a escala quando bebe completou 15 dias\n    \"respostas\":[ // um array com todas as respostas da escala\n          {\"pergunta_id\":17,\"descricao\":\"3\"},\n          {\"pergunta_id\":18,\"descricao\":\"4\"},\n          {\"pergunta_id\":19,\"descricao\":\"5\"},\n          {\"pergunta_id\":20,\"descricao\":\"4\"},\n          {\"pergunta_id\":21,\"descricao\":\"3\"},\n          {\"pergunta_id\":22,\"descricao\":\"2\"},\n          {\"pergunta_id\":23,\"descricao\":\"4\"},\n          {\"pergunta_id\":24,\"descricao\":\"4\"},\n          {\"pergunta_id\":25,\"descricao\":\"5\"},\n          {\"pergunta_id\":26,\"descricao\":\"2\"},\n          {\"pergunta_id\":27,\"descricao\":\"3\"},\n          {\"pergunta_id\":28,\"descricao\":\"4\"},\n          {\"pergunta_id\":29,\"descricao\":\"5\"},\n          {\"pergunta_id\":30,\"descricao\":\"3\"},\n          {\"pergunta_id\":31,\"descricao\":\"3\"},\n          {\"pergunta_id\":32,\"descricao\":\"4\"},\n          {\"pergunta_id\":33,\"descricao\":\"4\"},\n          {\"pergunta_id\":34,\"descricao\":\"5\"}\n    ] \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Enquetes",
    "name": "PostResponderEscala"
  },
  {
    "type": "post",
    "url": "/responder/:pergunta_id",
    "title": "Responder pergunta",
    "description": "<p>Responde uma pergunta</p>",
    "group": "Enquetes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "{\n    \"respostas\":[\"O incentivo que estou recebendo dos profissionais\"] // um array para caso selecione mais de uma opcao\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Exemplo Resposta quando houver feedback (MOSTRAR POPUP):",
          "content": "{\n    \"feedback\":\"Continue firme, Fulana! Talvez o conteúdo “Emoções e Amamentação” possa te ajudar hoje.\",\n    \"redirect\":\"EmotionsAndBreastfeeding\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Enquetes",
    "name": "PostResponderPergunta_id"
  },
  {
    "type": "get",
    "url": "/bebes/:bebe_id/mamadas",
    "title": "Listagem",
    "description": "<p>Lista as mamadas do bebe de id informado</p>",
    "group": "Mamadas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso: Status 200",
          "content": "\n {\n  \"id\": 1,\n  \"nome\": \"Enzo Gabriel\",\n  \"mamadas\": [\n    {\n      \"id\": 1,\n      \"data_hora\": \"2020-09-24T17:40:31.501Z\",\n      \"mama\": \"D\",\n      \"duracao\": 5,\n      \"bebe_id\": 1\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Mamadas",
    "name": "GetBebesBebe_idMamadas"
  },
  {
    "type": "get",
    "url": "/bebes/:bebe_id/mamadas/:date",
    "title": "Listagem por data",
    "description": "<p>Passar data no formato yyyy-mm-dd</p>",
    "group": "Mamadas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso: Status 200",
          "content": "\n {\n  \"id\": 1,\n  \"nome\": \"Enzo Gabriel\",\n  \"mamadas\": [\n    {\n      \"id\": 1,\n      \"data_hora\": \"2020-09-24T17:40:31.501Z\",\n      \"mama\": \"D\",\n      \"duracao\": 5,\n      \"bebe_id\": 1\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Mamadas",
    "name": "GetBebesBebe_idMamadasDate"
  },
  {
    "type": "post",
    "url": "/bebes/:bebe_id/mamadas",
    "title": "Cadastro",
    "description": "<p>Cadastra uma mamada do bebe de id informado</p>",
    "group": "Mamadas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "{\n    \"mama\":\"D\", // Caso seja nas duas mamas passar no formato \"D,E\"\n    \"duracao\":5,\n    \"data_hora\":\"2020-09-24T17:40:31.501Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Mamadas",
    "name": "PostBebesBebe_idMamadas"
  },
  {
    "type": "get",
    "url": "/mensagens",
    "title": "Listar Mensagens",
    "description": "<p>Retorna no maximo 7 mensagens por pagina </br>Ordenadas de mais recente para mais antiga </br>O header X-Total-Count Retorna a quantidade total de mensagens.</p>",
    "group": "Mensagens",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "page",
            "description": "<p>Numero da pagina.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Exemplo Resposta:",
          "content": "[\n    {\n        \"nome\": \"Fulana de Tal\",\n        \"conteudo\": \"Ola mamaes, como estao?\",\n        \"data\": \"2020-11-13T11:18:13.069Z\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Mensagens",
    "name": "GetMensagens"
  },
  {
    "type": "post",
    "url": "/mensagens",
    "title": "Enviar Mensagem",
    "description": "<p>Envia uma nova mensagem</p>",
    "group": "Mensagens",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "{\n    \"conteudo\":\"Ola mamaes, como estao?\" // um array para caso selecione mais de uma opcao\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Mensagens",
    "name": "PostMensagens"
  },
  {
    "type": "get",
    "url": "/maes",
    "title": "Dados da mae",
    "description": "<p>Retorna os dados da mae logada</p>",
    "group": "Mães",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso:",
          "content": "{\n\"id\": 1,\n\"email\": \"fulana@email.com\",\n\"nome\": \"Fulana de Tal\",\n\"ultimo_acesso\": \"2021-03-06T20:21:12.824Z\",\n\"imagem_mae\": null,\n\"imagem_bebe\": null,\n\"imagem_pai\": null,\n\"companheiro\": true,\n\"bebes\": [\n    {\n       \"id\": 1,\n       \"nome\": \"Sabrina\",\n       \"data_parto\": \"2020-08-28T03:00:00.000Z\",\n       \"semanas_gest\": 35,\n       \"dias_gest\": 5,\n       \"peso\": 2.5,\n       \"apgar1\": 8,\n       \"apgar2\": 10,\n       \"tipo_parto\": true,\n       \"local\": \"UCI Neonatal\",\n       \"mae_id\": 1,\n       \"complicacoes\": true,\n       \"mamadas\": [\n           {\n           \"id\": 1,\n           \"data_hora\": \"2020-09-24T17:40:31.501Z\",\n           \"mama\": \"D\",\n           \"duracao\": 10\n           }\n       ]\n    }\n],\n\"ordenhas\": [\n    {\n      \"id\": 2,\n      \"data_hora\": \"2020-09-24T17:40:31.501Z\",\n      \"qtd_leite\": 100,\n      \"mama\": \"D\",\n      \"duracao\": 5,\n      \"mae_id\": 1\n    }\n]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Mães",
    "name": "GetMaes"
  },
  {
    "type": "post",
    "url": "/alterarsenha",
    "title": "Alterar senha",
    "description": "<p>Altera a senha da mãe logada</p>",
    "group": "Mães",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "{\n    \"senha\":\"novasenha\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Mães",
    "name": "PostAlterarsenha"
  },
  {
    "type": "post",
    "url": "/esqueceusenha",
    "title": "Esqueceu sua senha",
    "description": "<p>Mãe recebe um email com um link para alteração da sua senha.</p>",
    "group": "Mães",
    "parameter": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "{\n    \"email\":\"fulana@email.com\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Mães",
    "name": "PostEsqueceusenha"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "description": "<p>Realiza o login da mae e retorna o token de acesso.</p>",
    "group": "Mães",
    "parameter": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "{\n    \"email\":\"fulana@email.com\",\n    \"senha\":\"abc123\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n  {\n      \"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5bGFuQGJvc2Nhcmluby5jb20iLCJwYXNzd29yZCI6InlhMGdzcWh5NHd6dnV2YjQifQ.yN_8-ge9mFgsnYHnPEh_ZzNP7YKvSbQ3Alug9HMCsM\",\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Mães",
    "name": "PostLogin"
  },
  {
    "type": "post",
    "url": "/maes",
    "title": "Cadastro",
    "group": "Mães",
    "parameter": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "{\n    \"email\":\"fulana@email.com\",\n    \"senha\":\"abc123\",\n    \"nome\": \"Fulana de Tal\",\n    \"data_nascimento\":\"1990-05-05\",\n    \"amamentou_antes\":false,\n    \"companheiro\":true,\n    \"moram_juntos\":\"2,0\", // caso nao more junto enviar NULL | Formato ano,meses\n    \"escolaridade\":\"Ensino Medio Completo\",\n    \"renda\":\"Entre 1 e 3 salarios minimos\",\n    \"qtd_gravidez\":2,\n    \"tempo_amamentacao\":\"2,3\", // tempo de amamentacao total | formato: ano,meses\n    \"whatsapp\":\"(43) 999999999\",\n    \"gestacao_planejada\": true,\n    \"primeira_visita\": \"12h\",\n    \"primeiro_estimulo\": true, // Massagem/ordenha = false | Sucção = true\n    \"tempo_primeiro_estimulo\": \"7-12h\",\n    \"qtd_filhos_vivos\": 3,\n    \"orientacao_prenatal\": true,\n    \"ocupacao\": true, // Em casa (do lar) = false | Fora de casa = true\n    \"licenca_maternidade\": 6 // Qtd de meses de licenca maternidade - Caso nao tenha: null\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n  {\n      \"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAyNjczMDA5LCJleHAiOjE2MDUyNjUwMDl9.wFrGTEfQ3s_7DNlsFDV88NDYGtXPMrpT-mlWvSAEomg\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Mães",
    "name": "PostMaes"
  },
  {
    "type": "post",
    "url": "/subscribe",
    "title": "Inscricao para PushNotification",
    "description": "<p>Informa o userId retornado pelo OneSignal para o recebimento de Push Notifications</p>",
    "group": "Mães",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "{\n    \"userId\":\"aabd2dcd-d5d6-4dba-9959-89019e66e78c\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Mães",
    "name": "PostSubscribe"
  },
  {
    "type": "get",
    "url": "/enviarNotificacoes",
    "title": "Teste de push",
    "description": "<p>Envia notificacao para todas as maes que nao preencheram o diario nesse dia</br></p>",
    "group": "Notificação",
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Notificação",
    "name": "GetEnviarnotificacoes"
  },
  {
    "type": "get",
    "url": "/maes/ordenhas",
    "title": "Listagem",
    "description": "<p>Lista as ordenhas da mãe logada informado</p>",
    "group": "Ordenhas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso: Status 200",
          "content": "\n[\n   {\n     \"id\": 1,\n     \"data_hora\": \"2020-09-24T17:40:31.501Z\",\n     \"qtd_leite\": 100,\n     \"mama\": \"D\",\n     \"duracao\": 5,\n     \"bebe_id\": 1\n   }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Ordenhas",
    "name": "GetMaesOrdenhas"
  },
  {
    "type": "get",
    "url": "/maes/ordenhas/:date",
    "title": "Listagem por data",
    "description": "<p>Passar data no formato yyyy-mm-dd</p>",
    "group": "Ordenhas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso: Status 200",
          "content": "\n[\n   {\n     \"id\": 1,\n     \"data_hora\": \"2020-09-24T17:40:31.501Z\",\n     \"qtd_leite\": 100,\n     \"mama\": \"D\",\n     \"duracao\": 5,\n     \"bebe_id\": 1\n   }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Ordenhas",
    "name": "GetMaesOrdenhasDate"
  },
  {
    "type": "post",
    "url": "/maes/ordenhas",
    "title": "Cadastro",
    "description": "<p>Cadastra uma ordenha da mae logada</p>",
    "group": "Ordenhas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Exemplo Request:",
          "content": "{\n    \"qtd_leite\":100,\n    \"mama\":\"D\", // Caso seja nas duas mamas passar no formato \"D,E\"\n    \"duracao\":5,\n    \"data_hora\":\"2020-09-24T17:40:31.501Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Ordenhas",
    "name": "PostMaesOrdenhas"
  },
  {
    "type": "get",
    "url": "/relatorios/diario",
    "title": "Exibição do relatório diário",
    "description": "<p>Exibição do relatório diário<br> Retorna as mamadas, as ordenhas e uma pergunta sobre as ações realizadas no bebe</p>",
    "group": "Relatórios",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n  {\n    \"bebes\": [\n      {\n        \"nome\": \"Joao\",\n        \"id\": 5,\n        \"mamadas\": [\n          {\n            \"id\": 3,\n            \"data_hora\": \"2021-04-01T00:00:00.000Z\",\n            \"mama\": \"D\",\n            \"duracao\": 9,\n            \"bebe_id\": 5\n          }\n        ]\n      }\n    ],\n    \"ordenhas\": [],\n    \"perguntas\": []\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Relatórios",
    "name": "GetRelatoriosDiario"
  },
  {
    "type": "get",
    "url": "/relatorios/semanal",
    "title": "Exibição do relatório semanal",
    "description": "<p>Exibição do relatório semanal<br> Retorna a resposta da mãe sobre algumas perguntas nos ultimos 7 diass</p>",
    "group": "Relatórios",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "  HTTP/1.1 200 OK\n[\n  {\n    \"pergunta\": \"Como me senti:\",\n    \"respostas\": [\n      \"Feliz\",\n      \"Orgulhosa\"\n    ]\n  },\n  {\n    \"pergunta\": \"Como meu bebê esteve se alimentando:\",\n    \"respostas\": []\n  },\n  {\n    \"pergunta\": \"Minhas Metas para Pensamentos e Sentimentos\",\n    \"respostas\": []\n  },\n  {\n    \"pergunta\": \"Minhas Metas para Ações\",\n    \"respostas\": []\n  },\n  {\n    \"pergunta\": \"Precisei de uma ajuda específica...\",\n    \"respostas\": [\n      \"Sim\"\n    ]\n  },\n  {\n    \"pergunta\": \"Meu ombro amigo da semana:\",\n    \"respostas\": []\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Relatórios",
    "name": "GetRelatoriosSemanal"
  },
  {
    "type": "post",
    "url": "/upload/bebe",
    "title": "Upload foto do bebe",
    "description": "<p>Faz o upload da foto da bebe</p>",
    "group": "Uploads",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "foto",
            "description": "<p>Foto do bebe</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "filename",
            "description": "<p>Endpoint da imagem: /uploads/picture-1602090536124.jpg</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso: Status 200",
          "content": "\n{\n      \"filename\": \"picture-1602090536124.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Uploads",
    "name": "PostUploadBebe"
  },
  {
    "type": "post",
    "url": "/upload/mae",
    "title": "Upload foto da mae",
    "description": "<p>Faz o upload da foto da mae</p>",
    "group": "Uploads",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "foto",
            "description": "<p>Foto da mae</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "filename",
            "description": "<p>Endpoint da imagem: /uploads/picture-1602090536124.jpg</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso: Status 200",
          "content": "\n{\n      \"filename\": \"picture-1602090536124.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Uploads",
    "name": "PostUploadMae"
  },
  {
    "type": "post",
    "url": "/upload/pai",
    "title": "Upload foto do pai",
    "description": "<p>Faz o upload da foto do pai</p>",
    "group": "Uploads",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token de acesso.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "foto",
            "description": "<p>Foto do pai</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "filename",
            "description": "<p>Endpoint da imagem: /uploads/picture-1602090536124.jpg</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso: Status 200",
          "content": "\n{\n      \"filename\": \"picture-1602090536124.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.ts",
    "groupTitle": "Uploads",
    "name": "PostUploadPai"
  }
] });
