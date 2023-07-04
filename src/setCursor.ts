import { Direction } from "./HandleEvent/direction";

export function setCursor(range: Range, container: Node, direction: Direction)
{
    let textNode: Node;
    if (container.firstChild!=null)
    {
        textNode = container.firstChild!;
    }
    else
    {
        textNode = container;
    }
    let offset = direction == Direction.Left?0: container.textContent!.length;
    range.setStart(textNode, offset);
    range.setEnd(textNode, offset);
}
export function setCursorOffset(range: Range, container: Node, offset: number)
{
    let textNode: Node;
    if (container.firstChild!=null)
    {
        textNode = container.firstChild!;
    }
    else
    {
        textNode = container;
    }
    console.log('offset: ' + offset);
    range.setStart(textNode, offset);
    range.setEnd(textNode, offset);
}