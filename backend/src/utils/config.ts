interface Config {
    server: {
        port: number;
    };
}

const getStringEnvVariable = (name: string): string => {
    const variable = process.env[name];

    if (variable === undefined || variable.trim() === '')
        throw new Error(`Environment variable '${name}' has not been set.`);

    return variable.trim();
};

const getNumberEnvVariable = (name: string): number => {
    const variable = getStringEnvVariable(name);

    if (Number.isNaN(Number(variable)))
        throw new Error(`Environment variable '${name}' is not a number.`);

    return Number(variable);
};

const getConfig = (): Config => {
    const config = {
        server: {
            port: getNumberEnvVariable('SERVER_PORT'),
        },
    };
    const configClone = JSON.parse(JSON.stringify(config));

    console.info('App config:');
    console.info(configClone);

    return config;
};

export { getConfig };