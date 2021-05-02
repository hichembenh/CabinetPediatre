import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import {Paper} from "@material-ui/core";

const ModalWrapper = styled.div`
  width: 100%;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #373737;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const RdvModal = ({ kid, showModal, setShowModal }) => {
    console.log(kid)

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
                console.log('I pressed');
            }
        },
        [setShowModal, showModal]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    return (
        <>
            {showModal ? (
                <Paper>
                        <ModalWrapper showModal={showModal}>
                            <ModalImg src={kid.photo} alt='camera' />
                            <ModalContent>
                                <h1>{kid.lastName} {kid.name}</h1>
                                <p>veuillez remplir le formulaire pour envoyer une demande de rendez-vous</p>
                                <button>Demander</button>
                            </ModalContent>
                            <CloseModalButton
                                aria-label='Close modal'
                                onClick={() => setShowModal(prev => !prev)}
                            />
                        </ModalWrapper>
                </Paper>
            ) : null}
        </>
    );
};
export default RdvModal