import { assert } from "../assert";
import { getContainerID } from "../getSetContainerAttributes";
import { MainDivViewModel } from "./MainDivViewModel";
import { ViewModelBase } from "./ViewModelBase";

export class ViewModelMap
{
    static map: Map<number, ViewModelBase> = new Map;
    static register(id: number, viewModel: ViewModelBase)
    {
        this.map.set(id, viewModel);
    }
    static getViewModel(container: HTMLElement): ViewModelBase
    {
        let id = getContainerID(container);
        assert(this.map.has(id));
        return this.map.get(id)!;
    }
    static remove(id: number)
    {
        assert(this.map.has(id));
        this.map.delete(id);
    }
    static getMainDiv(): MainDivViewModel
    {
        return this.map.get(0) as MainDivViewModel;
    }
    static getParentSize(container: HTMLElement)
    {
        let parent = container.parentElement!;
        let parentViewModel = this.getViewModel(parent);
        return parentViewModel.getSize();
    }
}



