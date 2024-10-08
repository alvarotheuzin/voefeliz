'use client';

import Pagina from "@/app/components/Pagina";
import apiLocalidade from "@/app/services/apiLocalidade";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import { useState, useEffect } from "react";

export default function Page({ params }) {
    const route = useRouter();

    const aeroportos = JSON.parse(localStorage.getItem('aeroportos')) || [];
    const dados = aeroportos.find(item => item.id == params.id);
    const aeroporto = dados || { nome: '', sigla: '', uf: '', cidade: '', pais: 'Brasil' };

    const [paises, setPaises] = useState([]);
    const [ufs, setUfs] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [campoBrasil, setCampoBrasil] = useState(false);

    useEffect(() => {
        apiLocalidade.get('paises').then(resultado => {
            setPaises(resultado.data);
        });
        apiLocalidade.get('estados?orderBy=nome').then(resultado => {
            setUfs(resultado.data);
        });
    }, []);

    function salvar(dados) {
        if (aeroporto.id) {
            Object.assign(aeroporto, dados);
        } else {
            dados.id = v4();
            aeroportos.push(dados);
        }

        localStorage.setItem('aeroportos', JSON.stringify(aeroportos));
        route.push('/aeroportos');
    }

    return (
        <Pagina titulo="Aeroportos">
            <Formik
                initialValues={aeroporto}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => {
                    useEffect(() => {
                        setCampoBrasil(values.pais === 'Brasil');
                    }, [values.pais]);

                    useEffect(() => {
                        if (values.uf) {
                            apiLocalidade.get(`estados/${values.uf}/municipios`).then(resultado =>
                                setCidades(resultado.data)
                            );
                        }
                    }, [values.uf]);

                    return (
                        <Form>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange('nome')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="pais">
                                <Form.Label>Pais</Form.Label>
                                <Form.Select
                                    name="pais"
                                    value={values.pais}
                                    onChange={handleChange('pais')}
                                >
                                    <option value=''>Selecione</option>
                                    {paises.map(item => (
                                        <option key={item.nome} value={item.nome}>{item.nome}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            {campoBrasil && (
                                <>
                                    <Form.Group className="mb-3" controlId="uf">
                                        <Form.Label>Uf</Form.Label>
                                        <Form.Select
                                            name="uf"
                                            value={values.uf}
                                            onChange={handleChange('uf')}
                                        >
                                            <option value=''>Selecione</option>
                                            {ufs.map(item => (
                                                <option key={item.sigla} value={item.sigla}>{item.sigla} - {item.nome}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="cidade">
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Select
                                            name="cidade"
                                            value={values.cidade}
                                            onChange={handleChange('cidade')}
                                        >
                                            <option value=''>Selecione</option>
                                            {cidades.map(item => (
                                                <option key={item.nome} value={item.nome}>{item.nome}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </>
                            )}
                            <div className="text-center">
                                <Button onClick={() => handleSubmit()} variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/aeroportos" className="btn btn-danger ms-2">
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Pagina>
    );
}
