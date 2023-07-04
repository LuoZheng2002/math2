import { Direction } from "../HandleEvent/direction";
import { getHTMLElement } from "../HandleEvent/getHTMLElement";
import { tryWrapTextFromContainer } from "../HandleEvent/updateView";
import { assert } from "../assert";
import { COLORCLASS, CT, STYLECLASS, ViewModelSize } from "../constants";
import { getContainerType, setContainerColorClass, setContainerID, setContainerFontSizeClass, setContainerStyleClass, setContainerType} from "../getSetContainerAttributes";
import { setCursor } from "../setCursor";
import { ViewModelBase } from "./ViewModelBase";

let nextTextContainerColorMap: Map<number, COLORCLASS> = new Map;
nextTextContainerColorMap.set(0, COLORCLASS.COLOR_TEXTCONTAINER_1);
nextTextContainerColorMap.set(1, COLORCLASS.COLOR_TEXTCONTAINER_2);
nextTextContainerColorMap.set(2, COLORCLASS.COLOR_TEXTCONTAINER_3);
nextTextContainerColorMap.set(3, COLORCLASS.COLOR_TEXTCONTAINER_4);
nextTextContainerColorMap.set(4, COLORCLASS.COLOR_TEXTCONTAINER_5);
nextTextContainerColorMap.set(5, COLORCLASS.COLOR_TEXTCONTAINER_6);
nextTextContainerColorMap.set(6, COLORCLASS.COLOR_TEXTCONTAINER_7);
let nextTextContainerColorIndex = 0;
function getNextTextContainerColor(): COLORCLASS
{
    let index = nextTextContainerColorIndex;
    let colorClass = nextTextContainerColorMap.get(index)!;
    nextTextContainerColorIndex++;
    nextTextContainerColorIndex%=7;
    return colorClass;
}

export class TextViewModel extends ViewModelBase
{
    private textContainer: HTMLElement;
    protected size: ViewModelSize;
    constructor(parentSize: ViewModelSize) {
        super();
        this.size = parentSize;
        this.textContainer = this.createTextContainer(this.size);
    }
    updateSize(parentSize: ViewModelSize)
    {
        this.size = parentSize;
        setContainerFontSizeClass(this.textContainer, parentSize);
    }
    private createTextContainer(size: ViewModelSize): HTMLElement
    {
        let textContainer = document.createElement('span');
        setContainerType(textContainer, CT.TEXTCONTAINER);
        setContainerStyleClass(textContainer, STYLECLASS.TEXTCONTAINER);
        setContainerStyleClass(textContainer, STYLECLASS.RESERVE);
        setContainerFontSizeClass(textContainer, size);
        setContainerColorClass(textContainer, getNextTextContainerColor());
        setContainerID(textContainer, this.id);
        return textContainer;
    }
    getMainContainer(): HTMLElement
    {
        return this.textContainer;
    }
    setCursor(range: Range, direction: Direction)
    {
        setCursor(range, this.textContainer, direction);
    }
    cursorAtEdge(range: Range, direction: Direction)
    {
        assert(getHTMLElement(range.startContainer) == this.textContainer);
        if (direction == Direction.Left && range.startOffset == 0)
        {
            return true;
        }
        if (direction == Direction.Right && range.startOffset == this.textContainer.innerText.length)
        {
            return true;
        }
        return false;
    }
    canDelete(): boolean {
        return this.textContainer.innerText.length == 0;
    }
    getContentContainers(): HTMLElement[] {
        return [];
    }
}