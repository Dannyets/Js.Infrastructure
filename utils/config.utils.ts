declare const process: NodeJS.Process;

function get<T>(key: string): T | undefined {
    const configValue: any = process.env[key];

    if (!configValue) {
        return;
    }

    try {
        const parsedValue = JSON.parse(configValue);
        return parsedValue as T;
    } catch (error) {
        return configValue;
    }
}

export default {
    get,
};
