import { assert } from "../assert";
import { COLORCLASS, CT, STYLECLASS, ViewModelSize } from "../constants";
import { setContainerColorClass, setContainerID, setContainerFontSizeClass, setContainerStyleClass, setContainerType } from "../getSetContainerAttributes";
import { Direction } from "../HandleEvent/direction";
import { getHTMLElement } from "../HandleEvent/getHTMLElement";
import { tryWrapTextFromContainer } from "../HandleEvent/updateView";
import { setCursor } from "../setCursor";
import { ViewModelBase } from "./ViewModelBase";

export class FormulaViewModel extends ViewModelBase
{
    private formulaContainer: HTMLElement|null = null;
    protected size: ViewModelSize;
    constructor(parentSize: ViewModelSize) {
        super();
        this.size = parentSize;
        this.createFormulaContainer();
    }
    updateSize(parentSize: ViewModelSize): void {
        this.size = parentSize;
        setContainerFontSizeClass(this.formulaContainer!, this.size);
    }
    getMainContainer(): HTMLElement {
        return this.formulaContainer!;
    }
    setCursor(range: Range, direction: Direction): void {
        let firstChild = this.formulaContainer!.firstElementChild!;
        let lastChild = this.formulaContainer!.lastElementChild!;
        let child = direction == Direction.Left? firstChild: lastChild;
        if (child!=null)
        {
            setCursor(range, child, direction);
        }
        else
        {
            setCursor(range, this.formulaContainer!, direction);
        }
    }
    private createFormulaContainer()
    {
        this.formulaContainer = document.createElement('span');
        setContainerType(this.formulaContainer, CT.FORMULA);
        setContainerStyleClass(this.formulaContainer, STYLECLASS.FORMULA);
        setContainerStyleClass(this.formulaContainer, STYLECLASS.RESERVE);
        setContainerFontSizeClass(this.formulaContainer, this.size);
        setContainerColorClass(this.formulaContainer, COLORCLASS.COLOR_FORMULA);
        setContainerID(this.formulaContainer, this.id);
    }
    cursorAtEdge(range: Range, direction: Direction)
    {
        // let firstElementChild = this.formulaContainer.firstElementChild as HTMLElement;
        // let lastElementChild = this.formulaContainer.lastElementChild as HTMLElement;
        // let elementChild = direction == Direction.Left? firstElementChild: lastElementChild;
        if (range.startContainer.nodeName == '#text' && range.startContainer.parentElement! == this.formulaContainer)
        {
            if (direction == Direction.Left && range.startOffset == 0)
            {
                return true;
            }
            else if(direction == Direction.Right && range.startOffset == this.formulaContainer!.innerText.length)
            {
                return true;
            }
            return false;
        }
        else if (range.startContainer == this.formulaContainer)
        {
            assert(this.formulaContainer.innerText == '');
            return true;
        }
        else
        {
            assert(false, 'Cursor at edge should not be triggered if range is not at formula container');
            return false;
        }
    }
    canDelete(): boolean {
        return this.formulaContainer!.innerText.length == 0;
    }
    getContentContainers(): HTMLElement[] {
        return [this.formulaContainer!];
    }
}