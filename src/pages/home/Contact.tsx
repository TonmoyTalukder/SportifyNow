import { useState } from "react";
import { Form, Input, Button, Col, Row, Divider } from "antd";
import { toast, Toaster } from "sonner";
import "../../styles/Contact.css"; // Custom styles
import { MdAddLocationAlt } from "react-icons/md";

const { TextArea } = Input;

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);

    // Simulating form submission
    setTimeout(() => {
      setLoading(false);
      toast.success("Your message has been sent successfully!");
    }, 1000);

    console.log(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    toast.error("Please fill out the form correctly!");
    console.log(errorInfo);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <Form
        name="contactForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
        className="form-container"
        style={{
          boxShadow: "0 4px 8px #fbfcf850",
          border: "1px solid #fbfcf850",
          backgroundColor: "#FBFCF8",
          padding: "2vh 2vw",
          borderRadius: "15px",
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Your email" />
        </Form.Item>

        <Form.Item
          label="Subject"
          name="subject"
          rules={[{ required: true, message: "Please input a subject!" }]}
        >
          <Input placeholder="Subject" />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please input your message!" }]}
        >
          <TextArea rows={4} placeholder="Your message" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Row style={{ width: "100%", marginTop: "3vh" }}>
        <Divider style={{ borderColor: "#45018c", color: "#FBFCF8" }}>
          <MdAddLocationAlt />
        </Divider>
        <Col
          xs={24}
          sm={12}
          md={12}
          className="responsive-col responsive-col-right"
        >
          <div
            style={{
              padding: "0 1vw",
            }}
            className="map"
          >
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1953616360634!2d-122.41493508468178!3d37.77492927975968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808f06f90b3d%3A0x423c9d82b77e3db7!2sSan%20Francisco%2C%20CA%2094104!5e0!3m2!1sen!2sus!4v1637579385116!5m2!1sen!2sus"
              width="300"
              height="180"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={12}
          className="responsive-col responsive-col-left"
        >
          <div
            style={{
              padding: "0 1vw",
            }}
          >
            <h2>SportifyNow Office Address</h2>
            <p>1234 Elm Street, Some City, Some Country</p>
            <p>Email: contact@example.com</p>
            <p>Helpline: +123 456 7890</p>
            <p>(Available: Sat - Thu, 10:00 AM to 7:00 PM)</p>
          </div>
        </Col>
      </Row>

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Contact;
