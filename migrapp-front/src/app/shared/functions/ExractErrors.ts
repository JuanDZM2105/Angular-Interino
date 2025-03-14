export function ExtractErrors(obj: any): string[]{
    const err = obj.error.errors;
    
    let errorMessage: string[] = [];

    for (let key in err){
        let campo = key;
        const fieldWithMessages = err[key].map((error: string) => `${campo}: ${error}`);
        errorMessage = errorMessage.concat(fieldWithMessages);
    }

    return errorMessage;
}

