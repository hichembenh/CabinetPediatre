import React from 'react';
import {Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'col',
        spacing: '2',
        backgroundColor: 'white',
        height: 800
    },
    section: {
        margin: 10,
        padding: 2,
        flexGrow: 1,
        alignContent: true
    },
});


// Create Document Component
export const OrdonnancePdf = ({ordonance}) => (
    // <Document>
    //     <Page size="A4" style={styles.page}>
    //         <View style={{ color: 'tomato', textAlign: 'center', margin: 30 }}>
    //             <Text>Ordonnance</Text>
    //         </View>
    //         {ordonance.traitements.map(trait=>
    //             <>
    //             <View style={styles.section}>
    //                 <Typography>{trait.med}</Typography>
    //                 <Typography>{trait.dosage}</Typography>
    //             </View>
    //             </>
    //         )}
    //
    //     </Page>
    // </Document>
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={{color: 'rgb(63, 81, 181)', textAlign: 'center', margin: 30}}>
                <Text>Ordonnance</Text>
            </View>
            {ordonance.traitements.map(trait =>
                <View style={styles.section}>
                    <Text>Medicament :{trait.med} Dosage :{trait.dosage}</Text>
                </View>
            )}

        </Page>
    </Document>
);