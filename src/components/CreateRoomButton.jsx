import * as React from 'react';
import PropTypes from 'prop-types';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { styled } from '@mui/system';

const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
  const { children, ...other } = props;

  return (
    <svg width="150" height="50" {...other} ref={ref}>
      <polygon points="0,50 0,0 150,0 150,50" className="bg" />
      <polygon points="0,50 0,0 150,0 150,50" className="borderEffect" />
      <foreignObject x="0" y="0" width="150" height="50">
        <div className="content">{children}</div>
      </foreignObject>
    </svg>
  );
});

ButtonRoot.propTypes = {
  children: PropTypes.node,
};

const CustomButtonRoot = styled(ButtonRoot)(
  ({ theme }) => `
  overflow: visible;
  cursor: pointer;
  --main-color: ${
    theme.palette.mode === 'light' ? 'rgb(210,25,25)' : 'rgb(144,202,249)'
  };
  --hover-color: ${
    theme.palette.mode === 'light'
      ? 'rgba(210,25,25,0.2)'
      : 'rgba(144,202,249,1)'
  };
  --active-color: ${
    theme.palette.mode === 'light'
      ? 'rgba(210,25,25,0.2)'
      : 'rgba(144,202,249,1)'
  };

  & polygon {
    fill: var(--main-color);
    transition: all 800ms ease;
    pointer-events: none;
  }
  
  & .bg {
    stroke: var(--main-color);
    stroke-width: 0.5;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
    fill: rgba(210,25,25,0.02);
  }

  & .borderEffect {
    stroke: var(--main-color);
    stroke-width: 2;
    stroke-dasharray: 150 600;
    stroke-dashoffset: 150;
    fill: transparent;
  }

  &:hover,
  &.${buttonUnstyledClasses.focusVisible} {
    .borderEffect {
      stroke-dashoffset: -600;
    }

    .bg {
      fill: var(--hover-color);
    }
  }

  &:focus,
  &.${buttonUnstyledClasses.focusVisible} {
    outline: none;
  }

  &.${buttonUnstyledClasses.active} { 
    & .bg {
      fill: var(--active-color);
      transition: fill 300ms ease-out;
    }
  }

  & foreignObject {
    pointer-events: none;

    & .content {
      font-family: Helvetica, Inter, Arial, sans-serif;
      font-size: 16px;
      font-weight: 200;
      height: 100%;
      display: flex;
      padding: 0 10px;
      align-items: center;
      justify-content: center;
      color: #fff;
      text-transform: uppercase;
    }

    & svg {
      margin: 0 5px;
    }
  }`,
);

const SvgButton = React.forwardRef(function SvgButton(props, ref) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
});

export default function CreateRoomButton() {
  return <SvgButton>Create Room</SvgButton>;
}