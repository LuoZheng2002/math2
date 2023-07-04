export enum ATT
{
    CONTAINER_TYPE = 'CONTAINER_TYPE',
    CONTAINER_ID = 'CONTAINER_ID',
    SIZE = 'SIZE'
};
export enum CT
{
    MAINDIV = 'MAINDIV',
    FORMULA='FORMULA',
    TEXTCONTAINER = 'TEXTCONTAINER',

    SUPERSUBSCRIPT = 'SUPERSUBSCRIPT',
    SUPERSCRIPT= 'SUPERSCRIPT',
    SUBSCRIPT = 'SUBSCRIPT',

    FRACTION = 'FRACTION',
    NUMERATOR_FRAEMWORK = 'NUMERATOR_FRAMEWORK',
    DENOMINATOR_FRAMEWOKR = 'DENOMINATOR_FRAMEWORK',
    NUMERATOR = 'NUMERATOR',
    DENOMINATOR = 'DENOMINATOR',

    SQRT = 'SQRT',
    SQRT_HEAD='SQRT_HEAD',
    SQRT_HEAD_PLACEHOLDER = 'SQRT_HEAD_PLACEHOLDER',
    SQRT_CONTAINER='SQRT_CONTAINER',

    PARENTHESES = 'PARENTHESES',
    LEFT_PARENTHESIS = 'LEFT_PARENTHESIS',
    RIGHT_PARENTHESIS = 'RIGHT_PARENTHESIS',
    PARENTHESIS_PLACEHOLDER = 'PARENTHESIS_PLACEHOLDER',
    PARENTHESES_CONTAINER = 'PARENTHESES_CONTAINER',

    LEFT_DUMMY_PARENTHESIS = 'LEFT_DUMMY_PARENTHESIS',
    RIGHT_DUMMY_PARENTHESIS = 'RIGHT_DUMMY_PARENTHESIS',

    CURSOR_ANCHOR = 'CURSOR_ANCHOR',
}
export enum ViewModelSize
{
    Size_1 = '1',
    Size_2 = '2',
    Size_3 = '3'
}
export function getNewSize(size: ViewModelSize, offset: number)
{
    let sizeInt = 0;
    switch(size)
    {
    case ViewModelSize.Size_1:
        sizeInt = 1;
        break;
    case ViewModelSize.Size_2:
        sizeInt=2;
        break;
    default:
        sizeInt = 3;
    }
    sizeInt -= offset;
    if (sizeInt < 1)
    {
        sizeInt = 1;
    }
    switch(sizeInt)
    {
    case 1:
        return ViewModelSize.Size_1;
    case 2:
        return ViewModelSize.Size_2;
    default:
        return ViewModelSize.Size_3;
    }
}
export enum STYLECLASS
{
    RESERVE='reserve',

    MAINDIV='main-div',
    FORMULA='formula',
    TEXTCONTAINER = 'text-container',
    SUPERSUBSCRIPT = 'super-sub-script',
    SUPERSCRIPT = 'super-script',
    SUBSCRIPT = 'sub-script',
    FRACTION = 'fraction',
    NUMERATOR = 'numerator',
    DENOMINATOR = 'denominator',
    NUMERATOR_FRAEMWORK = 'numerator-framework',
    DENOMINATOR_FRAMEWORK = 'denominator-framework',

    SQRT = 'sqrt',
    SQRT_HEAD='sqrt-head',
    SQRT_HEAD_PLACEHOLDER = 'sqrt-head-placeholder',
    SQRT_CONTAINER='sqrt-container',

    PARENTHESES = 'parentheses',
    LEFT_PARENTHESIS = 'left-parenthesis',
    RIGHT_PARENTHESIS = 'right-parenthesis',
    PARENTHESIS_PLACEHOLDER = 'parenthesis-placeholder',
    PARENTHESES_CONTAINER = 'parentheses-container',

    DUMMY_PARENTHESIS = 'dummy-parenthesis',
}

export enum FONT_SIZE_CLASS
{
    FONT_SIZE_1='font-size-1',
    FONT_SIZE_2='font-size-2',
    FONT_SIZE_3='font-size-3',
}
export enum FRACTION_LINE_SIZE_CLASS
{
    LINE_SIZE_1 = 'fraction-line-size-1',
    LINE_SIZE_2 = 'fraction-line-size-2',
    LINE_SIZE_3 = 'fraction-line-size-3'
}
export enum COLORCLASS
{
    COLOR_MAINDIV='main-div-color',
    COLOR_FORMULA='formula-color',

    COLOR_TEXTCONTAINER_1 = 'text-container-color-1',
    COLOR_TEXTCONTAINER_2 = 'text-container-color-2',
    COLOR_TEXTCONTAINER_3 = 'text-container-color-3',
    COLOR_TEXTCONTAINER_4 = 'text-container-color-4',
    COLOR_TEXTCONTAINER_5 = 'text-container-color-5',
    COLOR_TEXTCONTAINER_6 = 'text-container-color-6',
    COLOR_TEXTCONTAINER_7 = 'text-container-color-7',

    COLOR_SUPERSUBSCRIPT = 'super-sub-script-color',
    COLOR_SUPERSCRIPT = 'super-script-color',
    COLOR_SUBSCRIPT = 'sub-script-color',
    COLOR_FRACTION = 'fraction-color',
    COLOR_NUMERATOR = 'numerator-color',
    COLOR_DENOMINATOR = 'denominator-color',
    COLOR_NUMERATOR_FRAMEWORK = 'numerator-framework-color',
    COLOR_DENOMINATOR_FRAMEWORK = 'denominator-framework-color',
    COLOR_SQRT = 'sqrt-color',
    COLOR_SQRT_HEAD = 'sqrt-head-color',
    COLOR_SQRT_HEAD_PLACEHOLDER = 'sqrt-head-placeholder-color',
    COLOR_SQRT_CONTAINER = 'sqrt-container-color',
    COLOR_PARENTHESES = 'parentheses-color',
    COLOR_PARENTHESIS = 'parenthesis-color',
    COLOR_PARENTHESIS_PLACEHOLDER = 'parenthesis-placeholder-color',
    COLOR_PARENTHESES_CONTAINER = 'parentheses-container-color',
    COLOR_DUMMY_PARENTHESIS = 'dummy-parenthesis-color',
}