import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import {useRouter} from 'next/router'
import appConfig from '../config.json'



function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag}{
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size:24px;
                    font-weight:600;
                }
            `}</style>
        </>
    )
}

// Componente React
// function HomePage() {
//     //JSX
//     return (
//         <div>
//             <GlobalStyle/>
//             <Title tag="h2">Boas vindas de volta!</Title>
//             <h2>Discord - Alura matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
    // const username = 'leonardoTavaresM';
    const [username, SetUsername] = React.useState('leonardoTavaresM');
    const roteamento = useRouter()//Hook

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500], // "500": "#3F9142",
                    // backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
                    backgroundImage: 'url(https://wallpaperaccess.com/full/2067302.jpg)',
                    // backgroundImage: 'url(https://img3.goodfon.com/wallpaper/nbig/e/51/arena-korintians-arena-7073.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        border:'1px solid black',
                        backgroundColor: appConfig.theme.colors.neutrals[901],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit ={function (event){
                            event.preventDefault();
                            console.log('alguem submeteu o form');
                            roteamento.push(`./chat?username=${username}`);
                            // window.location.href = './chat'
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >;
                        <Titulo tag="h2">Boas vindas de volta!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        {/* <input 
                            type="text"
                            value={username}
                            onChange={function handler(event) {
                                console.log(event.target.value)
                                // Onde ta o valor?
                                const valor = event.target.value;
                                // Trocar o valor da variavel
                                // através do react e avise quem precisa ficar sabendo
                                SetUsername(valor)
                            }}
                        /> */}
                        <TextField
                            value={username}
                            onChange={function handler(event) {
                                console.log(event.target.value)
                                // Onde ta o valor?
                                const valor = event.target.value;
                                // Trocar o valor da variavel
                                // através do react e avise quem precisa ficar sabendo
                                SetUsername(valor)
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={`https://github.com/${username}.png`}
                        />
                        <Text tag="h5"
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username.length>2? username : "Usuario Inválido!"}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}
// function UserNameGit (props){
//     const Tag = props.tag || 'h8';
//     const Name = props.children;
//     console.log(Tag)
//     return(
//         <>
//             <Tag>{Name}</Tag>
//             <style jsx>{`
//                 ${Tag}{
//                     color:${appConfig.theme.colors.neutrals['200']};
//                     backgroundColor:${appConfig.theme.colors.neutrals['900']};
//                     padding:'3px 10px';
//                     borderRadius:'1000px';
//                 }
//             `}
//             </style>
//         </>
//     )
// }