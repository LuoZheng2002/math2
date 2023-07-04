import { assert } from "../../assert";
import { Direction } from "../direction";
import { getHTMLElement } from "../getHTMLElement";
import { handleArrow } from "./handleArrow";

export function handleKeydown(event: KeyboardEvent)
{
    let selection = window.getSelection();
    assert(selection != null, 'selection is null');
    let range = selection!.getRangeAt(0);
    assert(range != null, 'range is null');
    let container = getHTMLElement(range.startContainer);
    switch(event.key)
    {
        case 'ArrowRight':
            handleArrow(range, container, event, Direction.Right);
            break;
        case 'ArrowLeft':
            handleArrow(range, container, event, Direction.Left);
            break;
    }
}