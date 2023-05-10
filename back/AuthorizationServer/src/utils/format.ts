export function IsValidEmail(email : string) : boolean{
    const EmailFormatChecker : RegExp = /^[a-zA-Z]([a-zA-Z0-9]+)@(([a-z]+).+).([a-z]+)/g;
    return EmailFormatChecker.test(email);
}