import React, {useCallback, useEffect} from 'react';
import {ModalWrapper, ModalImg, ModalContent, CloseModalButton}  from './styles'
import {Paper, TextField} from "@material-ui/core";


const RdvModal = ({ kid, showModal, setShowModal }) => {

    return (
        <>
            {showModal ? (
                <Paper>
                        <ModalWrapper showModal={showModal}>
                            <ModalImg src={kid.photo} alt='camera' />
                            <ModalContent>
                                <p>veuillez remplir le formulaire pour envoyer une demande de rendez-vous</p>
                                <TextField
                                    name="lastName"
                                    variant="outlined"
                                    value={kid.lastName}
                                    disabled
                                    />
                                    <TextField
                                    name="lastName"
                                    variant="outlined"
                                    value={kid.name}
                                    disabled
                                    />
                                    <TextField
                                    name="lastName"
                                    variant="outlined"
                                    value={kid.gender}
                                    disabled
                                    />
                                    <TextField
                                    name="lastName"
                                    variant="outlined"
                                    value={new Date(kid.age)}
                                    disabled
                                    />
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