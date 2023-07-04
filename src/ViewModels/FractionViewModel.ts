import { Direction } from "../HandleEvent/direction";
import { getHTMLElement } from "../HandleEvent/getHTMLElement";
import { tryWrapTextFromContainer } from "../HandleEvent/updateView";
import { assert } from "../assert";
import { COLORCLASS, CT, FONT_SIZE_CLASS, FRACTION_LINE_SIZE_CLASS, STYLECLASS, ViewModelSize } from "../constants";
import { setContainerColorClass, setContainerID, setContainerFontSizeClass as setContainerFontSizeClass, setContainerStyleClass, setContainerType } from "../getSetContainerAttributes";
import { setCursor } from "../setCursor";
import { ViewModelBase } from "./ViewModelBase";


export class FractionViewModel extends ViewModelBase
{
    private fraction: HTMLElement|null = null;
    private n_framework: HTMLElement|null =null;
    private d_framework: HTMLElement|null = null;
    private numerator: HTMLElement|null = null;
    private denominator: HTMLElement|null = null;
    protected size: ViewModelSize;
    constructor(parentSize: ViewModelSize) {
        super();
        this.size = parentSize;
        this.createFraction();
    }
    private createFraction()
    {
        this.fraction = document.createElement('span');
        this.n_framework = document.createElement('span');
        this.d_framework = document.createElement('span');
        this.numerator = document.createElement('span');
        this.denominator = document.createElement('span');
        setContainerType(this.fraction, CT.FRACTION);
        setContainerType(this.n_framework, CT.NUMERATOR_FRAEMWORK);
        setContainerType(this.d_framework, CT.DENOMINATOR_FRAMEWOKR);
        setContainerType(this.numerator, CT.NUMERATOR);
        setContainerType(this.denominator, CT.DENOMINATOR);
        setContainerStyleClass(this.fraction, STYLECLASS.FRACTION);
        setContainerStyleClass(this.n_framework, STYLECLASS.NUMERATOR_FRAEMWORK);
        setContainerStyleClass(this.d_framework, STYLECLASS.DENOMINATOR_FRAMEWORK);
        setContainerStyleClass(this.numerator, STYLECLASS.NUMERATOR);
        setContainerStyleClass(this.denominator, STYLECLASS.DENOMINATOR);
        setContainerStyleClass(this.numerator, STYLECLASS.RESERVE);
        setContainerStyleClass(this.denominator, STYLECLASS.RESERVE);
        setContainerFontSizeClass(this.fraction, this.size);
        setContainerFontSizeClass(this.n_framework, this.size);
        setContainerFontSizeClass(this.d_framework, this.size);
        setContainerFontSizeClass(this.numerator, this.size);
        setContainerFontSizeClass(this.denominator, this.size);
        this.setFractionLineSize(this.size);
        setContainerColorClass(this.fraction, COLORCLASS.COLOR_FRACTION);
        setContainerColorClass(this.n_framework, COLORCLASS.COLOR_NUMERATOR_FRAMEWORK);
        setContainerColorClass(this.d_framework, COLORCLASS.COLOR_DENOMINATOR_FRAMEWORK);
        setContainerColorClass(this.numerator, COLORCLASS.COLOR_NUMERATOR);
        setContainerColorClass(this.denominator, COLORCLASS.COLOR_DENOMINATOR);
        setContainerID(this.fraction, this.id);
        setContainerID(this.n_framework, this.id);
        setContainerID(this.d_framework, this.id);
        setContainerID(this.numerator, this.id);
        setContainerID(this.denominator, this.id);
        this.fraction.appendChild(this.n_framework);
        this.fraction.appendChild(this.d_framework);
        this.n_framework.appendChild(this.numerator);
        this.d_framework.appendChild(this.denominator);
    }
    updateSize(parentSize: ViewModelSize): void {
        this.size = parentSize;
        setContainerFontSizeClass(this.fraction!, this.size);
        setContainerFontSizeClass(this.n_framework!, this.size);
        setContainerFontSizeClass(this.d_framework!, this.size);
        setContainerFontSizeClass(this.numerator!, this.size);
        setContainerFontSizeClass(this.denominator!, this.size);
        this.setFractionLineSize(this.size);
    }
    getMainContainer(): HTMLElement {
        return this.fraction!;
    }
    setCursor(range: Range, direction: Direction): void {
        let container = direction == Direction.Left? this.numerator! : this.denominator!;
        let firstChild = container!.firstElementChild!;
        let lastChild = container!.lastElementChild!;
        let child = direction == Direction.Left? firstChild: lastChild;
        if (child!=null)
        {
            setCursor(range, child, direction);
        }
        else
        {
            setCursor(range, container, direction);
        }
    }
    private setFractionLineSize(size: ViewModelSize)
    {
        [FRACTION_LINE_SIZE_CLASS.LINE_SIZE_1,
            FRACTION_LINE_SIZE_CLASS.LINE_SIZE_2,
            FRACTION_LINE_SIZE_CLASS.LINE_SIZE_3]
            .forEach(element => {
            if (this.d_framework!.classList.contains(element))
            {
                this.d_framework!.classList.remove(element);
            }
        });
        let fractionLineSizeClass: FRACTION_LINE_SIZE_CLASS;
        switch(size)
        {
        case ViewModelSize.Size_1:
            fractionLineSizeClass = FRACTION_LINE_SIZE_CLASS.LINE_SIZE_1;
            break;
        case ViewModelSize.Size_2:
            fractionLineSizeClass = FRACTION_LINE_SIZE_CLASS.LINE_SIZE_2;
            break;
        default:
            fractionLineSizeClass = FRACTION_LINE_SIZE_CLASS.LINE_SIZE_3;
            break;
        }
        this.d_framework!.classList.add(fractionLineSizeClass);
    }
    cursorAtEdge(range: Range, direction: Direction): boolean {
        let container = getHTMLElement(range.startContainer);
        // when the container only contains plain text
        if ([this.numerator, this.denominator].includes(container))
        {
            let isLeft = direction == Direction.Left && range.startOffset == 0;
            let isRight = direction == Direction.Right && range.startOffset == container.innerText.length;
            return isLeft || isRight;
        }
        assert(false, 'Cursor at edge should not be triggered if range is not at this container');
        return false;
    }
    canDelete(): boolean {
        return this.numerator!.innerText.length==0 && this.denominator!.innerText.length==0;
    }
    getContentContainers(): HTMLElement[] {
        return [this.numerator!, this.denominator!];
    }
}