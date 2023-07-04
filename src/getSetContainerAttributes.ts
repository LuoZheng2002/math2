import { assert } from "./assert";
import { ATT, COLORCLASS, CT, FONT_SIZE_CLASS, STYLECLASS, ViewModelSize } from "./constants";

export function getContainerType(container: HTMLElement): CT
{
    assert(container.hasAttribute(ATT.CONTAINER_TYPE));
    return container.getAttribute(ATT.CONTAINER_TYPE) as CT;
}
export function setContainerType(container: HTMLElement, type: CT)
{
    container.setAttribute(ATT.CONTAINER_TYPE, type);
}
export function getContainerID(container: HTMLElement): number
{
    assert(container.hasAttribute(ATT.CONTAINER_ID));
    return parseInt(container.getAttribute(ATT.CONTAINER_ID)!);
}

export function setContainerID(container: HTMLElement, id:number)
{
    container.setAttribute(ATT.CONTAINER_ID, id.toString());
}

// export function setContainerSize(container: HTMLElement, size: SZ)
// {
//     container.setAttribute(ATT.SIZE, size);
// }

export function setContainerStyleClass(container: HTMLElement, styleClass: STYLECLASS)
{
    container.classList.add(styleClass);
}

export function setContainerColorClass(container: HTMLElement, colorClass: COLORCLASS)
{
    container.classList.add(colorClass);
}

export function setContainerFontSizeClass(container: HTMLElement, size: ViewModelSize)
{
    [FONT_SIZE_CLASS.FONT_SIZE_1, FONT_SIZE_CLASS.FONT_SIZE_2, FONT_SIZE_CLASS.FONT_SIZE_3].forEach(element => {
        if (container.classList.contains(element))
        {
            container.classList.remove(element);
        }
    });
    let sizeClass: FONT_SIZE_CLASS;
    switch(size)
    {
        case ViewModelSize.Size_1:
            sizeClass = FONT_SIZE_CLASS.FONT_SIZE_1;
            break;
        case ViewModelSize.Size_2:
            sizeClass = FONT_SIZE_CLASS.FONT_SIZE_2;
            break;
        default:
            sizeClass = FONT_SIZE_CLASS.FONT_SIZE_3;
            break;
    }
    container.classList.add(sizeClass);
}