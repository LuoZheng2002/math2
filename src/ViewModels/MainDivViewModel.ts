import { Direction } from "../HandleEvent/direction";
import { tryWrapTextFromContainer } from "../HandleEvent/updateView";
import { assert } from "../assert";
import { CT, ViewModelSize } from "../constants";
import { setContainerID, setContainerFontSizeClass, setContainerType } from "../getSetContainerAttributes";
import { setCursor } from "../setCursor";
import { ViewModelBase } from "./ViewModelBase";

export class MainDivViewModel extends ViewModelBase
{
    protected mainDivContainer: HTMLDivElement;
    protected size: ViewModelSize;
    constructor(mainDivContainer: HTMLDivElement) {
        super();
        this.size = ViewModelSize.Size_3;
        this.mainDivContainer= mainDivContainer;
        setContainerType(this.mainDivContainer, CT.MAINDIV);
        setContainerID(this.mainDivContainer, this.id);
    }
    updateSize(parentSize: ViewModelSize): void {
        this.size = parentSize;
        setContainerFontSizeClass(this.mainDivContainer, this.size);
    }
    destroy(): void {
        assert(false);
    }
    getMainContainer()
    {
        return this.mainDivContainer;
    }
    setCursor(range: Range, direction: Direction): void {
        setCursor(range, this.mainDivContainer, direction);
    }
    cursorAtEdge(range: Range, direction: Direction)
    {
        assert(false, 'cursorAtEdge should never be called on mainDiv');
        return false;
    }
    canDelete(): boolean {
        return false;
    }
    getContentContainers(): HTMLElement[] {
        return [this.mainDivContainer];
    }
}