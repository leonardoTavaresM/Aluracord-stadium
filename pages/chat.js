import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import {ButtonSendSticker} from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU4NTQzOCwiZXhwIjoxOTU5MTYxNDM4fQ.Q1-ZMh5_Kp00451d1iGG7eOSmdpvPah-wyPKXKtBiWQ';
const SUPABASE_URL = 'https://mzaersjxrnieakdbtaqr.supabase.co';
const supabaseClient = createClient(SUPABASE_URL,SUPABASE_ANON_KEY)

function escutaMensagensEmTempoReal(adicionaMensagem){
    return supabaseClient
        .from('mensagens')
        .on('INSERT',(respostaLive)=>{
            adicionaMensagem(respostaLive.new)
        })
        .subscribe();
}

export default function ChatPage() {
    const roteamento = useRouter()//Hook
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('')
    const [listaDeMensagens, setListaDeMensagens] = React.useState([
        // {
        //     id:1,
        //     de:'LeonardoTavaresM',
        //     texto: ':sticker: url_da_imagem'
        // }

    ]);
    React.useEffect(()=>{
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false})
            .then(({data, error})=>{
                // console.log('Dados da consulta: ',data)
                setListaDeMensagens(data);
            });

            escutaMensagensEmTempoReal((novaMensagem)=>{
                    // handleNovaMensagem(novaMensagem)
                setListaDeMensagens((valorAtualDaLista)=>{
                    return [
                        novaMensagem,
                        ...valorAtualDaLista,
                    ]
                });
            })
    },[]);

    // Sua lógica vai aqui
    /*
    //Usuario
    -Usuario digita no campo textArea
    -Apertar enter pra enviar
    -Tem que adicionar o texto na listagem
    
    //Dev
    -[X] Campo criado
    -[X] Vamos usar o onChange usar o useState (ter uf para caso seja enter para limpar a variavel)
    -[X] Lista de mensagens

    */
    //Sua lógica vai aqui

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                //tem que ser um objeto com os mesmos campos que vc escreveu no supabase
                mensagem
            ])
            .then(({data})=>{
                console.log('criando mensagem',data)
                // setListaDeMensagens([
                //     data[0],
                //     ...listaDeMensagens,
                // ]);
            });

        //Chamada de um backend
        setMensagem('');
    }
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                // backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundImage: 'url(https://wallpaperaccess.com/full/2067302.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                // color: appConfig.theme.colors.neutrals['000']
                backgroundColor: appConfig.theme.colors.neutrals[901],
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    // flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    width: '90vw',
                    height: '100vh',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                    color: 'white',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens} />
                    {/* {listaDeMensagens.map((mensageAtual)=>{
                       return(
                           <li key={mensageAtual.id}>
                               {mensageAtual.de}: {mensageAtual.texto}
                           </li>
                       )
                   })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                // Onde ta o valor?
                                const valor = event.target.value;
                                // Trocar o valor da variavel
                                // através do react e avise quem precisa ficar sabendo
                                setMensagem(valor);//jogando o valor recebido do usario e setando na variavel mensagem
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker 
                            onStickerClick={(sticker)=>{
                                // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker)
                                handleNovaMensagem(':sticker: '+sticker)

                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    // console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
                        {mensagem.texto.startsWith(':sticker:')
                        ? (
                            <Image src={mensagem.texto.replace(':sticker:', '')}/>
                        )
                        :(mensagem.texto)}
                           
                        {/* {mensagem.texto} */}
                    </Text>
                );
            })}

        </Box>
    )
}