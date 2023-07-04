export function assert(statement: boolean, info: string|null = null)
{
    if(!statement)
    {
        let errorString = 'Assertion failed!';
        if (info!=null)
        {
            errorString = errorString + '\n' + info;
        }
        throw Error(errorString);
    }
}