import * as yup from 'yup';

export function CadastroViewModel({ navigation }: any) {

    const cadastroSchema = yup.object().shape({
        nome: yup.string().required('Nome é obrigatório!'),
        user: yup.string().email("E-mail inválido!").required('Email é obrigatório!'),
        senha: yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required('Senha é obrigatório!'),
        confirmarSenha: yup.string().oneOf([yup.ref('senha')], 'As senhas devem ser iguais').required('Confirmação de senha é obrigatória!')
    })

    const onSubmit = async (data: any) => {
        const validacao = true;

        if (validacao) {
            navigation.navigate('Menu');
        }
        else {
            console.error('Erro ao cadastrar usuário!');
        }
    }

    return { cadastroSchema, onSubmit };
}