'use client';

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";

export default function CreatePassagem() {
    const router = useRouter();

    function salvar(dados) {
        const passagens = JSON.parse(localStorage.getItem('passagens')) || [];
        passagens.push(dados);
        localStorage.setItem('passagens', JSON.stringify(passagens));
        router.push('/passagens');
    }

    return (
        <Pagina titulo="Nova Passagem">
            <Formik
                initialValues={{ passageiro: '', voo: '', data: '' }}
                validate={values => {
                    const errors = {};

                    if (!values.passageiro) {
                        errors.passageiro = 'Passageiro é obrigatório';
                    }

                    if (!values.voo) {
                        errors.voo = 'Voo é obrigatório';
                    }

                    if (!values.data) {
                        errors.data = 'Data é obrigatória';
                    }

                    return errors;
                }}
                onSubmit={values => salvar(values)}
            >
                {({ values, handleChange, handleSubmit, errors }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="passageiro">
                            <Form.Label>Passageiro</Form.Label>
                            <Form.Control
                                type="text"
                                name="passageiro"
                                value={values.passageiro}
                                onChange={handleChange('passageiro')}
                                isInvalid={errors.passageiro}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.passageiro}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="voo">
                            <Form.Label>Voo</Form.Label>
                            <Form.Control
                                type="text"
                                name="voo"
                                value={values.voo}
                                onChange={handleChange('voo')}
                                isInvalid={errors.voo}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.voo}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="data">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                type="date"
                                name="data"
                                value={values.data}
                                onChange={handleChange('data')}
                                isInvalid={errors.data}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.data}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link href="/passagens" className="btn btn-danger ms-2">
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
