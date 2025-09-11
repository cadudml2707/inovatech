import * as yup from 'yup';

export function LoginViewModel({ navigation }: any) {

    const loginSchema = yup.object().shape({
        user: yup.string().email("E-mail inválido!").required('Usuário é obrigatório!'),
        senha: yup.string().required('Senha é obrigatória!'),
    });

    const onSubmit = async (data: any) => {
        const validacao = true

        if (validacao) {
            navigation.navigate('Menu');
        }
        else {
            console.error('Usuário ou senha inválidos');
        }
    };

    return { loginSchema, onSubmit };
}