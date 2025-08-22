import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

import { Text, TouchableOpacity, View, TextInput } from 'react-native';

export function LoginView({ navigation }: any) {

    const loginSchema = yup.object().shape({
        user: yup.string().email("E-mail inválido!").required('Usuário é obrigatório!'),
        senha: yup.string().required('Senha é obrigatória!'),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = async (data: any) => {
        const validacao = false

        if (validacao) {
            navigation.navigate('Menu');
        }
        else {
            console.error('Usuário ou senha inválidos');
        }
    };

    return (
        <View className='flex-1 justify-center items-center bg-gray-900 pr-5 pl-5'>
            <View className='p-6 justify-center items-center bg-white rounded-lg w-full gap-5'>
                <Text className='font-bold text-3xl'>Login</Text>
                <View className='w-full gap-5'>
                    <View className='justify-center items-center w-full'>
                    <Text className='self-start font-semibold mb-3'>E-mail</Text>
                    <Controller
                        control={control}
                        name='user'
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className='border border-gray-300 rounded-lg p-4 w-full'
                                placeholder='Informe o seu usuário'
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.user && (
                        <Text className='text-red-500'>{errors.user.message}</Text>
                    )}
                </View>
                <View className='justify-center items-center w-full'>
                    <Text className='self-start font-semibold mb-3'>E-mail</Text>
                    <Controller
                        control={control}
                        name='senha'
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className='border border-gray-300 rounded-lg p-4 w-full'
                                placeholder='Informe a sua senha'
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.senha && (
                        <Text className='text-red-500'>{errors.senha.message}</Text>
                    )}
                </View>
                </View>
                <TouchableOpacity onPress={handleSubmit(onSubmit)} className='w-full'>
                    <View className='p-4 justify-center items-center bg-lime-500 rounded-lg w-full'>
                        <Text className='text-white font-bold'>Entrar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
