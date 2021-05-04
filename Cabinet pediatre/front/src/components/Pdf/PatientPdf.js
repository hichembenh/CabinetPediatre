/*import * as React from 'react';
import {
    PDFDocument,
    PDFText,
    PDFTable,
    PDFTableRow,
    PDFTableColumn,
    PDFColumns,
    PDFColumn
} from 'react-pdfmake';

const PatientPdf = () =>{
    return (
        <PDFDocument
            pageSize="A5"
            pageOrientation="portrait"
            pageBreakBefore={(currentNode, followingNodesOnPage) => {
                return (
                    currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0
                );
            }}
            styles={{
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                subheader: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 10, 0, 5]
                },
                tableExample: {
                    margin: [0, 5, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }}
        >
            <PDFText style="subheader">Headers</PDFText>
            You can declare how many rows should be treated as a header. Headers are automatically
            repeated on the following pages
            <PDFText color="gray" italics>
                Headers
            </PDFText>
            <PDFColumns columnGap={10}>
                <PDFColumn width="*">Hi</PDFColumn>
                <PDFColumn width="auto">Hi</PDFColumn>
            </PDFColumns>
            <PDFTable
                headerRows={1}
                style="tableExample"
                pageOrientation="landscape"
                pageBreak="before"
            >
                <PDFTableRow>
                    <PDFTableColumn style="tableHeader">Header 1</PDFTableColumn>
                    <PDFTableColumn style="tableHeader">Header 2</PDFTableColumn>
                    <PDFTableColumn style="tableHeader">Header 3</PDFTableColumn>
                </PDFTableRow>
                <PDFTableRow>
                    <PDFTableColumn>
                        column 1
                    </PDFTableColumn>
                    <PDFTableColumn>
                        column 2
                    </PDFTableColumn>
                    <PDFTableColumn>
                        column 3
                    </PDFTableColumn>
                </PDFTableRow>
            </PDFTable>
        </PDFDocument>
    );
}


export default PatientPdf*/