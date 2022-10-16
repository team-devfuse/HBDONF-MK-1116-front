export function setEnv () {
    let enviroment;

    if(process.env.NODE_ENV === 'development'){
        enviroment = "LOCAL";
    } else if(process.env.NEXT_PUBLIC_VMGO_STATUS === "product"){
        enviroment = "PROD"
    } else{
        enviroment = "TEST"
    }

    return enviroment;
};

export let API_URL;

switch (setEnv ()){
    case "LOCAL" : API_URL = 'https://vmgo-test-api.team-devfuse.com/vmgo'; break;
    case "TEST" : API_URL = 'https://vmgo-test-api.team-devfuse.com/vmgo'; break;
    case "PROD" : API_URL = 'https://vmgo-api.team-devfuse.com/vmgo'; break;
    default : API_URL = 'https://vmgo-test-api.team-devfuse.com/vmgo'; break;
}

export const S3_BASE_URL = 'https://d3bjhg9thms238.cloudfront.net';