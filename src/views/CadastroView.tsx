import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

import { CadastroViewModel } from '~/viewmodel/CadastroViewModel';

import { Text, TouchableOpacity, View, TextInput, Image } from 'react-native';

export function CadastroView({ navigation }: any) {

    const { cadastroSchema, onSubmit } = CadastroViewModel({ navigation });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(cadastroSchema)
    });

    return (
        <View className='flex-1 justify-center items-center bg-gray-900 pr-5 pl-5 gap-10'>
            <View className='p-6 justify-center items-center bg-gray-900 rounded-lg w-full gap-10'>
                <Text className='font-bold text-3xl text-white'>Junte-se conosco!</Text>
                <View className='w-full gap-5'>
                    <View className='justify-center items-center w-full'>
                        <Text className='self-start font-semibold mb-3 text-white'>Nome</Text>
                        <Controller
                            control={control}
                            name='nome'
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className='bg-gray-800 rounded-lg p-5 w-full text-white'
                                    placeholder='Informe o seu nome'
                                    placeholderTextColor="#9CA3AF"
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.nome && (
                            <Text className='text-red-500 self-start mt-2'>{errors.nome.message}</Text>
                        )}
                    </View>
                    <View className='justify-center items-center w-full'>
                        <Text className='self-start font-semibold mb-3 text-white'>E-mail</Text>
                        <Controller
                            control={control}
                            name='user'
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className='bg-gray-800 rounded-lg p-5 w-full text-white'
                                    placeholder='Informe o seu usuário'
                                    placeholderTextColor="#9CA3AF"
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.user && (
                            <Text className='text-red-500 self-start mt-2'>{errors.user.message}</Text>
                        )}
                    </View>
                    <View className='justify-center items-center w-full'>
                        <Text className='self-start font-semibold mb-3 text-white'>Senha</Text>
                        <Controller
                            control={control}
                            name='senha'
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className='bg-gray-800 rounded-lg p-5 w-full text-white'
                                    placeholder='Informe a sua senha'
                                    placeholderTextColor="#9CA3AF"
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.senha && (
                            <Text className='text-red-500 self-start mt-2'>{errors.senha.message}</Text>
                        )}
                    </View>
                    <View className='justify-center items-center w-full'>
                        <Text className='self-start font-semibold mb-3 text-white'>Confirmar Senha</Text>
                        <Controller
                            control={control}
                            name='confirmarSenha'
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className='bg-gray-800 rounded-lg p-5 w-full text-white'
                                    placeholder='Informe a sua senha'
                                    placeholderTextColor="#9CA3AF"
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.confirmarSenha && (
                            <Text className='text-red-500 self-start mt-2'>{errors.confirmarSenha.message}</Text>
                        )}
                    </View>
                </View>
                <View className='w-full gap-5'>
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} className='w-full'>
                        <View className='p-5 justify-center items-center bg-lime-500 rounded-lg w-full'>
                            <Text className='text-white font-bold self-'>Cadastrar</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")} className='w-full'>
                        <View className='p-5 justify-center items-center border border-lime-500 rounded-lg w-full'>
                            <Text className='text-lime-500 font-bold self-'>Já tenho uma conta</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
