
import React from "react";
import {
    Box,
    Container,
    Row,
    Column,
    FooterLink,
} from "./style";

const Footer = () => {
    return (
        <Box>
            <h1 style={{ color: "rgb(63, 81, 181)",
                textAlign: "center",
                marginTop: "2px" }}>
                Cabinet pediatre
            </h1>
            <Container>
                <Row>
                    <Column>
                        <FooterLink href="#">Nous contacter</FooterLink>
                    </Column>
                    <Column>
                        <FooterLink href="#">No services</FooterLink>
                    </Column>
                    <Column>
                        <FooterLink href="#">Qui somme nous ?</FooterLink>
                    </Column>
                    <Column>
                        <FooterLink href="#">
                            <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
                            </i>
                        </FooterLink>
                    </Column>
                </Row>
            </Container>
        </Box>
    );
};
export default Footer;