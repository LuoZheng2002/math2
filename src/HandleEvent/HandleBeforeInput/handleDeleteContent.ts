import { FormulaViewModel } from "../../ViewModels/FormulaViewModel";
import { SuperSubScriptViewModel } from "../../ViewModels/SuperSubScriptViewModel";
import { TextViewModel } from "../../ViewModels/TextViewModel";
import { ViewModelBase } from "../../ViewModels/ViewModelBase";
import { ViewModelMap } from "../../ViewModels/ViewModelMap";
import { assert } from "../../assert";
import { CT } from "../../constants";
import { getContainerType } from "../../getSetContainerAttributes";
import { setCursor } from "../../setCursor";
import { Direction } from "../direction";

export function handleDeleteContent(range: Range, container: HTMLElement, event: InputEvent, direction: Direction)
{
    let viewModel = ViewModelMap.getViewModel(container);
    if (container.innerText.length == 1)
    {
        if ((range.startOffset == 1 && direction == Direction.Left)
        ||range.startOffset==0 && direction == Direction.Right)
        {
            if (viewModel instanceof TextViewModel)
            {
                event.preventDefault();
                deleteViewModel(range, viewModel, event);
            }
            else
            {
                event.preventDefault();
                container.innerText = '';
            }
            return;
        }
    }
    if (viewModel.canDelete())
    {
        event.preventDefault();
        deleteViewModel(range, viewModel, event);
    }
    else if (container.innerText.length == 0 || range.startOffset == 0)
    {
        event.preventDefault();
        console.log('Prevent deleting a container');
    }
}

function deleteViewModel(range: Range, viewModel: ViewModelBase, event: InputEvent)
{
    let container = viewModel.getMainContainer();
    let leftSibling = container.previousElementSibling as HTMLElement;
    let rightSibling = container.nextElementSibling as HTMLElement;
    if (leftSibling != null)
    {
        let leftSiblingViewModel = ViewModelMap.getViewModel(leftSibling);
        leftSiblingViewModel.setCursor(range, Direction.Right);
    }
    else if (rightSibling!=null)
    {
        let rightSiblingViewModel = ViewModelMap.getViewModel(rightSibling);
        rightSiblingViewModel.setCursor(range, Direction.Left);
    }
    else
    {
        let parent = container.parentElement!;
        setCursor(range, parent, Direction.Left);
    }
    viewModel.destroy();
}