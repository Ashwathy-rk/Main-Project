import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styled components
const Container = styled.div`
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
`;

const Main = styled.main`
  padding: 20px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Client = styled.div`
  flex: 1;
`;

const InvoiceTo = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Email = styled.div`
  margin-bottom: 10px;
`;

const InvoiceInfo = styled.div`
  flex: 1;
`;

const DateInfo = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const InvoiceNumber = styled.div`
  margin-bottom: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.thead`
  background-color: #f0f0f0;
`;

const TableHeaderRow = styled.tr``;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 10px;
`;

const TotalRow = styled.tr`
  font-weight: bold;
`;

const TotalCell = styled.td`
  padding: 10px;
  text-align: right;
`;

const Thanks = styled.div`
  margin-top: 20px;
  font-style: italic;
`;

const Notices = styled.div`
  margin-top: 20px;
`;

const Notice = styled.div`
  margin-bottom: 10px;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0;
`;

// Component
const Invoice = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [grandTotal, setGrandTotal] = useState(0); // Initialize grand total state

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderId = localStorage.getItem('orderId');
        const response = await axios.get(`http://localhost:5000/api/current/current/${orderId}`);
        const fetchedOrderDetails = response.data;
        setOrderDetails(fetchedOrderDetails);

        // Fetch name and email from localStorage
        const storedName = localStorage.getItem('name');
        const storedEmail = localStorage.getItem('email');
        const storedAddress = loacalStorage.getItem('address')
        setName(storedName);
        setEmail(storedEmail);
        setAddress(storedAddress);

        // Set the date of the invoice to the current system date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        setInvoiceDate(formattedDate);

        // Set the due date as one week later
        const dueDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Adding one week in milliseconds
        const formattedDueDate = dueDate.toLocaleString();
        setDueDate(formattedDueDate);

        // Calculate grand total
        let total = 0;
        orderDetails.items.forEach(item => {
          total += item.price * item.quantity;
        });
        setGrandTotal(total);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderDetails]); // Add orderDetails to the dependency array to recalculate grand total when orderDetails change

  // PDF Document component
  const InvoiceDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Invoice</Text>
        </View>
      </Page>
    </Document>
  );

  // Styles for PDF
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#fff',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Main>
        <Details>
          <Client>
            <InvoiceTo>INVOICE TO:</InvoiceTo>
            <div>User Name: {name}</div>
            <div>User Address: {address}</div>
            <Email>Email Of the customer<a href={`mailto:${email}`}>{email}</a></Email>
          </Client>
          <InvoiceInfo>
            <DateInfo>Date of Invoice: {invoiceDate}</DateInfo>
            <div>Due Date: {dueDate}</div>
          </InvoiceInfo>
        </Details>
        <Table>
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>DESCRIPTION</TableHeaderCell>
              <TableHeaderCell>UNIT PRICE</TableHeaderCell>
              <TableHeaderCell>QUANTITY</TableHeaderCell>
              <TableHeaderCell>TOTAL</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {orderDetails.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <h3>{item.productName}</h3>
                  {item.description}
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{(item.price * item.quantity).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <tfoot>
            <TotalRow>
              <TotalCell colSpan={4}>GRAND TOTAL</TotalCell>
              <TotalCell>{grandTotal.toFixed(2)}</TotalCell>
            </TotalRow>
          </tfoot>
        </Table>
        <Thanks>Thank you!</Thanks>
        <Notices>
          <Notice>{orderDetails.notice}</Notice>
        </Notices>
      </Main>
      <Footer>
        <PDFDownloadLink document={<InvoiceDocument />} fileName="invoice.pdf">
          {({ blob, url, loading, error }) => ('Download PDF')}
        </PDFDownloadLink>
      </Footer>
    </Container>
  );
};

export default Invoice;
