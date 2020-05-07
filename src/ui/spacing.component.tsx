import React from 'react'
import './spacing.component.css';

const getCustomClassNames = (
    top?: boolean,
    bottom?: boolean,
    vertical?: boolean,
    left?: boolean,
    right?: boolean,
    horizontal?: boolean,
): string => {
    let result = ''

    if (vertical) {
        result = 'SpacingComponent__top SpacingComponent__bottom '
    }
    if (bottom) {
        result = 'SpacingComponent__bottom '
    }
    if (top) {
        result = 'SpacingComponent__top '
    }
    if (horizontal) {
        result += 'SpacingComponent__left SpacingComponent__right'
    }
    if (left) {
        result += 'SpacingComponent__left'
    }
    if (right) {
        result += 'SpacingComponent__right'
    }

    console.log('+++ result', result);
    return result
}

export const SpacingComponent: React.FC<{
    top?: boolean,
    bottom?: boolean,
    vertical?: boolean,
    left?: boolean,
    right?: boolean,
    horizontal?: boolean,
}> =
    (props) => {
        return (
            <div className={
                getCustomClassNames(
                    props.top,
                    props.bottom,
                    props.vertical,
                    props.left,
                    props.right,
                    props.horizontal
                )}>

                {props.children}

            </div>
        )
    }