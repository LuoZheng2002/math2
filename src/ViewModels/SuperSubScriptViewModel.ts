import { Direction } from "../HandleEvent/direction";
import { getHTMLElement } from "../HandleEvent/getHTMLElement";
import { tryWrapTextFromContainer } from "../HandleEvent/updateView";
import { assert } from "../assert";
import { COLORCLASS, CT, STYLECLASS, ViewModelSize, getNewSize } from "../constants";
import { setContainerColorClass, setContainerID, setContainerFontSizeClass, setContainerStyleClass, setContainerType } from "../getSetContainerAttributes";
import { setCursor } from "../setCursor";
import { ViewModelBase } from "./ViewModelBase";

export class SuperSubScriptViewModel extends ViewModelBase
{
    private superSubScript: HTMLElement|null = null;
    private superScript: HTMLElement|null = null;
    private subScript: HTMLElement|null = null;
    protected size: ViewModelSize;
    constructor(parentSize: ViewModelSize){
        super();
        this.size = getNewSize(parentSize, 1);
        this.createSuperSubScript();
    }
    private createSuperSubScript()
    {
        this.superSubScript = document.createElement('span');
        this.superScript = document.createElement('span');
        this.subScript = document.createElement('span');
        setContainerType(this.superSubScript, CT.SUPERSUBSCRIPT);
        setContainerType(this.superScript, CT.SUPERSCRIPT);
        setContainerType(this.subScript, CT.SUBSCRIPT);
        setContainerStyleClass(this.superSubScript, STYLECLASS.SUPERSUBSCRIPT);
        setContainerStyleClass(this.superScript, STYLECLASS.SUPERSCRIPT);
        setContainerStyleClass(this.subScript, STYLECLASS.SUBSCRIPT);
        setContainerStyleClass(this.superScript, STYLECLASS.RESERVE);
        setContainerStyleClass(this.subScript, STYLECLASS.RESERVE);
        setContainerFontSizeClass(this.superSubScript, this.size);
        setContainerFontSizeClass(this.superScript, this.size);
        setContainerFontSizeClass(this.subScript, this.size);
        setContainerColorClass(this.superSubScript, COLORCLASS.COLOR_SUPERSUBSCRIPT);
        setContainerColorClass(this.superScript, COLORCLASS.COLOR_SUPERSCRIPT);
        setContainerColorClass(this.subScript, COLORCLASS.COLOR_SUBSCRIPT);
        setContainerID(this.superSubScript, this.id);
        setContainerID(this.superScript, this.id);
        setContainerID(this.subScript, this.id);
        this.superSubScript.appendChild(this.superScript);
        this.superSubScript.appendChild(this.subScript);
    }
    updateSize(parentSize: ViewModelSize): void {
        this.size = getNewSize(parentSize, 1);
        setContainerFontSizeClass(this.superSubScript!, this.size);
        setContainerFontSizeClass(this.superScript!, this.size);
        setContainerFontSizeClass(this.subScript!, this.size);
    }
    getMainContainer(): HTMLElement {
        return this.superSubScript!;
    }
    setCursorInit(range: Range, isCaret: boolean): void{
        assert(this.superScript!.innerText.length == 0 && this.subScript!.innerText.length == 0);
        if (isCaret)
        {
            setCursor(range, this.superScript!, Direction.Left);
        }
        else
        {
            setCursor(range, this.subScript!, Direction.Left);
        }
    }
    setCursor(range: Range, direction: Direction): void {
        let script: HTMLElement;
        if (this.superScript!.innerText.length == 0
            && this.subScript!.innerText.length != 0)
        {
            script = this.subScript!;
        }
        else
        {
            script = this.superScript!;
        }
        let firstChild = script!.firstElementChild!;
        let lastChild = script!.lastElementChild!;
        let child = direction == Direction.Left? firstChild: lastChild;
        if (child!=null)
        {
            setCursor(range, child, direction);
        }
        else
        {
            setCursor(range, script, direction);
        }
    }
    cursorAtEdge(range: Range, direction: Direction): boolean {
        let container = getHTMLElement(range.startContainer);
        // when the container only contains plain text
        if ([this.superScript, this.subScript].includes(container))
        {
            let isLeft = direction == Direction.Left && range.startOffset == 0;
            let isRight = direction == Direction.Right && range.startOffset == container.innerText.length;
            return isLeft || isRight;
        }
        assert(false, 'Cursor at edge should not be triggered if range is not at this container');
        return false;
    }
    canDelete(): boolean {
        return this.superScript!.innerText.length == 0 && this.subScript!.innerText.length == 0;
    }
    getContentContainers(): HTMLElement[] {
        return [this.superScript!, this.subScript!];
    }
}