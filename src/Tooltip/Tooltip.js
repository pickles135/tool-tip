import React, { useEffect, useRef, useState, createContext } from 'react';

//check for Proptypes --> title and children are required
const propTypes = {
    title: propTypes.string.isRequired,
    position: propTypes.string,
    children: propTypes.node.isRequired,
};

const Tooltip = ({ title, position, children }) => {
    const node = useRef() // returns mutable 'ref' object to the element
    const [isVisible, setState] = useState(false); //initializing State for visibility
    const handleClick = ({ target }) => {
        if (node.current.contains(target)) {
            //inside click
            return;
        }
        //outside click
        setState(false);
    };

//handleClick will take care of both inside and outside clicks for mounted element.

//Now need handleClick --> attach to event listener

//using Hooks --> call neeeds to be inde useEffect()

//using class-based component so no need to render method --> hooks.

useEffect(() => {
    //add when mounted
    document.addEventListener('mousedown', handleClick);
    //return function to be called when unmounted
    return () => {
        document.removeEventListener('mousedown', handleClick);
    };
}, []);

//useEffect() handles both componentDidMount() and componentWillUnmount() 
// no longer need event listner when component is unmounted or removed from DOM


return (
    <div className={Styles.container}
    data-testid="tooltip"
    ref={node}
    onClick={() => setState(!isVisible)}
>
    <div data-testid="tooltip-placeholder">{children}</div>
    {isVisible && (
        <div
            className={cx(Styles.tooltipContent, Styles[position])}
            data-testid="tooltip-content"
        >
            <span className={Styles.arrow}></span>
            {title}
        </div>
    )}
</div>
);
};

//data-testid is for testing purposes.

//content of Tooltip will only be visible if isVisible is true --> will set to false when clicked outside.

//To make our component more resilient, add default value for position prop
//if not defined, it will be placed to the right of element --> can do this w/ proptypes

Tooltip.defaultProps = {
    position: 'right',
};

//exporting both propTypes + Tooltip component.

Tooltip.propTypes = propTypes;

export default Tooltip;