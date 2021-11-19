import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

import logo from '../../Assets/logo.svg';
import api from '../../Services/api';

interface IBaby{
	id: number;
	nome: string;
	apgar1: number;
	apgar2: number;
	complicacoes: boolean;
	contato_pele: boolean;
	data_alta: string;
	data_parto:string;
	dias_gest: number;
	local: string;
	local_cadastro: string;
	mae_id: number;
	peso: number;
	semanas_gest: number;
	tipo_parto: boolean;
}


const Baby: React.FC = () => {

  const [baby, setBaby] = useState<IBaby>();

	const getValues =  baby || {
		id: 999,
		nome:'',
		apgar1: 0,
		apgar2: 0,
		complicacoes: false,
		contato_pele:false,
		data_alta: '1955-01-01',
		data_parto:'1955-01-01',
		dias_gest: 0,
		local:'',
		local_cadastro:'',
		mae_id:999,
		peso: 0,
		semanas_gest: 0,
		tipo_parto:false,
	}

  const { id } = useParams();

  const navigate = useNavigate();

  async function handleSave(values : IBaby){
	await api.put(`/admin/babies/${id}`, values);
	navigate(`/mothers/${values.mae_id}`)
  }

  useEffect(() =>{
    (async ()=>{
      const response = await api.get(`/admin/babies/${id}`);
	  console.log(response.data)
      setBaby(response.data)
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
                <h2>Bebe: {baby?.nome}</h2>

				<h4 style={{marginTop:`40px`}}>Dados do bebe</h4>
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
							<label htmlFor="peso">Peso</label>
							<Field className="form-control" id="peso" type="number" name="peso" placeholder="Peso" required/>
						</div>

						<div className="form-group">
							<label htmlFor="apgar1">Apgar1</label>
							<Field className="form-control" id="apgar1" type="number" name="apgar1" placeholder="apgar1" required/>
						</div>

						<div className="form-group">
							<label htmlFor="apgar2">Apgar2</label>
							<Field className="form-control" id="apgar2" type="number" name="apgar2" placeholder="apgar2" required/>
						</div>

						<div className="form-group">
							<label htmlFor="complicacoes">Complicacoes no parto?</label>
							<Field as="select" className="form-control"
								id="complicacoes"
								name="complicacoes"
							>
								<option value="true">Sim</option>
								<option value="false">Nao</option>
							</Field>
						</div>

						<div className="form-group">
							<label htmlFor="contato_pele">Contato pele a pele?</label>
							<Field as="select" className="form-control"
								id="contato_pele"
								name="contato_pele"
							>
								<option value="true">Sim</option>
								<option value="false">Nao</option>
							</Field>
						</div>

						<div className="form-group">
							<label htmlFor="data_parto">Data do parto</label>
							<Field className="form-control" id="data_parto" type="date" name="data_parto" placeholder="Data do parto" required/>
						</div>

						<div className="form-group">
							<label htmlFor="data_parto">Data da alta</label>
							<Field className="form-control" id="data_alta" type="date" name="data_alta" placeholder="Data da alta"/>
						</div>

						<div className="form-group">
							<label htmlFor="local_cadastro">Local de nascimento</label>
							<Field as="select" className="form-control" id="local_cadastro" name="local_cadastro" placeholder="Local de nascimento" required>
								<option value="UCI Neonatal">UCI Neonatal</option>
								<option value="UTI Neonatal">UTI Neonatal</option>
							</Field>
						</div>

						<div className="form-group">
							<label htmlFor="local">Local Atual</label>
							<Field as="select" className="form-control" id="local" name="local" placeholder="Local Atual" required>
								<option value="UCI Neonatal">UCI Neonatal</option>
								<option value="UTI Neonatal">UTI Neonatal</option>
								<option value="Alojamento Conjunto">Alojamento Conjunto</option>
								<option value="Casa">Casa</option>
							</Field>
						</div>

						<div className="form-group">
							<label htmlFor="semanas_gest">Semanas de gestacao</label>
							<Field className="form-control" id="semanas_gest" type="number" name="semanas_gest" placeholder="Semanas de gestacao" required/>
						</div>

						<div className="form-group">
							<label htmlFor="dias_gest">Dias de gestacao</label>
							<Field className="form-control" id="dias_gest" type="number" name="dias_gest" placeholder="Dias de gestacao" required/>
						</div>

						<div className="form-group">
							<label htmlFor="tipo_parto">Tipo do parto</label>
							<Field as="select" className="form-control"
								id="tipo_parto"
								name="tipo_parto"
							>
								<option value="true">Cesárea</option>
								<option value="false">Normal</option>
							</Field>
						</div>

						<button className="btn btn-lg btn-primary btn-block" type="submit" style={{backgroundColor:'#7D5CD7', borderColor:'#7D5CD7', marginTop:10}}>
							Salvar
						</button>
						<button className="btn btn-lg btn-alert btn-block" style={{marginTop:10}} onClick={() => navigate(`/mothers/${baby?.mae_id}`)}>
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

export default Baby;
