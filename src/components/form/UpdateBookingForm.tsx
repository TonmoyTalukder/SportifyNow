import { Form, Input, Button, DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";

const UpdateBookingForm = ({ booking, onClose }: any) => {
  const [form] = Form.useForm();

  // Pre-fill form with existing booking details
  form.setFieldsValue({
    date: dayjs(booking.date),
    startTime: dayjs(booking.startTime, "HH:mm"),
    endTime: dayjs(booking.endTime, "HH:mm"),
    facility: booking.facility?.name,
  });

  // Handle form submission
  const handleFormSubmit = (values: any) => {
    // Update booking logic here
    console.log("Updated values:", values);
    onClose(); // Close modal after submission
  };

  return (
    <Form form={form} onFinish={handleFormSubmit}>
      <Form.Item label="Facility" name="facility">
        <Input disabled />
      </Form.Item>
      <Form.Item label="Date" name="date" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item label="Start Time" name="startTime" rules={[{ required: true }]}>
        <TimePicker format="HH:mm" />
      </Form.Item>
      <Form.Item label="End Time" name="endTime" rules={[{ required: true }]}>
        <TimePicker format="HH:mm" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateBookingForm;
