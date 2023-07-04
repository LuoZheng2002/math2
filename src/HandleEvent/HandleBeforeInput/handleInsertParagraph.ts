export function handleInsertParagraph(range: Range, container: HTMLElement, event: InputEvent)
{
    console.log('Preventing enter key.');
    event.preventDefault();
}