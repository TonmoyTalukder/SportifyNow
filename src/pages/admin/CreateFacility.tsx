/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button, Card, Input, Modal, ConfigProvider } from "antd";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import styles from "../../styles/CreateAdmin.module.css"; // reuse similar styles
import { useState } from "react";
import { useCreateFacilityMutation } from "../../redux/features/facility/facilityApi";

// Define the type for the form data
type FormData = {
  name: string;
  image: string;
  location: string;
  pricePerHour: string;
  rewards: string;
  description: string;
};

const CreateFacility = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [formData, setFormData] = useState<FormData | null>(null); // To store form data before confirmation

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      image: "",
      location: "",
      rewards: "",
      pricePerHour: "",
      description: "",
    },
    mode: "onBlur", // Validate on blur
  });

  const [createFacility] = useCreateFacilityMutation(); // Hook for facility creation

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    setFormData(data); // Store form data temporarily
    setIsModalVisible(true); // Show confirmation modal
  };

  // Handle the confirmation modal
  const handleConfirm = async () => {
    setIsModalVisible(false);
    if (formData) {
      const toastLoggingId = toast.loading("Creating Facility...", {
        duration: 2000,
      });

      const facilityInfo = {
        ...formData,
      };

      console.log("facilityInfo => ", facilityInfo);

      try {
        await createFacility(facilityInfo).unwrap(); // API call for facility creation

        toast.success("Facility Created Successfully", {
          id: toastLoggingId,
          duration: 2000,
        });
        navigate("/admin/all-facilities"); // Redirect to facilities list
      } catch (err: any) {
        toast.error(err.data.message, {
          id: toastLoggingId,
          duration: 2000,
        });
        console.error("Facility creation error:", err);
      }
    }
  };

  return (
    <div
      className={styles.myComponent}
      style={{ overflowX: "hidden", overflowY: "auto", width: "auto" }}
    >
      <Card
        className={styles.card}
        style={{
          backgroundColor: "#FBFCF8",
        }}
      >
        <h2 className={styles.textSpecial}>Create Facility</h2>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelColor: "#2f4465",
              },
            },
          }}
        >
          <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
            <Form.Item
              label="Facility Name"
              validateStatus={errors.name ? "error" : ""}
              help={errors.name?.message}
            >
              <Controller
                name="name"
                control={control}
                rules={{ required: "Facility name is required" }}
                render={({ field }) => <Input {...field} id="name" />}
              />
            </Form.Item>

            <Form.Item
              label="Facility Banner"
              validateStatus={errors.image ? "error" : ""}
              help={errors.image?.message}
            >
              <Controller
                name="image"
                control={control}
                rules={{ required: "Facility banner is required" }}
                render={({ field }) => <Input {...field} id="image" />}
              />
            </Form.Item>

            <Form.Item
              label="Location"
              validateStatus={errors.location ? "error" : ""}
              help={errors.location?.message}
            >
              <Controller
                name="location"
                control={control}
                rules={{ required: "Location is required" }}
                render={({ field }) => <Input {...field} id="location" />}
              />
            </Form.Item>

            <Form.Item
              label="Price/Hour"
              validateStatus={errors.pricePerHour ? "error" : ""}
              help={errors.pricePerHour?.message}
            >
              <Controller
                name="pricePerHour"
                control={control}
                rules={{
                  required: "Price is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter a valid price",
                  },
                }}
                render={({ field }) => <Input {...field} id="pricePerHour" />}
              />
            </Form.Item>

            <Form.Item
              label="Rewards"
              validateStatus={errors.rewards ? "error" : ""}
              help={errors.rewards?.message}
            >
              <Controller
                name="rewards"
                control={control}
                rules={{
                  required: "Rewards is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter a valid rewards",
                  },
                }}
                render={({ field }) => <Input {...field} id="rewards" />}
              />
            </Form.Item>

            <Form.Item
              label="Description"
              validateStatus={errors.description ? "error" : ""}
              help={errors.description?.message}
            >
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => <Input.TextArea {...field} id="description" />}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Facility
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
        {/* Confirmation Modal */}
        <Modal
          title="Confirm Facility Creation"
          open={isModalVisible}
          onOk={handleConfirm}
          onCancel={() => setIsModalVisible(false)}
          okText="Confirm"
          cancelText="Cancel"
        >
          <p>Are you sure you want to create this facility with the provided information?</p>
        </Modal>
      </Card>
    </div>
  );
};

export default CreateFacility;
