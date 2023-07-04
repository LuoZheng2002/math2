import { Direction } from "../direction";
import { getHTMLElement } from "../getHTMLElement";
import { handleDeleteContent } from "./handleDeleteContent";
import { handleInsert as handleInsertText } from "./handleInsertText";
import { handleInsertParagraph } from "./handleInsertParagraph";
import { UpdateInfo } from "../updateView";

export function handleBeforeInput(event: InputEvent)
{
    let selection = window.getSelection()!;
    let range = selection.getRangeAt(0);
    let container = getHTMLElement(range.startContainer);
    console.log(event.inputType);
    UpdateInfo.stimulate();
    switch(event.inputType)
    {
    case 'insertText':
    case 'insertFromPaste':
        handleInsertText(range, container, event);
        break;
    case 'deleteContentBackward':
        handleDeleteContent(range, container, event, Direction.Left);
        break;
    case 'deleteContentForward':
        handleDeleteContent(range, container, event, Direction.Right);
        break;
    case 'insertParagraph':
        handleInsertParagraph(range, container, event);
        break;
    }
}