import { assert } from "../assert";

export function getHTMLElement(container: Node)
{
    if (container.nodeName == '#text')
    {
        return container.parentElement as HTMLElement;
    }
    return container as HTMLElement;
}