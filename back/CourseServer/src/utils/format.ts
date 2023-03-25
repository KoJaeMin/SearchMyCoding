export function IsValidURI(uri : string) : boolean{
    const URIFormatChecker : RegExp = /^(https|http):\/\/[^\s$.?#].[^\s]*$/g;
    return URIFormatChecker.test(uri);
}

export function IsValidRating(rating : number) : boolean{
    return rating >= 0 && rating <= 100;
}

export function convertValidURI(uri : string) : string{
    return /^(https|http):\/\//.test(uri) ? uri : 'https://' + uri;
}