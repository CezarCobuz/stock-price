import './spacing.component.css';

import React from 'react'

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

    return result
}
interface Props {
    children: React.ReactNode,
    top?: boolean,
    bottom?: boolean,
    vertical?: boolean,
    left?: boolean,
    right?: boolean,
    horizontal?: boolean,
}

export const SpacingComponent: React.FC<Props> = (props: Props) => {
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