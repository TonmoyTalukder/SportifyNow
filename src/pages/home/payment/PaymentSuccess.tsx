import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { notification, Spin } from 'antd';
// import { useVerifyAndConfirmPaymentMutation } from '../../../redux/features/payment/paymentApi';

const PaymentSuccess = () => {
  // const [verifyAndConfirmPayment, { isLoading }] = useVerifyAndConfirmPaymentMutation();
  const location = useLocation();
  // const navigate = useNavigate();
  // const [paymentID, setPaymentID] = useState('');
  // const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.hash.split('?')[1]);

    console.log(queryParams);
    
    const paymentStatus = queryParams.get('pay_status');
    const transactionId = queryParams.get('pg_txnid');
    const amount = queryParams.get('amount');
    // const bookingIdFromQuery = queryParams.get('bookingId');
    // setBookingId(bookingIdFromQuery!);
    // setPaymentID(transactionId!);
    
    if (paymentStatus === 'Successful') {
      // Payment is successful, you can handle booking confirmation here
      console.log(`Payment successful. Transaction ID: ${transactionId}, Amount: ${amount}`);
    }
  }, [location]);

  
  // console.log("bookingIdFromQuery => ", bookingId)
  

  // useEffect(() => {
  //   const verifyPayment = async () => {
  //     try {
  //       if (paymentID && bookingId) {
  //         const response = await verifyAndConfirmPayment({ paymentID, bookingId }).unwrap();
  //         console.log(response);
  //         notification.success({
  //           message: 'Payment Successful!',
  //           description: 'Your payment has been verified and your booking is confirmed.',
  //         });
  //         navigate(`/booking/${bookingId}`); // Redirect to booking page
  //       }
  //     } catch (error) {
  //       notification.error({
  //         message: 'Payment Verification Failed',
  //         description: 'There was an issue verifying your payment. Please contact support.',
  //       });

  //     }
  //   };
  //   verifyPayment();
  // }, [paymentID, bookingId, verifyAndConfirmPayment, navigate]);

  // if (isLoading) {
  //   return <Spin tip="Verifying payment..." />;
  // }

  return <div
  style={{
    color: 'white',
    textAlign: 'center',
    width: '100vw',
  }}
  >Payment successful! Verifying payment...</div>;
};

export default PaymentSuccess;
