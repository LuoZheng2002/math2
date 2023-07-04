import { FormulaViewModel } from "../../ViewModels/FormulaViewModel";
import { FractionViewModel } from "../../ViewModels/FractionViewModel";
import { SuperSubScriptViewModel } from "../../ViewModels/SuperSubScriptViewModel";
import { TextViewModel } from "../../ViewModels/TextViewModel";
import { ViewModelBase } from "../../ViewModels/ViewModelBase";
import { ViewModelMap } from "../../ViewModels/ViewModelMap";
import { assert } from "../../assert";
import { ATT, CT, ViewModelSize } from "../../constants";
import { getContainerID, getContainerType } from "../../getSetContainerAttributes";
import { setCursor } from "../../setCursor";
import { Direction } from "../direction";
import { getHTMLElement } from "../getHTMLElement";
import { updateView } from "../updateView";

export function handleInsert(range: Range, container: HTMLElement, event: InputEvent)
{
    if (tryCreateFormula(range, container, event)) return;
    if (tryCreateSuperSubScript(range, container, event)) return;
    if (tryCreateFraction(range, container, event)) return;
    if (tryUpdate(range, container, event)) return;
    // if (tryCreateTextContainer(range, container, event)) return;
}

function tryUpdate(range: Range, container: HTMLElement, event: InputEvent): boolean
{
    if (event.data !='u') return false;
    event.preventDefault();
    updateView();
    return true;
}

function tryCreateFormula(range: Range, container: HTMLElement, event: InputEvent): boolean
{
    if (event.data != '$') return false;
    updateView();
    container = getHTMLElement(range.startContainer);
    if (!(getContainerType(container) == CT.MAINDIV || getContainerType(container.parentElement!) == CT.MAINDIV)) return false;
    // take control
    event.preventDefault();
    let viewModel = ViewModelMap.getViewModel(container);
    // create element
    let formulaViewModel = new FormulaViewModel(ViewModelSize.Size_3);
    
    splitInsert(range, viewModel, formulaViewModel);
    formulaViewModel.setCursor(range, Direction.Right);
    // send log
    console.log('Inserted a formula element!');
    return true;
}

function tryCreateSuperSubScript(range: Range, container: HTMLElement, event: InputEvent): boolean
{
    if (event.data != '^' && event.data != '_') return false;
    updateView();
    container = getHTMLElement(range.startContainer);
    let isCaret = event.data == '^';
    let inFormula = getContainerType(container) == CT.FORMULA
        || (getContainerType(container) == CT.TEXTCONTAINER && getContainerType(container.parentElement!) != CT.MAINDIV);
    if (!inFormula) return false;
    event.preventDefault();
    let viewModel = ViewModelMap.getViewModel(container);
    let parentSize = ViewModelMap.getParentSize(container);
    let superSubScriptViewModel = new SuperSubScriptViewModel(parentSize);
    splitInsert(range, viewModel, superSubScriptViewModel);
    superSubScriptViewModel.setCursorInit(range, isCaret);
    console.log('Inserted a super sub script');
    return true;
}
function tryCreateFraction(range: Range, container: HTMLElement, event: InputEvent): boolean
{
    if (event.data != '/') return false;
    updateView();
    container = getHTMLElement(range.startContainer);
    if (container.innerText[container.innerText.length-1] != '/') return false;
    let inFormula = getContainerType(container) == CT.FORMULA
        || (getContainerType(container) == CT.TEXTCONTAINER && getContainerType(container.parentElement!) != CT.MAINDIV);
    if (!inFormula) return false;
    event.preventDefault();
    let viewModel = ViewModelMap.getViewModel(container);
    let fractionViewModel = new FractionViewModel(ViewModelMap.getParentSize(container));
    splitInsert(range, viewModel, fractionViewModel);
    fractionViewModel.setCursor(range, Direction.Left);
    if (container.innerText.length > 1)
    {
        container.innerText = container.innerText.substring(0, container.innerText.length - 1);
    }
    else
    {
        viewModel.destroy();
    }
    console.log('Inserted a fraction');
    return true;
}
// is not responsible for setting cursor
function splitInsert(range: Range, viewModel: ViewModelBase, newViewModel: ViewModelBase)
{
    let newContainer = newViewModel.getMainContainer();
    if (viewModel instanceof TextViewModel)
    {
        let textContainer = viewModel.getMainContainer();
        if (range.startOffset == 0)
        {
            textContainer.insertAdjacentElement('beforebegin', newContainer);
        }
        else if(range.startOffset == textContainer.innerText.length)
        {
            textContainer.insertAdjacentElement('afterend', newContainer);
        }
        else
        {
            let splitViewModels = splitTextContainer(viewModel, range.startOffset);
            let textViewModel1 = splitViewModels[0];
            let textViewModel2 = splitViewModels[1];
            let textContainer1 = textViewModel1.getMainContainer();
            let textContainer2 = textViewModel2.getMainContainer();
            let parent = textContainer.parentElement!;
            parent.replaceChild(textContainer1, textContainer);
            textContainer1.insertAdjacentElement('afterend', newContainer);
            newContainer.insertAdjacentElement('afterend', textContainer2);
            viewModel.destroy();
            console.log('Splitted a text container!');
        }
    }
    else
    {
        let container = viewModel.getMainContainer();
        assert(container.innerText == '', container.innerText);
        container.appendChild(newContainer);
    }
}

function splitTextContainer(textViewModel: TextViewModel, offset: number): [TextViewModel, TextViewModel]
{
    let textContainer = textViewModel.getMainContainer();
    let size = textViewModel.getSize();
    let textViewModel1 = new TextViewModel(size);
    let textViewModel2 = new TextViewModel(size);
    let textContainer1 = textViewModel1.getMainContainer();
    let textContainer2 = textViewModel2.getMainContainer();
    textContainer1.innerText = textContainer.innerText.substring(0, offset);
    textContainer2.innerText = textContainer.innerText.substring(offset, textContainer.innerText.length);
    return [textViewModel1, textViewModel2];
}

function tryCreateTextContainer(range: Range, container: HTMLElement, event: InputEvent): boolean
{
    switch(getContainerType(container))
    {
    case CT.MAINDIV:
    case CT.NUMERATOR:
    case CT.DENOMINATOR:
    case CT.SUPERSCRIPT:
    case CT.SUBSCRIPT:
    case CT.SQRT_CONTAINER:
    case CT.PARENTHESES_CONTAINER:
        {
            // event.preventDefault();
            console.log('Created a text container!');
            let containerViewModel = ViewModelMap.getViewModel(container);
            let textViewModel = new TextViewModel(containerViewModel.getSize());
            let textContainer = textViewModel.getMainContainer();
            assert(container.innerText=='');
            container.appendChild(textContainer);
            // console.log(event.data);
            if (event.inputType !='insertCompositionText')
            {
                // textContainer.innerText = event.data!;
            }
            textViewModel.setCursor(range, Direction.Right);
            alert('hello');
            return true;
        }
    }
    return false;
}