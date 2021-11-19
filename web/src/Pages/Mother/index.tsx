import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

import logo from '../../Assets/logo.svg';
import api from '../../Services/api';

interface IMother{
  id: number;
  nome: string;
	email: string;
	data_nascimento: string;
	amamentou_antes: boolean;
	tempo_amamentacao: string;
	companheiro: boolean;
	moram_juntos: string;
	escolaridade: string;
	gestacao_planejada: boolean;
	licenca_maternidade: number;
	ocupacao: boolean;
	orientacao_prenatal:boolean;
	primeira_visita: string;
	qtd_filhos_vivos: string;
	qtd_gravidez: number;
	renda: string;
	tempo_primeiro_estimulo: string;
	primeiro_estimulo: string;
	whatsapp: string;
}

interface IBabies{
	id: number;
	nome: string;
}

const Mother: React.FC = () => {

  const [mother, setMother] = useState<IMother>();

  const [babies, setBabies] = useState<IBabies[]>([]);

	const getValues =  mother || {
		id: 999,
		nome:'',
		email:'',
		data_nascimento: '1955-01-01',
		amamentou_antes: false,
		tempo_amamentacao:'',
		companheiro: false,
		moram_juntos:'',
		escolaridade:'',
		gestacao_planejada:false,
		licenca_maternidade:0,
		ocupacao:false,
		orientacao_prenatal:false,
		primeira_visita:'',
		qtd_filhos_vivos:'',
		qtd_gravidez:0,
		renda:'',
		tempo_primeiro_estimulo:'',
		primeiro_estimulo:'',
		whatsapp:''
	}

  const { id } = useParams();

  const navigate = useNavigate();

  async function handleSave(values : IMother){
	await api.put(`/admin/mothers/${id}`, values);
	navigate('/mothers')
  }

  useEffect(() =>{
    (async ()=>{
      const response = await api.get(`/admin/mothers/${id}`);
      setMother(response.data);
	  const response2 = await api.get(`/admin/mothers/${id}/babies`)
	  setBabies(response2.data)
	  console.log(babies)
    })();
  }, [id])

  return (
    <div className="container" style={{backgroundColor:'#7D5CD7'}}>
        <div className="row">
            <div id="logo" style={{display:'flex', justifyContent:'center', paddingBottom:50}}>
              <img src={logo} alt="Logo"/>
            </div>
            <div className="card" style={{display:'flex', justifyContent:'center'}}>
              <div className="card-body">
                <h2>Mae: {mother?.nome}</h2>
				{babies.map(baby =><b key={baby.id}>Bebe: {baby.nome} <NavLink to={`/babies/${baby.id}`}>Editar</NavLink></b>)}

				<h4 style={{marginTop:`40px`}}>Dados da mae</h4>
				<Formik
					initialValues={getValues}
					enableReinitialize={true}
					onSubmit={handleSave}
				>
					<Form>
						<div className="form-group">
							<label htmlFor="nome">Nome</label>
							<Field className="form-control" id="nome" name="nome" placeholder="Nome da mae" required/>
						</div>

						<div className="form-group">
							<label htmlFor="email">Email</label>
							<Field className="form-control" id="email" type="email" name="email" placeholder="Email" required/>
						</div>

						<div className="form-group">
							<label htmlFor="whatsapp">WhatsApp</label>
							<Field className="form-control" id="whatsapp" name="whatsapp" placeholder="WhatsApp"/>
						</div>

						<div className="form-group">
							<label htmlFor="data_nascimento">Data de nascimento</label>
							<Field className="form-control" id="data_nascimento" type="date" name="data_nascimento" placeholder="Data de nascimento" required/>
						</div>
						<div className="form-group">
							<label htmlFor="amamentou_antes">Amamentou Antes?</label>
							<Field as="select" className="form-control"
								id="amamentou_antes"
								name="amamentou_antes"
							>
								<option value="true">Sim</option>
								<option value="false">Nao</option>
							</Field>
						</div>

						<div className="form-group">
							<label htmlFor="tempo_amamentacao">Tempo de amamentacao (anos, meses)</label>
							<Field className="form-control" id="tempo_amamentacao" name="tempo_amamentacao" placeholder="Tempo de amamentacao (anos, meses)" required/>
						</div>

						<div className="form-group">
							<label htmlFor="primeiro_estimulo">Qual foi o primeiro estímulo?</label>
							<Field as="select" className="form-control" id="primeiro_estimulo" name="primeiro_estimulo" placeholder="Qual foi o primeiro estímulo?" required>
								<option value="Ainda não realizou nenhum estímulo">Ainda não realizou nenhum estímulo</option>
								<option value="Massagem/Ordenha">Massagem/Ordenha</option>
								<option value="Sucção">Sucção</option>
							</Field>
						</div>

						<div className="form-group">
							<label htmlFor="tempo_primeiro_estimulo">Tempo do primeiro estímulo</label>
							<Field as="select" className="form-control" id="tempo_primeiro_estimulo" name="tempo_primeiro_estimulo" placeholder="Tempo do primeiro estímulo" required>
								<option value="Em até 1h">Em até 1h</option>
								<option value="De 1 à 6 horas">De 1 à 6 horas</option>
								<option value="De 7 à 12 horas">De 7 à 12 horas</option>
								<option value="De 13 à 24 horas">De 13 à 24 horas</option>
								<option value="2 dias">2 dias</option>
								<option value="3 dias">3 dias</option>
							</Field>
						</div>

						<div className="form-group">
							<label htmlFor="companheiro">Possui companheiro?</label>
							<Field as="select" className="form-control"
								id="companheiro"
								name="companheiro"
								required
							>
								<option value="true">Sim</option>
								<option value="false">Nao</option>
							</Field>
						</div>

						<div className="form-group">
							<label htmlFor="moram_juntos">Moram juntos a quanto tempo? (anos, meses)</label>
							<Field className="form-control" id="moram_juntos" name="moram_juntos" placeholder="Moram juntos a quanto tempo? (anos, meses)"/>
						</div>

						<div className="form-group">
							<label htmlFor="escolaridade">Escolaridade</label>
							<Field as="select" className="form-control" id="escolaridade" name="escolaridade" placeholder="Escolaridade">
								<option value="Fundamental incompleto">Fundamental incompleto</option>
								<option value="Fundamental completo">Fundamental completo</option>
								<option value="Ensino médio incompleto">Ensino médio incompleto</option>
								<option value="Ensino médio completo">Ensino médio completo</option>
								<option value="Superior incompleto">Superior incompleto</option>
								<option value="Superior completo">Superior incompleto</option>
							</Field>
						</div>

						<div className="form-group">
							<label htmlFor="gestacao_planejada">Gestação Planejada?</label>
							<Field as="select" className="form-control"
								id="gestacao_planejada"
								name="gestacao_planejada"
								required
							>
								<option value="true">Sim</option>
								<option value="false">Nao</option>
							</Field>
						</div>

						<div className="form-group">
							<label htmlFor="licenca_maternidade">Licença maternidade? (meses)</label>
							<Field className="form-control" id="licenca_maternidade" type="number" name="licenca_maternidade" placeholder="Licença maternidade? (meses)"/>
						</div>

						<div className="form-group">
							<label htmlFor="ocupacao">Possui alguma ocupação?</label>
							<Field as="select" className="form-control"
								id="ocupacao"
								name="ocupacao"
								required
							>
								<option value="true">Sim</option>
								<option value="false">Nao</option>
							</Field>
						</div>

						<div className="form-group">
							<label htmlFor="orientacao_prenatal">Recebeu orientacao pré-natal?</label>
							<Field as="select" className="form-control"
								id="ocupacao"
								name="ocupacao"
								required
							>
								<option value="true">Sim</option>
								<option value="false">Nao</option>
							</Field>
						</div>

						<div className="form-group">
							<label htmlFor="primeira_visita">Quando foi a primeira visita? (horas após o parto)</label>
							<Field as="select" className="form-control" id="primeira_visita" name="primeira_visita" placeholder="Quando foi a primeira visita? (horas após o parto)" required>
								<option value="12h">12h</option>
								<option value="13-24h">13-24h</option>
								<option value="2 dias">2 dias</option>
								<option value="3 dias">3 dias</option>
							</Field>
						</div>

						<div className="form-group">
							<label htmlFor="qtd_filhos_vivos">Quantidade de filhos vivos</label>
							<Field className="form-control" type="number" id="qtd_filhos_vivos" name="qtd_filhos_vivos" placeholder="Quantidade de filhos vivos" required/>
						</div>

						<div className="form-group">
							<label htmlFor="qtd_gravidez">Quantas vezes ficou grávida?</label>
							<Field className="form-control" type="number" id="qtd_gravidez" name="qtd_gravidez" placeholder="Quantas vezes ficou grávida?" required/>
						</div>

						<div className="form-group">
							<label htmlFor="renda">Renda</label>
							<Field as="select" className="form-control" id="renda" name="renda" placeholder="Renda" required>
								<option value="Até 1 salário">Até 1 salário</option>
								<option value="De 2 e 3 salários">De 2 e 3 salários</option>
								<option value="4 ou mais salários">4 ou mais salários</option>
							</Field>
						</div>

						<button className="btn btn-lg btn-primary btn-block" type="submit" style={{backgroundColor:'#7D5CD7', borderColor:'#7D5CD7', marginTop:10}}>
							Salvar
						</button>
						<button className="btn btn-lg btn-alert btn-block" style={{marginTop:10}} onClick={() => navigate('/mothers')}>
							Voltar
						</button>
					</Form>
				</Formik>
              </div>
            </div>  
        </div>
      </div>
  );
};

export default Mother;
