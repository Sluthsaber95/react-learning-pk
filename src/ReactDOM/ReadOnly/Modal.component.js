import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// the next components are styled components, they are just for adding style no logic at all
import {
  ModalBackdrop,
  ModalContent,
  ModalDialog,
  ModalWrap,
} from './components';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.modalRoot = document.getElementById('modal-root');
  }
  render() {
    const ModalMarkup = (
      <div>
        <ModalBackdrop/>
        <ModalWrap>
          <ModalDialog>
            <ModalContent>{this.props.children}</ModalContent>
          </ModalDialog>
        </ModalWrap>
      </div>
    );
    return ReactDOM.createPortal(ModalMarkup, this.el);
  }
}

Modal.defaultProps = {
  show: false,
  toggle: () => {},
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
  toggle: PropTypes.func,
};