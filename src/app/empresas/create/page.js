'use client'

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";

export default function Page() {

    const route = useRouter()

    function salvar(dados){
        const empresas = JSON.parse(localStorage.getItem('empresas')) || []
        empresas.push(dados)
        localStorage.setItem('empresas', JSON.stringify(empresas))
        return route.push('/empresas')
    }

    return (
        <Pagina titulo="Empresa">

            <Formik
                initialValues={{
                    nome: '', logo: '', site: '', aeroporto: '', uf: '', cidade: '',
                    voo: '', origem: '', destino: '', preco: '', assento: '', nomePassageiro: '', 
                    tipoDocumento: '', email: '', telefone: '', dataNascimento: ''
                }}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
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
                        <Form.Group className="mb-3" controlId="logo">
                            <Form.Label>Logo</Form.Label>
                            <Form.Control
                                type="text"
                                name="logo"
                                value={values.logo}
                                onChange={handleChange('logo')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="site">
                            <Form.Label>Site</Form.Label>
                            <Form.Control
                                type="text"
                                name="site"
                                value={values.site}
                                onChange={handleChange('site')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="aeroporto">
                            <Form.Label>Aeroporto</Form.Label>
                            <Form.Control
                                type="text"
                                name="aeroporto"
                                value={values.aeroporto}
                                onChange={handleChange('aeroporto')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="uf">
                            <Form.Label>UF</Form.Label>
                            <Form.Control
                                type="text"
                                name="uf"
                                value={values.uf}
                                onChange={handleChange('uf')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cidade">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                name="cidade"
                                value={values.cidade}
                                onChange={handleChange('cidade')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="voo">
                            <Form.Label>Voo</Form.Label>
                            <Form.Control
                                type="text"
                                name="voo"
                                value={values.voo}
                                onChange={handleChange('voo')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="origem">
                            <Form.Label>Origem</Form.Label>
                            <Form.Control
                                type="text"
                                name="origem"
                                value={values.origem}
                                onChange={handleChange('origem')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="destino">
                            <Form.Label>Destino</Form.Label>
                            <Form.Control
                                type="text"
                                name="destino"
                                value={values.destino}
                                onChange={handleChange('destino')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="preco">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control
                                type="number"
                                name="preco"
                                value={values.preco}
                                onChange={handleChange('preco')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="assento">
                            <Form.Label>Assento</Form.Label>
                            <Form.Control
                                type="text"
                                name="assento"
                                value={values.assento}
                                onChange={handleChange('assento')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nomePassageiro">
                            <Form.Label>Nome do Passageiro</Form.Label>
                            <Form.Control
                                type="text"
                                name="nomePassageiro"
                                value={values.nomePassageiro}
                                onChange={handleChange('nomePassageiro')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tipoDocumento">
                            <Form.Label>Tipo de Documento</Form.Label>
                            <Form.Control
                                type="text"
                                name="tipoDocumento"
                                value={values.tipoDocumento}
                                onChange={handleChange('tipoDocumento')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange('email')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="telefone">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefone"
                                value={values.telefone}
                                onChange={handleChange('telefone')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dataNascimento">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                                type="date"
                                name="dataNascimento"
                                value={values.dataNascimento}
                                onChange={handleChange('dataNascimento')}
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link
                                href="/empresas"
                                className="btn btn-danger ms-2"
                            >
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}
